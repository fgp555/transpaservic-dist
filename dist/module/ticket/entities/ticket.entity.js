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
exports.TicketEntity = exports.TicketStatus = void 0;
const transport_entity_1 = require("../../transport/entities/transport.entity");
const typeorm_1 = require("typeorm");
var TicketStatus;
(function (TicketStatus) {
    TicketStatus["APROBADO"] = "aprobado";
    TicketStatus["PENDIENTE"] = "pendiente";
})(TicketStatus || (exports.TicketStatus = TicketStatus = {}));
let TicketEntity = class TicketEntity {
};
exports.TicketEntity = TicketEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TicketEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'transport_contract',
        type: 'varchar',
        length: 50,
        unique: true,
    }),
    __metadata("design:type", String)
], TicketEntity.prototype, "transportContract", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_number', type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], TicketEntity.prototype, "orderNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'main_diagnosis', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TicketEntity.prototype, "mainDiagnosis", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TicketEntity.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'patient_name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TicketEntity.prototype, "patientName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_card', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], TicketEntity.prototype, "idCard", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_phone', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], TicketEntity.prototype, "userPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TicketEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'creation_date', type: 'date' }),
    __metadata("design:type", Date)
], TicketEntity.prototype, "creationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'origin', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TicketEntity.prototype, "origin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'destination', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TicketEntity.prototype, "destination", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'itinerary', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TicketEntity.prototype, "itinerary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity', type: 'int' }),
    __metadata("design:type", Number)
], TicketEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'travel_date', type: 'date' }),
    __metadata("design:type", Date)
], TicketEntity.prototype, "travelDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'value', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], TicketEntity.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'net_value', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], TicketEntity.prototype, "netValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'check', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TicketEntity.prototype, "check", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'remarks', type: 'text', nullable: true }),
    __metadata("design:type", String)
], TicketEntity.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'enum',
        enum: TicketStatus,
        default: TicketStatus.PENDIENTE,
    }),
    __metadata("design:type", String)
], TicketEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => transport_entity_1.TransportEntity, (t) => t.tickets),
    __metadata("design:type", transport_entity_1.TransportEntity)
], TicketEntity.prototype, "transport", void 0);
exports.TicketEntity = TicketEntity = __decorate([
    (0, typeorm_1.Entity)('ticket')
], TicketEntity);
//# sourceMappingURL=ticket.entity.js.map