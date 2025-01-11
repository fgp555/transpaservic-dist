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
exports.TicketService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ticket_entity_1 = require("./entities/ticket.entity");
let TicketService = class TicketService {
    constructor(ticketRepository) {
        this.ticketRepository = ticketRepository;
    }
    async create(createTicketDto) {
        const { transportContract, orderNumber } = createTicketDto;
        const existingTransportContract = await this.ticketRepository.findOne({
            where: { transportContract },
        });
        if (existingTransportContract) {
            throw new common_1.ConflictException(`Entrada duplicada para el contrato de transporte: ${transportContract}`);
        }
        const existingOrderNumber = await this.ticketRepository.findOne({
            where: { orderNumber },
        });
        if (existingOrderNumber) {
            throw new common_1.ConflictException(`Entrada duplicada para el número de orden: ${orderNumber}`);
        }
        const ticket = this.ticketRepository.create(createTicketDto);
        try {
            return await this.ticketRepository.save(ticket);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Ocurrió un error inesperado');
        }
    }
    async findAll() {
        const tickets = await this.ticketRepository.find({
            relations: ['transport'],
        });
        return tickets.map((ticket) => ({
            ...ticket,
            transport: ticket.transport?.name || null,
        }));
    }
    async findOne(id) {
        const ticket = await this.ticketRepository.findOne({
            where: { id },
            relations: ['transport'],
        });
        if (!ticket) {
            throw new common_1.NotFoundException(`Ticket con ID ${id} no encontrado`);
        }
        return {
            ...ticket,
            transport: ticket.transport?.name || null,
        };
    }
    async update(id, updateTicketDto) {
        await this.ticketRepository.update(id, updateTicketDto);
        return this.findOne(id);
    }
    async remove(id) {
        const ticket = await this.ticketRepository.findOne({
            where: { id },
        });
        if (!ticket) {
            throw new common_1.NotFoundException(`Ticket con ID ${id} no encontrado`);
        }
        await this.ticketRepository.delete(id);
    }
};
exports.TicketService = TicketService;
exports.TicketService = TicketService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_entity_1.TicketEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TicketService);
//# sourceMappingURL=ticket.service.js.map