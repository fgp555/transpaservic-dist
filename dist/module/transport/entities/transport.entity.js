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
exports.TransportEntity = void 0;
const ticket_entity_1 = require("../../ticket/entities/ticket.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let TransportEntity = class TransportEntity {
};
exports.TransportEntity = TransportEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TransportEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TransportEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'username', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TransportEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'whatsapp', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], TransportEntity.prototype, "whatsapp", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], TransportEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'website', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", String)
], TransportEntity.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, default: 'https://bit.ly/fgpImg2' }),
    __metadata("design:type", String)
], TransportEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'registration_date',
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], TransportEntity.prototype, "registrationDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ticket_entity_1.TicketEntity, (t) => t.transport, {}),
    __metadata("design:type", ticket_entity_1.TicketEntity)
], TransportEntity.prototype, "tickets", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.UserEntity, (t) => t.transport, {}),
    __metadata("design:type", user_entity_1.UserEntity)
], TransportEntity.prototype, "users", void 0);
exports.TransportEntity = TransportEntity = __decorate([
    (0, typeorm_1.Entity)('transport')
], TransportEntity);
//# sourceMappingURL=transport.entity.js.map