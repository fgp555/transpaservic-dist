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
exports.WaContactsEntity = void 0;
const typeorm_1 = require("typeorm");
const message_entity_1 = require("./message.entity");
let WaContactsEntity = class WaContactsEntity {
};
exports.WaContactsEntity = WaContactsEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WaContactsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WaContactsEntity.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WaContactsEntity.prototype, "contactPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], WaContactsEntity.prototype, "contactName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], WaContactsEntity.prototype, "lastMessageContent", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], WaContactsEntity.prototype, "lastMessageTimestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: message_entity_1.MessageStatusEnum,
        nullable: true,
    }),
    __metadata("design:type", String)
], WaContactsEntity.prototype, "lastMessageStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], WaContactsEntity.prototype, "unreadCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], WaContactsEntity.prototype, "inSupportChat", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint', nullable: true }),
    __metadata("design:type", Number)
], WaContactsEntity.prototype, "lastAgentInteraction", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WaContactsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], WaContactsEntity.prototype, "updatedAt", void 0);
exports.WaContactsEntity = WaContactsEntity = __decorate([
    (0, typeorm_1.Entity)('whatsapp_contact'),
    (0, typeorm_1.Unique)(['contactPhone'])
], WaContactsEntity);
//# sourceMappingURL=contacts.entity.js.map