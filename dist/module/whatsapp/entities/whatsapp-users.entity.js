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
exports.WhatsappUsersEntity = void 0;
const typeorm_1 = require("typeorm");
const whatsapp_messages_entity_1 = require("./whatsapp-messages.entity");
let WhatsappUsersEntity = class WhatsappUsersEntity {
};
exports.WhatsappUsersEntity = WhatsappUsersEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], WhatsappUsersEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappUsersEntity.prototype, "WHATSAPP_ID", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappUsersEntity.prototype, "contacts_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WhatsappUsersEntity.prototype, "statuses_status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], WhatsappUsersEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], WhatsappUsersEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => whatsapp_messages_entity_1.WhatsappMessagesEntity, (history) => history.whatsappMessage, {}),
    __metadata("design:type", Array)
], WhatsappUsersEntity.prototype, "histories", void 0);
exports.WhatsappUsersEntity = WhatsappUsersEntity = __decorate([
    (0, typeorm_1.Entity)('whatsapp_users')
], WhatsappUsersEntity);
//# sourceMappingURL=whatsapp-users.entity.js.map