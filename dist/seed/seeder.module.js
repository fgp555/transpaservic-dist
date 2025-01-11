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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const ticket_entity_1 = require("../module/ticket/entities/ticket.entity");
const ticket_seeder_1 = require("../module/ticket/seed/ticket.seeder");
const transport_entity_1 = require("../module/transport/entities/transport.entity");
const transport_seeder_1 = require("../module/transport/seed/transport.seeder");
const user_entity_1 = require("../module/user/entities/user.entity");
const user_seeder_1 = require("../module/user/seed/user.seeder");
const user_service_1 = require("../module/user/user.service");
let SeederModule = class SeederModule {
    constructor(transportSeederService, userSeederService, ticketSeederService) {
        this.transportSeederService = transportSeederService;
        this.userSeederService = userSeederService;
        this.ticketSeederService = ticketSeederService;
        this.seed();
    }
    async seed() {
        await this.transportSeederService.seed();
        await this.userSeederService.seed();
        await this.ticketSeederService.seed();
    }
};
exports.SeederModule = SeederModule;
exports.SeederModule = SeederModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([transport_entity_1.TransportEntity, user_entity_1.UserEntity, ticket_entity_1.TicketEntity])],
        providers: [transport_seeder_1.TransportSeederService, user_seeder_1.UserSeederService, user_service_1.UserService, ticket_seeder_1.TicketSeederService],
    }),
    __metadata("design:paramtypes", [transport_seeder_1.TransportSeederService,
        user_seeder_1.UserSeederService,
        ticket_seeder_1.TicketSeederService])
], SeederModule);
//# sourceMappingURL=seeder.module.js.map