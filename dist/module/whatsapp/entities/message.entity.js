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
exports.WaMessageEntity = exports.MessageStatusEnum = void 0;
const typeorm_1 = require("typeorm");
var MessageStatusEnum;
(function (MessageStatusEnum) {
    MessageStatusEnum["INCOMING"] = "incoming";
    MessageStatusEnum["SENT"] = "sent";
    MessageStatusEnum["DELIVERED"] = "delivered";
    MessageStatusEnum["READ"] = "read";
    MessageStatusEnum["FAILED"] = "failed";
    MessageStatusEnum["PENDING"] = "pending";
})(MessageStatusEnum || (exports.MessageStatusEnum = MessageStatusEnum = {}));
let WaMessageEntity = class WaMessageEntity {
};
exports.WaMessageEntity = WaMessageEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WaMessageEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WaMessageEntity.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WaMessageEntity.prototype, "userEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WaMessageEntity.prototype, "whatsappMessageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WaMessageEntity.prototype, "from", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WaMessageEntity.prototype, "to", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'text' }),
    __metadata("design:type", String)
], WaMessageEntity.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WaMessageEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WaMessageEntity.prototype, "templateName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WaMessageEntity.prototype, "messageType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WaMessageEntity.prototype, "messageButtonText", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'bigint' }),
    __metadata("design:type", Number)
], WaMessageEntity.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WaMessageEntity.prototype, "reactionToMessageId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WaMessageEntity.prototype, "reactionEmoji", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: MessageStatusEnum,
        default: MessageStatusEnum.PENDING,
    }),
    __metadata("design:type", String)
], WaMessageEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'longtext', nullable: true, select: false }),
    __metadata("design:type", String)
], WaMessageEntity.prototype, "payload", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WaMessageEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], WaMessageEntity.prototype, "updatedAt", void 0);
exports.WaMessageEntity = WaMessageEntity = __decorate([
    (0, typeorm_1.Entity)('whatsapp_message')
], WaMessageEntity);
//# sourceMappingURL=message.entity.js.map