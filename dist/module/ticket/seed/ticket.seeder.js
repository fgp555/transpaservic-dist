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
exports.TicketSeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const ticket_entity_1 = require("../entities/ticket.entity");
let TicketSeederService = class TicketSeederService {
    constructor(ticketRepository) {
        this.ticketRepository = ticketRepository;
        console.log(' TicketSeederService Starting seed...');
    }
    async seed() {
        const demoData = [
            {
                transportContract: '12218548',
                orderNumber: '11020',
                mainDiagnosis: 'aaaa',
                client: 'xxx',
                patientName: 'david lopez',
                idCard: '79688623',
                origin: 'bucaramanga',
                destination: 'yopal',
                itinerary: 'bucaramanga-yopal',
                quantity: 2,
                remarks: 'pruebas',
                travelDate: new Date('2024-08-30'),
                email: 'client1@gmail.com',
                creationDate: new Date('2024-08-12'),
                check: 'xxx',
                value: 60000,
                netValue: 120000,
                serviceProvider: 'motilones',
                userPhone: '3124163032',
                transport: { id: 1 },
            },
            {
                transportContract: '12218549',
                orderNumber: '11021',
                mainDiagnosis: 'aaaa',
                client: 'xxx',
                patientName: 'david lopez',
                idCard: '79688623',
                origin: 'bucaramanga',
                destination: 'yopal',
                itinerary: 'bucaramanga-yopal',
                quantity: 2,
                remarks: 'pruebas',
                travelDate: new Date('2024-08-30'),
                email: 'client2@mail.com',
                creationDate: new Date('2024-08-12'),
                check: 'xxx',
                value: 60000,
                netValue: 120000,
                serviceProvider: 'motilones',
                userPhone: '3124163032',
                transport: { id: 2 },
            },
        ];
        for (const data of demoData) {
            const ticket = this.ticketRepository.create(data);
            const exists = await this.ticketRepository.findOne({
                where: { transportContract: data.transportContract },
            });
            if (!exists) {
                await this.ticketRepository.save(ticket);
                console.log(`Ticket creado con transportContract: ${data.transportContract}`);
            }
            else {
                console.log(`Ticket ya existe con transportContract: ${data.transportContract}`);
            }
        }
        console.log('TicketSeederService ejecutado correctamente');
    }
};
exports.TicketSeederService = TicketSeederService;
exports.TicketSeederService = TicketSeederService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(ticket_entity_1.TicketEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TicketSeederService);
//# sourceMappingURL=ticket.seeder.js.map