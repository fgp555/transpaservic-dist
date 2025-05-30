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
exports.OperatorEntity = void 0;
const notification_entity_1 = require("../../notification/entities/notification.entity");
const order_entity_1 = require("../../order/entities/order.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const typeorm_1 = require("typeorm");
let OperatorEntity = class OperatorEntity {
};
exports.OperatorEntity = OperatorEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OperatorEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OperatorEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OperatorEntity.prototype, "whatsapp", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OperatorEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OperatorEntity.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OperatorEntity.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'datetime',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    __metadata("design:type", Date)
], OperatorEntity.prototype, "registrationDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.OrderEntity, (t) => t.operator, {}),
    __metadata("design:type", order_entity_1.OrderEntity)
], OperatorEntity.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_entity_1.UserEntity, (t) => t.operator, {}),
    __metadata("design:type", Array)
], OperatorEntity.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => notification_entity_1.NotificationEntity, (notification) => notification.operator),
    __metadata("design:type", Array)
], OperatorEntity.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OperatorEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OperatorEntity.prototype, "updatedAt", void 0);
exports.OperatorEntity = OperatorEntity = __decorate([
    (0, typeorm_1.Entity)('operator')
], OperatorEntity);
//# sourceMappingURL=operator.entity.js.map