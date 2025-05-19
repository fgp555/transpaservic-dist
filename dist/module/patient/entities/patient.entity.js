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
exports.PatientEntity = void 0;
const order_entity_1 = require("../../order/entities/order.entity");
const typeorm_1 = require("typeorm");
const travelDates_entity_1 = require("./travelDates.entity");
let PatientEntity = class PatientEntity {
};
exports.PatientEntity = PatientEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], PatientEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: order_entity_1.DocumentType,
        nullable: true,
        default: order_entity_1.DocumentType.CC,
    }),
    __metadata("design:type", String)
], PatientEntity.prototype, "documentType", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PatientEntity.prototype, "idCard", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PatientEntity.prototype, "validateIdCard", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PatientEntity.prototype, "patientName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PatientEntity.prototype, "userPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PatientEntity.prototype, "idCardImageFront", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], PatientEntity.prototype, "idCardImageBack", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => travelDates_entity_1.TravelDatesEntity, (travel) => travel.patient, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], PatientEntity.prototype, "travelDates", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PatientEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PatientEntity.prototype, "updatedAt", void 0);
exports.PatientEntity = PatientEntity = __decorate([
    (0, typeorm_1.Entity)('patient')
], PatientEntity);
//# sourceMappingURL=patient.entity.js.map