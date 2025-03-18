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
exports.OrderSaveService = void 0;
const common_1 = require("@nestjs/common");
const order_history_entity_1 = require("./entities/order-history.entity");
const back_ticket_entity_1 = require("./entities/back-ticket.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const notification_service_1 = require("../notification/notification.service");
const operator_entity_1 = require("../operator/entities/operator.entity");
const order_entity_1 = require("./entities/order.entity");
const wablas_service_1 = require("../wablas/wablas.service");
let OrderSaveService = class OrderSaveService {
    constructor(orderRepository, backTicketRepository, orderHistoryRepository, operatorRepository, wablasService, notificationService) {
        this.orderRepository = orderRepository;
        this.backTicketRepository = backTicketRepository;
        this.orderHistoryRepository = orderHistoryRepository;
        this.operatorRepository = operatorRepository;
        this.wablasService = wablasService;
        this.notificationService = notificationService;
    }
    async saveArrayData(dataArray, sendToWhatsApp) {
        const duplicates = {
            operatorContract: [],
            orderNumber: [],
        };
        for (const item of dataArray) {
            const existingOperatorContract = await this.orderRepository.findOne({
                where: { operatorContract: item.operatorContract },
            });
            if (existingOperatorContract) {
                duplicates.operatorContract.push(item.operatorContract);
            }
            const existingOrderNumber = await this.orderRepository.findOne({
                where: { orderNumber: item.orderNumber },
            });
            if (existingOrderNumber) {
                duplicates.orderNumber.push(item.orderNumber);
            }
        }
        if (duplicates.operatorContract.length > 0 ||
            duplicates.orderNumber.length > 0) {
            throw new common_1.HttpException({
                message: 'Se han detectado entradas duplicadas',
                duplicates,
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            for (const item of dataArray) {
                const operator = await this.operatorRepository.findOne({
                    where: { name: item.operator },
                });
                if (!operator) {
                    throw new common_1.HttpException(`Operador "${item.operator}" no encontrado en la base de datos.`, common_1.HttpStatus.BAD_REQUEST);
                }
                item.operator = operator;
                if (typeof item.userPhone === 'string' &&
                    item.userPhone.includes(' / ')) {
                    item.userPhone = item.userPhone.split(' / ')[0].trim();
                }
                if (!item.expirationDate) {
                    const expirationDays = 30;
                    const expirationDate = new Date();
                    expirationDate.setDate(expirationDate.getDate() + expirationDays);
                    item.expirationDate = expirationDate;
                }
            }
            const savedOrders = await this.orderRepository.save(dataArray);
            if (sendToWhatsApp) {
                for (const item of savedOrders) {
                    const sendWhatsappObject = {
                        userPhone: item.userPhone.split(' / ')[0],
                        patientName: item.patientName,
                        phoneOperator: item.operator.whatsapp,
                        websiteOperator: item.operator.website,
                        nameOperator: item.operator.name,
                    };
                    await this.wablasService.sendWhatsapp(sendWhatsappObject);
                }
            }
            return {
                message: 'Datos filtrados guardados correctamente',
                savedOrders,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Error al guardar los datos filtrados', error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
            const findOperator = await this.operatorRepository.findOne({
                where: { id: createOrderDto.operator.id },
            });
            const sendWhatsappObject = {
                userPhone: createOrderDto.userPhone,
                patientName: createOrderDto.patientName,
                phoneOperator: findOperator.whatsapp,
                websiteOperator: findOperator.website,
                nameOperator: findOperator.name,
            };
            await this.notificationService.sendOperatorOrderNotifications([
                createOrderDto.operator.id,
            ]);
            if (createOrderDto.sendWhatsApp) {
                const wablas = this.wablasService.sendWhatsapp(sendWhatsappObject);
                return { order: savedOrder, wablas: wablas };
            }
            return { order: savedOrder };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Ocurrió un error inesperado');
        }
    }
};
exports.OrderSaveService = OrderSaveService;
exports.OrderSaveService = OrderSaveService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(back_ticket_entity_1.BackTicketEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(order_history_entity_1.OrderHistoryEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(operator_entity_1.OperatorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        wablas_service_1.WablasService,
        notification_service_1.NotificationService])
], OrderSaveService);
//# sourceMappingURL=order-save.service1.js.map