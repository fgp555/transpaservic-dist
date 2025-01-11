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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MunicipalityController = void 0;
const common_1 = require("@nestjs/common");
const municipality_service_1 = require("./municipality.service");
const create_municipality_dto_1 = require("./dto/create-municipality.dto");
const update_municipality_dto_1 = require("./dto/update-municipality.dto");
let MunicipalityController = class MunicipalityController {
    constructor(municipalityService) {
        this.municipalityService = municipalityService;
    }
    create(createMunicipalityDto) {
        return this.municipalityService.create(createMunicipalityDto);
    }
    findAll() {
        return this.municipalityService.findAll();
    }
    findOne(id) {
        return this.municipalityService.findOne(+id);
    }
    update(id, updateMunicipalityDto) {
        return this.municipalityService.update(+id, updateMunicipalityDto);
    }
    remove(id) {
        return this.municipalityService.remove(+id);
    }
};
exports.MunicipalityController = MunicipalityController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_municipality_dto_1.CreateMunicipalityDto]),
    __metadata("design:returntype", void 0)
], MunicipalityController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MunicipalityController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MunicipalityController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_municipality_dto_1.UpdateMunicipalityDto]),
    __metadata("design:returntype", void 0)
], MunicipalityController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MunicipalityController.prototype, "remove", null);
exports.MunicipalityController = MunicipalityController = __decorate([
    (0, common_1.Controller)('municipality'),
    __metadata("design:paramtypes", [municipality_service_1.MunicipalityService])
], MunicipalityController);
//# sourceMappingURL=municipality.controller.js.map