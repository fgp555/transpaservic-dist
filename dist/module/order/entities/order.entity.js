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
exports.OrderEntity = exports.OrderStatus = void 0;
const operator_entity_1 = require("../../operator/entities/operator.entity");
const typeorm_1 = require("typeorm");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["PENDIENTE"] = "pendiente";
    OrderStatus["APROBADO"] = "aprobado";
    OrderStatus["CANCELADO"] = "cancelado";
})(OrderStatus || (exports.OrderStatus = OrderStatus = {}));
let OrderEntity = class OrderEntity {
};
exports.OrderEntity = OrderEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'operator_contract',
        type: 'varchar',
        length: 50,
        unique: true,
    }),
    __metadata("design:type", String)
], OrderEntity.prototype, "operatorContract", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'order_number', type: 'varchar', length: 50, unique: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "orderNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'main_diagnosis', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], OrderEntity.prototype, "authorizationNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'client', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], OrderEntity.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'patient_name', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], OrderEntity.prototype, "patientName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_card', type: 'varchar', length: 50 }),
    __metadata("design:type", String)
], OrderEntity.prototype, "idCard", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'user_phone', type: 'varchar', length: 20 }),
    __metadata("design:type", String)
], OrderEntity.prototype, "userPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], OrderEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', nullable: false }),
    __metadata("design:type", Date)
], OrderEntity.prototype, "creationDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'origin', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], OrderEntity.prototype, "origin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'destination', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], OrderEntity.prototype, "destination", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'itinerary', type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], OrderEntity.prototype, "itinerary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'quantity', type: 'int' }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'travel_date', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], OrderEntity.prototype, "travelDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'value', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'net_value', type: 'decimal', precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "netValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'remarks', type: 'text', nullable: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "remarks", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'status',
        type: 'enum',
        enum: OrderStatus,
        default: OrderStatus.PENDIENTE,
    }),
    __metadata("design:type", String)
], OrderEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => operator_entity_1.OperatorEntity, (t) => t.orders),
    __metadata("design:type", operator_entity_1.OperatorEntity)
], OrderEntity.prototype, "operator", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "ticketNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "ticketImage", void 0);
exports.OrderEntity = OrderEntity = __decorate([
    (0, typeorm_1.Entity)('order')
], OrderEntity);
//# sourceMappingURL=order.entity.js.map