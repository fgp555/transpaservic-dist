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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const fs = require("fs");
const operator_entity_1 = require("../operator/entities/operator.entity");
const wablas_service_1 = require("../wablas/wablas.service");
const back_ticket_entity_1 = require("./entities/back-ticket.entity");
const order_history_entity_1 = require("./entities/order-history.entity");
let OrderService = class OrderService {
    constructor(orderRepository, backTicketRepository, orderHistoryRepository, operatorRepository, wablasService) {
        this.orderRepository = orderRepository;
        this.backTicketRepository = backTicketRepository;
        this.orderHistoryRepository = orderHistoryRepository;
        this.operatorRepository = operatorRepository;
        this.wablasService = wablasService;
    }
    async orderHistoryAll() {
        const orderHistory = await this.orderHistoryRepository.find();
        return orderHistory;
    }
    async expireOrders() {
        const now = new Date();
        const expiredOrders = await this.orderRepository.find({
            where: {
                expirationDate: (0, typeorm_2.LessThan)(now),
                status: order_entity_1.OrderStatus.PENDIENTE,
            },
        });
        if (expiredOrders.length > 0) {
            await this.orderRepository.update({
                expirationDate: (0, typeorm_2.LessThan)(now),
                status: order_entity_1.OrderStatus.PENDIENTE,
            }, { status: order_entity_1.OrderStatus.EXPIRADO });
            console.info(`${expiredOrders.length} órdenes han sido expiradas.`);
        }
    }
    async approvalTravelDate(body) {
        const order = await this.orderRepository.findOne({
            where: { orderNumber: body.orderNumber },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        order.approvalTravelDate = body.approvalTravelDate;
        return await this.orderRepository.save(order);
    }
    async approveOrder(body, filename) {
        const order = await this.orderRepository.findOne({
            where: { orderNumber: body.orderNumber },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        order.ticketNumber = body.ticketNumber;
        order.approvalTravelDate = body.approvalTravelDate
            ? body.approvalTravelDate
            : null;
        order.approvalQuantity = body.approvalQuantity;
        order.value = body.value;
        order.netValue = body.netValue;
        order.approvalDate = new Date();
        order.status = order_entity_1.OrderStatus.APROBADO;
        order.ticketImage = filename;
        const orderHistoryCreate = this.orderHistoryRepository.create({
            order,
            modifiedByUser: { id: body.userId },
            action: order_history_entity_1.ActionEnum.APPROVED,
        });
        await this.orderHistoryRepository.save(orderHistoryCreate);
        return await this.orderRepository.save(order);
    }
    async deleteTicketImage(orderNumber) {
        const order = await this.orderRepository.findOne({
            where: { orderNumber: orderNumber },
        });
        if (!order)
            throw new common_1.NotFoundException('Orden no encontrada');
        if (order.ticketImage) {
            const imagePath = `${order.ticketImage}`;
            try {
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            catch (error) {
                throw new common_1.InternalServerErrorException('Error al eliminar la imagen del ticket');
            }
        }
        order.ticketImage = null;
        order.status = order_entity_1.OrderStatus.PENDIENTE;
        order.ticketNumber = null;
        order.approvalTravelDate = null;
        order.approvalQuantity = null;
        order.approvalDate = null;
        order.netValue = null;
        const result = await this.orderRepository.save(order);
        return result;
    }
    async saveArrayData(data, sendToWhatsApp) {
        const duplicates = {
            operatorContract: [],
            orderNumber: [],
        };
        for (const item of data) {
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
            for (const item of data) {
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
            const savedOrders = await this.orderRepository.save(data);
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
    async updateExpirationDates() {
        const ordersWithoutExpiration = await this.orderRepository.find({
            where: { expirationDate: null },
        });
        if (ordersWithoutExpiration.length === 0) {
            throw new common_1.HttpException('No hay órdenes sin fecha de expiración', common_1.HttpStatus.NOT_FOUND);
        }
        for (const order of ordersWithoutExpiration) {
            order.expirationDate = new Date(order.creationDate);
            order.expirationDate.setDate(order.expirationDate.getDate() + 30);
        }
        await this.orderRepository.save(ordersWithoutExpiration);
        return {
            message: 'Fechas de expiración actualizadas correctamente',
            updatedOrders: ordersWithoutExpiration,
        };
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
    async checkIfExists(orderNumber, operatorContract) {
        const conditions = {};
        if (orderNumber) {
            conditions.orderNumber = orderNumber;
        }
        if (operatorContract) {
            conditions.operatorContract = operatorContract;
        }
        const order = await this.orderRepository.findOne({
            where: conditions,
        });
        return { exists: !!order };
    }
    async findAll(filters) {
        const { status, operator, page = 1, limit = 10, search, dateFrom, dateTo, } = filters;
        const queryBuilder = this.orderRepository.createQueryBuilder('order');
        queryBuilder.leftJoinAndSelect('order.operator', 'operator');
        queryBuilder.leftJoinAndSelect('order.backticketHistory', 'backticketHistory');
        if (status) {
            queryBuilder.andWhere('order.status = :status', { status });
        }
        if (operator) {
            queryBuilder.andWhere('order.operatorId = :operator', { operator });
        }
        if (dateFrom) {
            queryBuilder.andWhere('order.creationDate >= :dateFrom', { dateFrom });
        }
        if (dateTo) {
            queryBuilder.andWhere('order.creationDate <= :dateTo', { dateTo });
        }
        if (search) {
            queryBuilder.andWhere(`
        (
          order.operatorContract LIKE :search OR
          order.orderNumber LIKE :search OR
          order.authorizationNumber LIKE :search OR
          order.client LIKE :search OR
          order.patientName LIKE :search OR
          order.idCard LIKE :search OR
          order.userPhone LIKE :search OR
          order.email LIKE :search OR
          order.origin LIKE :search OR
          order.destination LIKE :search OR
          order.itinerary LIKE :search OR
          order.remarks LIKE :search OR
          operator.name LIKE :search
        )
        `, { search: `%${search}%` });
        }
        if (limit) {
            queryBuilder.skip((page - 1) * limit).take(limit);
        }
        queryBuilder.orderBy('order.id', 'DESC');
        const [results, total] = await queryBuilder.getManyAndCount();
        return {
            results,
            total,
            totalPages: limit ? Math.ceil(total / limit) : 1,
        };
    }
    async statusEnum() {
        return Object.values(order_entity_1.OrderStatus);
    }
    async findOne(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['operator', 'backticketHistory', 'orderHistory'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order con ID ${id} no encontrado`);
        }
        return {
            ...order,
            operator: order.operator?.name || null,
        };
    }
    async findManyByPhone(userPhone) {
        const orders = await this.orderRepository.find({
            where: { userPhone: userPhone },
        });
        if (!orders.length)
            throw new common_1.NotFoundException(`No se encontraron órdenes con el teléfono ${userPhone}`);
        return orders.map((order) => ({
            ...order,
            operator: order.operator?.name || null,
        }));
    }
    async orderNumber(orderNumber) {
        const order = await this.orderRepository.findOne({
            where: { orderNumber: orderNumber },
            relations: ['operator', 'backticketHistory', 'orderHistory'],
            order: {
                backticketHistory: {
                    createdAt: 'DESC',
                },
            },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order con Numero ${orderNumber} no encontrado`);
        }
        return {
            ...order,
            operator: order.operator?.name || null,
        };
    }
    async createBackTicket(orderNumber, body) {
        const order = await this.orderRepository.findOne({
            where: { orderNumber },
            relations: ['operator', 'backticketHistory', 'orderHistory'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order con Numero ${orderNumber} no encontrado`);
        }
        const backTicket = this.backTicketRepository.create({
            operator: order.operator.name,
            ticketNumber: order.ticketNumber,
            travelDate: order.travelDate,
            order,
        });
        const saveBackTicket = await this.backTicketRepository.save(backTicket);
        const orderHistoryCreate = this.orderHistoryRepository.create({
            order,
            modifiedByUser: { id: body.orderHistory[0].modifiedByUser.id },
            action: order_history_entity_1.ActionEnum.BACKTICKET,
        });
        const savehistory = await this.orderHistoryRepository.save(orderHistoryCreate);
        return this.findOne(order.id);
    }
    async update(id, body) {
        const order = await this.orderRepository.findOne({
            where: { id },
            relations: ['orderHistory'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Orden con ID ${id} no encontrada`);
        }
        const orderHistoryCreate = this.orderHistoryRepository.create({
            order,
            modifiedByUser: { id: body.orderHistory[0].modifiedByUser.id },
            action: order_history_entity_1.ActionEnum.UPDATED,
        });
        await this.orderHistoryRepository.save(orderHistoryCreate);
        const { orderHistory, ...restBody } = body;
        await this.orderRepository.update(id, restBody);
        return this.findOne(id);
    }
    async deleteBackTicket(id) {
        const order = await this.backTicketRepository.findOne({
            where: { id },
        });
        if (!order)
            throw new common_1.NotFoundException(`backTicket con ID ${id} no encontrado`);
        return await this.backTicketRepository.delete(id);
    }
    async remove(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order con ID ${id} no encontrado`);
        }
        return await this.orderRepository.delete(id);
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(back_ticket_entity_1.BackTicketEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(order_history_entity_1.OrderHistoryEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(operator_entity_1.OperatorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        wablas_service_1.WablasService])
], OrderService);
//# sourceMappingURL=order.service.js.map