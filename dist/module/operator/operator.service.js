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
exports.OperatorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const operator_entity_1 = require("./entities/operator.entity");
const order_entity_1 = require("../order/entities/order.entity");
let OperatorService = class OperatorService {
    constructor(operatorRepository, orderRepository) {
        this.operatorRepository = operatorRepository;
        this.orderRepository = orderRepository;
    }
    async create(createOperatorDto) {
        const { name, whatsapp, email } = createOperatorDto;
        const existingOperators = await this.operatorRepository.find({
            where: [{ name }, { whatsapp }, { email }],
        });
        if (existingOperators.length > 0) {
            for (const existingOperator of existingOperators) {
                if (existingOperator.name === name) {
                    throw new common_1.ConflictException(`El nombre "${name}" ya está en uso.`);
                }
                if (existingOperator.whatsapp === whatsapp) {
                    throw new common_1.ConflictException(`El número de WhatsApp "${whatsapp}" ya está en uso.`);
                }
                if (existingOperator.email === email) {
                    throw new common_1.ConflictException(`El correo electrónico "${email}" ya está en uso.`);
                }
            }
        }
        const operator = this.operatorRepository.create(createOperatorDto);
        return await this.operatorRepository.save(operator);
    }
    async findAllService() {
        return await this.operatorRepository.find();
    }
    async findAll(filters) {
        const { search, page = 1, limit = 10 } = filters;
        const queryBuilder = this.operatorRepository.createQueryBuilder('operator');
        if (search) {
            queryBuilder.andWhere(`
        (
          operator.name LIKE :search OR
          operator.whatsapp LIKE :search OR
          operator.email LIKE :search OR
          operator.website LIKE :search
        )
        `, { search: `%${search}%` });
        }
        if (limit) {
            queryBuilder.skip((page - 1) * limit).take(limit);
        }
        queryBuilder.orderBy('operator.registrationDate', 'DESC');
        const [results, total] = await queryBuilder.getManyAndCount();
        return {
            results,
            total,
            totalPages: limit ? Math.ceil(total / limit) : 1,
        };
    }
    async findByName(name) {
        return await this.operatorRepository.find({
            where: {
                name: (0, typeorm_2.Like)(`${name}%`),
            },
        });
    }
    async findOne(id) {
        const operator = await this.operatorRepository.findOne({
            where: { id },
            relations: ['orders'],
        });
        if (!operator) {
            throw new common_1.NotFoundException(`El operador con ID ${id} no fue encontrado`);
        }
        return operator;
    }
    async update(id, updateOperatorDto) {
        const { name, whatsapp, email } = updateOperatorDto;
        const operator = await this.operatorRepository.findOne({ where: { id } });
        if (!operator) {
            throw new common_1.BadRequestException('Operador no encontrado');
        }
        const existingOperators = await this.operatorRepository.find({
            where: [{ name }, { whatsapp }, { email }],
        });
        for (const existingOperator of existingOperators) {
            if (existingOperator.id !== id) {
                if (existingOperator.name === name) {
                    throw new common_1.ConflictException(`El nombre "${name}" ya está en uso.`);
                }
                if (existingOperator.whatsapp === whatsapp) {
                    throw new common_1.ConflictException(`El número de WhatsApp "${whatsapp}" ya está en uso.`);
                }
                if (existingOperator.email === email) {
                    throw new common_1.ConflictException(`El correo electrónico "${email}" ya está en uso.`);
                }
            }
        }
        await this.operatorRepository.update(id, {
            ...updateOperatorDto,
            image: updateOperatorDto.image || operator.image,
        });
        return this.operatorRepository.findOne({ where: { id } });
    }
    async remove(id) {
        const operator = await this.operatorRepository.findOne({ where: { id } });
        if (!operator) {
            throw new common_1.HttpException('El operator no fue encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        const relatedOrders = await this.orderRepository.find({
            where: { operator: { id } },
        });
        if (relatedOrders.length > 0) {
            throw new common_1.HttpException(`No se puede eliminar el operator con ID ${id} porque tiene orders asociados.`, common_1.HttpStatus.CONFLICT);
        }
        await this.operatorRepository.delete(id);
        return { message: `El operator con ID ${id} fue eliminado exitosamente` };
    }
};
exports.OperatorService = OperatorService;
exports.OperatorService = OperatorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(operator_entity_1.OperatorEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], OperatorService);
//# sourceMappingURL=operator.service.js.map