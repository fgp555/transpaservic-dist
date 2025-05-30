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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const order_history_entity_1 = require("../order/entities/order-history.entity");
let UserService = class UserService {
    constructor(userRepository, orderHistoryRepository) {
        this.userRepository = userRepository;
        this.orderHistoryRepository = orderHistoryRepository;
    }
    async create(createUserDto) {
        if (createUserDto.email) {
            const existingUser = await this.findByEmail(createUserDto.email).catch(() => null);
            if (existingUser) {
                throw new common_1.ConflictException('El correo electrónico ya existe');
            }
        }
        try {
            const user = this.userRepository.create(createUserDto);
            return await this.userRepository.save(user);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create user', error.message);
        }
    }
    async findAllSuper() {
        return await this.userRepository.find();
    }
    async findAll(filters) {
        const { operator, page, limit, search, role } = filters;
        try {
            const query = this.userRepository.createQueryBuilder('user');
            query.leftJoinAndSelect('user.operator', 'operator');
            query.andWhere('user.isVisible = :isVisible', { isVisible: true });
            if (operator) {
                query.andWhere('operator.id = :operator', { operator });
            }
            if (role) {
                query.andWhere('user.role = :role', { role });
            }
            query.andWhere('user.role != :superadmin', { superadmin: 'superadmin' });
            if (search) {
                query.andWhere(`(
          user.firstName LIKE :search OR
          user.lastName LIKE :search OR
          user.email LIKE :search OR
          user.whatsapp LIKE :search OR
          CAST(user.id AS CHAR) LIKE :search OR
          operator.name LIKE :search
        )`, { search: `%${search}%` });
            }
            query.orderBy('user.firstName', 'ASC');
            const skip = (page - 1) * limit;
            query.skip(skip).take(limit);
            const [results, total] = await query.getManyAndCount();
            const totalPages = Math.ceil(total / limit);
            return {
                total,
                totalPages,
                results,
            };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to fetch users', error.message);
        }
    }
    async findByEmail(email) {
        if (!email) {
            throw new common_1.BadRequestException('Email must be provided');
        }
        const user = await this.userRepository.findOne({
            where: { email },
        });
        return user || null;
    }
    async findOneEmail(email) {
        return await this.userRepository
            .createQueryBuilder('user')
            .addSelect('user.password')
            .leftJoinAndSelect('user.operator', 'operator')
            .leftJoinAndSelect('user.devices', 'devices')
            .where('user.email = :email', { email: email })
            .getOne();
    }
    async findOne(id) {
        if (!id) {
            throw new common_1.BadRequestException('Formato de ID inválido');
        }
        const user = await this.userRepository.findOne({
            where: { id: id },
            relations: ['operator', 'devices'],
        });
        if (!user) {
            throw new common_1.NotFoundException(`Usuario con ID ${id} no encontrado`);
        }
        return user;
    }
    async findByIdforSeeder(userId) {
        return this.userRepository.findOne({
            where: { id: userId },
        });
    }
    async findByRole(role, orderBy, order, limit) {
        const query = this.userRepository
            .createQueryBuilder('user')
            .where('user.role = :role', { role })
            .orderBy(`user.${orderBy}`, order);
        if (limit) {
            query.take(limit);
        }
        const users = await query.getMany();
        return users;
    }
    async update(id, body) {
        const findUser = await this.userRepository.findOne({ where: { id: id } });
        if (!findUser) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        try {
            const updatedUser = this.userRepository.merge(findUser, body);
            await this.userRepository.save(updatedUser);
            return updatedUser;
        }
        catch (error) {
            console.error('Error updating user:', error);
            throw new common_1.InternalServerErrorException('Failed to update user', error.message);
        }
    }
    async remove(id) {
        const user = await this.findOne(id);
        try {
            return await this.userRepository.remove(user);
        }
        catch (error) {
            if (error.message.includes('violates foreign key constraint')) {
                throw new common_1.InternalServerErrorException('No se puede eliminar el usuario porque está relacionado con otras entidades (como citas). Elimina primero esas relaciones.');
            }
            throw new common_1.InternalServerErrorException('Error al intentar eliminar al usuario. Por favor, inténtalo de nuevo más tarde.', error.message);
        }
    }
    async deleteMany(userIds) {
        const users = await this.userRepository.find({
            where: { id: (0, typeorm_2.In)(userIds) },
        });
        if (users.length !== userIds.length) {
            throw new common_1.NotFoundException('Uno o más usuarios no fueron encontrados.');
        }
        const usersWithHistory = await this.orderHistoryRepository.find({
            where: {
                modifiedByUser: (0, typeorm_2.In)(userIds),
            },
            relations: ['modifiedByUser'],
        });
        if (usersWithHistory.length > 0) {
            const userIdsWithHistory = [
                ...new Set(usersWithHistory.map((h) => h.modifiedByUser.id)),
            ];
            const userInfo = users
                .filter((user) => userIdsWithHistory.includes(user.id))
                .map((user) => `${user.firstName || user.email || 'sin nombre'}`)
                .join(', ');
            throw new common_1.ConflictException(`No se pueden eliminar los siguientes usuarios porque tienen historial de órdenes: ${userInfo}`);
        }
        await this.userRepository.remove(users);
        return {
            message: 'Usuarios eliminados exitosamente',
            deletedIds: userIds,
        };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(order_history_entity_1.OrderHistoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map