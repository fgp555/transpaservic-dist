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
let OrderService = class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async saveFilteredData(data) {
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
            const savedOrders = await this.orderRepository.save(data);
            return {
                message: 'Datos filtrados guardados correctamente',
                savedOrders,
            };
        }
        catch (error) {
            throw new common_1.HttpException('Error al guardar los datos filtrados', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
    async create(createOrderDto) {
        const { operatorContract, orderNumber } = createOrderDto;
        const existingOperatorContract = await this.orderRepository.findOne({
            where: { operatorContract },
        });
        if (existingOperatorContract) {
            throw new common_1.ConflictException(`Entrada duplicada para el contrato de operatore: ${operatorContract}`);
        }
        const existingOrderNumber = await this.orderRepository.findOne({
            where: { orderNumber },
        });
        if (existingOrderNumber) {
            throw new common_1.ConflictException(`Entrada duplicada para el número de orden: ${orderNumber}`);
        }
        const order = this.orderRepository.create(createOrderDto);
        try {
            return await this.orderRepository.save(order);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Ocurrió un error inesperado');
        }
    }
    async findAll(filters) {
        const { status, operator, page = 1, limit = 10, search, dateFrom, dateTo, } = filters;
        const queryBuilder = this.orderRepository.createQueryBuilder('order');
        queryBuilder.leftJoinAndSelect('order.operator', 'operator');
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
        queryBuilder.orderBy('order.creationDate', 'DESC');
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
            relations: ['operator'],
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order con ID ${id} no encontrado`);
        }
        return {
            ...order,
            operator: order.operator?.name || null,
        };
    }
    async update(id, updateOrderDto) {
        await this.orderRepository.update(id, updateOrderDto);
        return this.findOne(id);
    }
    async remove(id) {
        const order = await this.orderRepository.findOne({
            where: { id },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order con ID ${id} no encontrado`);
        }
        await this.orderRepository.delete(id);
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderService);
//# sourceMappingURL=order.service.js.map