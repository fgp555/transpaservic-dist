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
exports.WhatsappMessagesEntity = void 0;
const typeorm_1 = require("typeorm");
const whatsapp_users_entity_1 = require("./whatsapp-users.entity");
let WhatsappMessagesEntity = class WhatsappMessagesEntity {
};
exports.WhatsappMessagesEntity = WhatsappMessagesEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WhatsappMessagesEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => whatsapp_users_entity_1.WhatsappUsersEntity, (message) => message.histories),
    __metadata("design:type", whatsapp_users_entity_1.WhatsappUsersEntity)
], WhatsappMessagesEntity.prototype, "whatsappMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessagesEntity.prototype, "entry_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessagesEntity.prototype, "contacts_wa_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessagesEntity.prototype, "contacts_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessagesEntity.prototype, "messages_from", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessagesEntity.prototype, "messages_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessagesEntity.prototype, "messages_timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessagesEntity.prototype, "messages_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], WhatsappMessagesEntity.prototype, "messages_body", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessagesEntity.prototype, "reaction_emoji", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessagesEntity.prototype, "statuses_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessagesEntity.prototype, "statuses_timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessagesEntity.prototype, "statuses_recipient_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessagesEntity.prototype, "expiration_timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessagesEntity.prototype, "pricing_billable", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessagesEntity.prototype, "pricing_category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappMessagesEntity.prototype, "statuses_status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext', nullable: true }),
    __metadata("design:type", String)
], WhatsappMessagesEntity.prototype, "payload", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WhatsappMessagesEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], WhatsappMessagesEntity.prototype, "updatedAt", void 0);
exports.WhatsappMessagesEntity = WhatsappMessagesEntity = __decorate([
    (0, typeorm_1.Entity)('whatsapp_messages')
], WhatsappMessagesEntity);
//# sourceMappingURL=whatsapp-messages.entity.js.map