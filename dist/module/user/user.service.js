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
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
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
    async findAll(filters) {
        const { operator, page, limit, search, role } = filters;
        try {
            const query = this.userRepository.createQueryBuilder('user');
            query.leftJoinAndSelect('user.operator', 'operator');
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
            query.orderBy('user.createdAt', 'DESC');
            const skip = (page - 1) * limit;
            query.skip(skip).take(limit);
            const [results, total] = await query.getManyAndCount();
            const totalPages = Math.ceil(total / limit);
            return {
                results,
                total,
                totalPages,
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
            .where('user.email = :email', { email: email })
            .getOne();
    }
    async findOne(id) {
        if (!id) {
            throw new common_1.BadRequestException('Formato de ID inválido');
        }
        const user = await this.userRepository.findOne({
            where: { id: id },
            relations: ['operator', 'wabla'],
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
            const updateResult = await this.userRepository.update(id, body);
            if (updateResult.affected === 0) {
                throw new common_1.InternalServerErrorException('Failed to update user');
            }
            return await this.userRepository.findOne({ where: { id: id } });
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map