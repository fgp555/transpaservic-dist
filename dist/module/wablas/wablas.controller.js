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
exports.WablasController = void 0;
const common_1 = require("@nestjs/common");
const wablas_service_1 = require("./wablas.service");
const create_wabla_dto_1 = require("./dto/create-wabla.dto");
const update_wabla_dto_1 = require("./dto/update-wabla.dto");
const roles_decorator_1 = require("../../utils/roles/decorator/roles.decorator");
const roles_enum_1 = require("../../utils/roles/enum/roles.enum");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../../utils/roles/roles.guard");
let WablasController = class WablasController {
    constructor(wablasService) {
        this.wablasService = wablasService;
    }
    sendWhatsapp(body) {
        return this.wablasService.sendWhatsapp(body);
    }
    test(wablaId) {
        return this.wablasService.test(wablaId);
    }
    create(createWablaDto) {
        return this.wablasService.create(createWablaDto);
    }
    findAll() {
        return this.wablasService.findAll();
    }
    findOne(id) {
        return this.wablasService.findOne(+id);
    }
    update(id, updateWablaDto) {
        return this.wablasService.update(+id, updateWablaDto);
    }
    remove(id) {
        return this.wablasService.remove(+id);
    }
};
exports.WablasController = WablasController;
__decorate([
    (0, common_1.Post)('sendWhatsapp'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WablasController.prototype, "sendWhatsapp", null);
__decorate([
    (0, common_1.Post)('send-test/:wablaId'),
    __param(0, (0, common_1.Param)('wablaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WablasController.prototype, "test", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_wabla_dto_1.CreateWablaDto]),
    __metadata("design:returntype", void 0)
], WablasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('findAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WablasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findOne/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WablasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_wabla_dto_1.UpdateWablaDto]),
    __metadata("design:returntype", void 0)
], WablasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WablasController.prototype, "remove", null);
exports.WablasController = WablasController = __decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('wablas'),
    __metadata("design:paramtypes", [wablas_service_1.WablasService])
], WablasController);
//# sourceMappingURL=wablas.controller.js.map