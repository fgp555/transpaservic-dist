"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportModule = void 0;
const common_1 = require("@nestjs/common");
const transport_service_1 = require("./transport.service");
const transport_controller_1 = require("./transport.controller");
const typeorm_1 = require("@nestjs/typeorm");
const transport_entity_1 = require("./entities/transport.entity");
const transport_seeder_1 = require("./seed/transport.seeder");
const ticket_entity_1 = require("../ticket/entities/ticket.entity");
let TransportModule = class TransportModule {
};
exports.TransportModule = TransportModule;
exports.TransportModule = TransportModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([transport_entity_1.TransportEntity, ticket_entity_1.TicketEntity])],
        controllers: [transport_controller_1.TransportController],
        providers: [transport_service_1.TransportService, transport_seeder_1.TransportSeederService],
    })
], TransportModule);
//# sourceMappingURL=transport.module.js.map