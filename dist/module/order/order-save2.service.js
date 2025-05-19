"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSave2Service = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_service_1 = require("../notification/notification.service");
const operator_entity_1 = require("../operator/entities/operator.entity");
const order_entity_1 = require("./entities/order.entity");
const orderHelpers_1 = require("./helpers/orderHelpers");
const template_service_1 = require("../whatsapp/template.service");
const patient_service_1 = require("../patient/patient.service");
let OrderSave2Service = class OrderSave2Service {
    constructor(orderRepository, operatorRepository, notificationService, waTemplateService, patientService) {
        this.orderRepository = orderRepository;
        this.operatorRepository = operatorRepository;
        this.notificationService = notificationService;
        this.waTemplateService = waTemplateService;
        this.patientService = patientService;
    }
    async create(createOrderDto) {
        const { operatorContract, orderNumber } = createOrderDto;
        const existingOperatorContract = await this.orderRepository.findOne({
            where: { operatorContract },
        });
        if (existingOperatorContract) {
            throw new common_1.ConflictException(`Entrada duplicada para el contrato de operator: ${operatorContract}`);
        }
        const existingOrderNumber = await this.orderRepository.findOne({
            where: { orderNumber },
        });
        if (existingOrderNumber) {
            throw new common_1.ConflictException(`Entrada duplicada para el número de orden: ${orderNumber}`);
        }
        const order = this.orderRepository.create(createOrderDto);
        try {
            const savedOrder = await this.orderRepository.save(order);
            await this.addPatient(createOrderDto);
            await this.sendWhatsAppMessage(createOrderDto, savedOrder);
            await this.notificationService.sendOperatorOrderNotifications([
                createOrderDto.operator.id,
            ]);
            try {
                await this.expireOldOrders();
            }
            catch (e) {
                console.warn('Error expirando órdenes antiguas:', e.message);
            }
            return { order: savedOrder };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Ocurrió un error inesperado');
        }
    }
    async saveArrayData(dataArray, sendToWhatsApp) {
        const duplicates = { operatorContractGroup: [], orderNumberGroup: [] };
        const savedOrders = [];
        const phonesAlreadyNotified = new Set();
        const operatorCache = new Map();
        const operatorIds = new Set();
        for (const item of dataArray) {
            if (typeof item.userPhone === 'string' &&
                item.userPhone.includes(' / ')) {
                item.userPhone = item.userPhone.split(' / ')[0].trim();
            }
            if (!item.expirationDate) {
                const expirationDays = Number(process.env.ORDER_EXPIRATION_DAYS) || 45;
                const creationDate = new Date(item.creationDate);
                const expirationDate = new Date(creationDate);
                expirationDate.setDate(expirationDate.getDate() + expirationDays);
                item.expirationDate = expirationDate;
            }
            if (typeof item.operator === 'string') {
                const operatorName = item.operator.trim();
                if (!operatorCache.has(operatorName)) {
                    const operator = await this.operatorRepository.findOne({
                        where: { name: operatorName },
                    });
                    if (!operator) {
                        throw new common_1.HttpException(`Operador "${operatorName}" no encontrado en la base de datos.`, common_1.HttpStatus.BAD_REQUEST);
                    }
                    operatorCache.set(operatorName, operator);
                }
                const operator = operatorCache.get(operatorName);
                item.operator = operator;
                operatorIds.add(operator.id);
            }
            await this.addPatient(item);
        }
        for (const item of dataArray) {
            const [existingContract, existingOrder] = await Promise.all([
                this.orderRepository.findOne({
                    where: { operatorContract: item.operatorContract },
                }),
                this.orderRepository.findOne({
                    where: { orderNumber: item.orderNumber },
                }),
            ]);
            if (existingContract) {
                duplicates.operatorContractGroup.push(item);
                continue;
            }
            if (existingOrder) {
                duplicates.orderNumberGroup.push(item);
                continue;
            }
            if (typeof item.userPhone === 'string') {
                item.userPhone = (0, orderHelpers_1.addPrefix)(item.userPhone);
            }
            const order = this.orderRepository.create(item);
            const savedOrder = await this.orderRepository.save(order);
            savedOrders.push(savedOrder);
        }
        if (duplicates.operatorContractGroup.length > 0 ||
            duplicates.orderNumberGroup.length > 0) {
            throw new common_1.HttpException({
                message: 'Existen duplicados en la base de datos.',
                duplicates,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (sendToWhatsApp) {
            const phoneMap = new Map();
            for (const order of savedOrders) {
                const phone = order.userPhone;
                if (!phone)
                    continue;
                if (!phoneMap.has(phone)) {
                    phoneMap.set(phone, {
                        count: 0,
                        operators: new Map(),
                        name: order.patientName || 'Usuario',
                    });
                }
                const entry = phoneMap.get(phone);
                entry.count += 1;
                const opName = order.operator?.name || 'Operador';
                entry.operators.set(opName, (entry.operators.get(opName) || 0) + 1);
            }
            for (const [phone, info] of phoneMap.entries()) {
                if (phonesAlreadyNotified.has(phone))
                    continue;
                const operadorList = Array.from(info.operators.entries())
                    .map(([name, count]) => `• ${count} con ${name}`)
                    .join(' ');
                const ordersPayload = {
                    to: phone,
                    template: {
                        components: [
                            {
                                parameters: [
                                    { type: 'text', text: info.name },
                                    { type: 'text', text: String(info.count) },
                                    { type: 'text', text: operadorList },
                                ],
                            },
                        ],
                    },
                };
                try {
                    await this.waTemplateService.ordenes_emitidas(ordersPayload);
                    phonesAlreadyNotified.add(phone);
                }
                catch (err) {
                    console.error(`Error enviando WhatsApp a ${phone}:`, err.message);
                }
            }
        }
        await this.notificationService.sendOperatorOrderNotifications([
            ...operatorIds,
        ]);
        this.expireOldOrders();
        return { saved: savedOrders.length };
    }
    async expireOldOrders() {
        const now = new Date();
        const expirationLimit = new Date();
        expirationLimit.setDate(now.getDate() - Number(process.env.ORDER_EXPIRATION_DAYS) || 45);
        const expiredOrders = await this.orderRepository.find({
            where: {
                creationDate: (0, typeorm_2.LessThan)(expirationLimit),
                status: (0, typeorm_2.Not)(order_entity_1.OrderStatus.EXPIRADO),
            },
        });
        if (expiredOrders.length === 0)
            return;
        for (const order of expiredOrders) {
            order.status = order_entity_1.OrderStatus.EXPIRADO;
        }
        await this.orderRepository.save(expiredOrders);
    }
    async addPatient(createOrderDto) {
        const idCard = await this.patientService.findOneByIdCard(createOrderDto.idCard);
        if (!idCard) {
            const createTempDto = {
                documentType: createOrderDto.documentType,
                idCard: createOrderDto.idCard,
                patientName: createOrderDto.patientName,
                userPhone: createOrderDto.userPhone,
            };
            await this.patientService.create(createTempDto);
        }
    }
    async sendWhatsAppMessage(createOrderDto, savedOrder) {
        const findOperator = await this.operatorRepository.findOne({
            where: { id: createOrderDto.operator.id },
        });
        const expirationDate = (0, orderHelpers_1.formatDate)(new Date(createOrderDto.creationDate).toISOString().split('T')[0], Number(process.env.ORDER_EXPIRATION_DAYS) || 45);
        const orderPayload = {
            to: (0, orderHelpers_1.addPrefix)(createOrderDto.userPhone),
            template: {
                components: [
                    {
                        parameters: [
                            { type: 'text', text: (0, orderHelpers_1.firstName)(createOrderDto.patientName) },
                            { type: 'text', text: findOperator.name },
                            { type: 'text', text: createOrderDto.itinerary },
                            { type: 'text', text: expirationDate },
                        ],
                    },
                ],
            },
        };
        if (createOrderDto.sendWhatsApp) {
            try {
                const wa_resp = await this.waTemplateService.orden_emitida(orderPayload);
                return { wa_resp, order: savedOrder };
            }
            catch (waError) {
                console.error('Error enviando WhatsApp:', waError);
                return { wa_error: waError.message, order: savedOrder };
            }
        }
    }
};
exports.OrderSave2Service = OrderSave2Service;
exports.OrderSave2Service = OrderSave2Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(operator_entity_1.OperatorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        notification_service_1.NotificationService,
        template_service_1.WaTemplateService,
        patient_service_1.PatientService])
], OrderSave2Service);
//# sourceMappingURL=order-save2.service.js.map