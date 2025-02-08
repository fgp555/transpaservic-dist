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
exports.WablasReportEntity = void 0;
const typeorm_1 = require("typeorm");
let WablasReportEntity = class WablasReportEntity {
};
exports.WablasReportEntity = WablasReportEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], WablasReportEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WablasReportEntity.prototype, "deviceID", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WablasReportEntity.prototype, "fromPhone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WablasReportEntity.prototype, "toPhone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WablasReportEntity.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], WablasReportEntity.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], WablasReportEntity.prototype, "URL_file", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WablasReportEntity.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WablasReportEntity.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], WablasReportEntity.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], WablasReportEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], WablasReportEntity.prototype, "createdAtOfWablas", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], WablasReportEntity.prototype, "updatedAt", void 0);
exports.WablasReportEntity = WablasReportEntity = __decorate([
    (0, typeorm_1.Entity)('wablas_report')
], WablasReportEntity);
//# sourceMappingURL=wabla-report.entity.js.map