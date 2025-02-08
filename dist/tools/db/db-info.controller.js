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
exports.DBInfoController = void 0;
const common_1 = require("@nestjs/common");
const roles_decorator_1 = require("../../utils/roles/decorator/roles.decorator");
const roles_enum_1 = require("../../utils/roles/enum/roles.enum");
const auth_guard_1 = require("../../module/auth/auth.guard");
const roles_guard_1 = require("../../utils/roles/roles.guard");
const db_info_service_1 = require("./db-info.service");
let DBInfoController = class DBInfoController {
    constructor(dbInfoService) {
        this.dbInfoService = dbInfoService;
    }
    async getDBInfo() {
        return await this.dbInfoService.getDBInfo();
    }
    infoConfig() {
        return this.dbInfoService.infoConfig();
    }
    getEntities() {
        return this.dbInfoService.getEntities();
    }
    async stats() {
        return this.dbInfoService.stats();
    }
    dropSynchronize(request) {
        return this.dbInfoService.dropSynchronize();
    }
    dropSchema(request) {
        return this.dbInfoService.dropSchema();
    }
    synchronize(request) {
        return this.dbInfoService.synchronize();
    }
    async runMigrations() {
        return this.dbInfoService.runMigrations();
    }
    async getQueryLogs() {
        return this.dbInfoService.getQueryLogs();
    }
    async pingDatabase() {
        return this.dbInfoService.pingDatabase();
    }
    async showMigrations() {
        return this.dbInfoService.showMigrations();
    }
};
exports.DBInfoController = DBInfoController;
__decorate([
    (0, common_1.Get)('info'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DBInfoController.prototype, "getDBInfo", null);
__decorate([
    (0, common_1.Get)('infoConfig'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DBInfoController.prototype, "infoConfig", null);
__decorate([
    (0, common_1.Get)('entities'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DBInfoController.prototype, "getEntities", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DBInfoController.prototype, "stats", null);
__decorate([
    (0, common_1.Delete)('dropSynchronize'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DBInfoController.prototype, "dropSynchronize", null);
__decorate([
    (0, common_1.Delete)('dropSchema'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DBInfoController.prototype, "dropSchema", null);
__decorate([
    (0, common_1.Put)('synchronize'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DBInfoController.prototype, "synchronize", null);
__decorate([
    (0, common_1.Put)('runMigrations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DBInfoController.prototype, "runMigrations", null);
__decorate([
    (0, common_1.Get)('query-logs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DBInfoController.prototype, "getQueryLogs", null);
__decorate([
    (0, common_1.Get)('ping'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DBInfoController.prototype, "pingDatabase", null);
__decorate([
    (0, common_1.Get)('showMigrations'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DBInfoController.prototype, "showMigrations", null);
exports.DBInfoController = DBInfoController = __decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('dbInfo'),
    __metadata("design:paramtypes", [db_info_service_1.DBInfoService])
], DBInfoController);
//# sourceMappingURL=db-info.controller.js.map