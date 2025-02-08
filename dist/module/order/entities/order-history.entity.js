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
exports.OrderHistoryEntity = exports.ActionEnum = void 0;
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
const user_entity_1 = require("../../user/entities/user.entity");
var ActionEnum;
(function (ActionEnum) {
    ActionEnum["CREATED"] = "created";
    ActionEnum["UPDATED"] = "updated";
    ActionEnum["DELETED"] = "deleted";
    ActionEnum["BACKTICKET"] = "backticket";
    ActionEnum["APPROVED"] = "approved";
})(ActionEnum || (exports.ActionEnum = ActionEnum = {}));
let OrderHistoryEntity = class OrderHistoryEntity {
};
exports.OrderHistoryEntity = OrderHistoryEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderHistoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.OrderEntity, (order) => order.orderHistory, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", order_entity_1.OrderEntity)
], OrderHistoryEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, { eager: true }),
    __metadata("design:type", user_entity_1.UserEntity)
], OrderHistoryEntity.prototype, "modifiedByUser", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ActionEnum, default: ActionEnum.CREATED }),
    __metadata("design:type", String)
], OrderHistoryEntity.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderHistoryEntity.prototype, "modifiedAt", void 0);
exports.OrderHistoryEntity = OrderHistoryEntity = __decorate([
    (0, typeorm_1.Entity)()
], OrderHistoryEntity);
//# sourceMappingURL=order-history.entity.js.map