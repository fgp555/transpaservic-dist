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
exports.WablasReportController = void 0;
const common_1 = require("@nestjs/common");
const wablas_report_service_1 = require("./wablas-report.service");
const roles_decorator_1 = require("../../utils/roles/decorator/roles.decorator");
const roles_enum_1 = require("../../utils/roles/enum/roles.enum");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../../utils/roles/roles.guard");
const schedule_1 = require("@nestjs/schedule");
let WablasReportController = class WablasReportController {
    constructor(wablasReportService) {
        this.wablasReportService = wablasReportService;
    }
    async fetchAndSaveData() {
        return this.wablasReportService.fetchAndSaveData();
    }
    async getById(id) {
        return this.wablasReportService.getById(id);
    }
    findAllByFilters(status, deviceID, page = 1, limit = 10, search, dateFrom, dateTo) {
        return this.wablasReportService.findAllByFilters({
            status,
            deviceID,
            page: Number(page),
            limit: Number(limit),
            search,
            dateFrom,
            dateTo,
        });
    }
};
exports.WablasReportController = WablasReportController;
__decorate([
    (0, schedule_1.Cron)('0 3 * * *'),
    (0, common_1.Get)('fetchAndSaveData'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WablasReportController.prototype, "fetchAndSaveData", null);
__decorate([
    (0, common_1.Get)('getById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WablasReportController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('findAllByFilters'),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('deviceID')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('search')),
    __param(5, (0, common_1.Query)('dateFrom')),
    __param(6, (0, common_1.Query)('dateTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, Number, String, String, String]),
    __metadata("design:returntype", void 0)
], WablasReportController.prototype, "findAllByFilters", null);
exports.WablasReportController = WablasReportController = __decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin, roles_enum_1.RolesEnum.Collaborator),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('wablas-report'),
    __metadata("design:paramtypes", [wablas_report_service_1.WablasReportService])
], WablasReportController);
//# sourceMappingURL=wablas-report.controller.js.map