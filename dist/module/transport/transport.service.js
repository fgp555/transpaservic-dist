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
exports.TransportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const transport_entity_1 = require("./entities/transport.entity");
const ticket_entity_1 = require("../ticket/entities/ticket.entity");
let TransportService = class TransportService {
    constructor(transportRepository, ticketRepository) {
        this.transportRepository = transportRepository;
        this.ticketRepository = ticketRepository;
    }
    async create(createTransportDto) {
        const { name, username, whatsapp, email } = createTransportDto;
        const existingName = await this.transportRepository.findOne({
            where: { name },
        });
        if (existingName) {
            throw new common_1.ConflictException(`El nombre "${name}" ya está en uso.`);
        }
        const existingUsername = await this.transportRepository.findOne({
            where: { username },
        });
        if (existingUsername) {
            throw new common_1.ConflictException(`El nombre de usuario "${username}" ya está en uso.`);
        }
        const existingWhatsapp = await this.transportRepository.findOne({
            where: { whatsapp },
        });
        if (existingWhatsapp) {
            throw new common_1.ConflictException(`El número de WhatsApp "${whatsapp}" ya está en uso.`);
        }
        const existingEmail = await this.transportRepository.findOne({
            where: { email },
        });
        if (existingEmail) {
            throw new common_1.ConflictException(`El correo electrónico "${email}" ya está en uso.`);
        }
        const transport = this.transportRepository.create(createTransportDto);
        return await this.transportRepository.save(transport);
    }
    async findAll() {
        return await this.transportRepository.find();
    }
    async findByName(name) {
        return await this.transportRepository.find({
            where: {
                name: (0, typeorm_2.Like)(`${name}%`),
            },
        });
    }
    async findOne(id) {
        return await this.transportRepository.findOne({
            where: { id },
            relations: ['tickets'],
        });
    }
    async update(id, updateTransportDto) {
        await this.transportRepository.update(id, updateTransportDto);
        return this.findOne(id);
    }
    async remove(id) {
        const transport = await this.transportRepository.findOne({ where: { id } });
        if (!transport) {
            throw new common_1.HttpException('El transporte no fue encontrado', common_1.HttpStatus.NOT_FOUND);
        }
        const relatedTickets = await this.ticketRepository.find({
            where: { transport: { id } },
        });
        if (relatedTickets.length > 0) {
            throw new common_1.HttpException(`No se puede eliminar el transporte con ID ${id} porque tiene tickets asociados.`, common_1.HttpStatus.CONFLICT);
        }
        await this.transportRepository.delete(id);
        return { message: `El transporte con ID ${id} fue eliminado exitosamente` };
    }
};
exports.TransportService = TransportService;
exports.TransportService = TransportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transport_entity_1.TransportEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(ticket_entity_1.TicketEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TransportService);
//# sourceMappingURL=transport.service.js.map