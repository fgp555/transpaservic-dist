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
exports.InfoController = void 0;
const common_1 = require("@nestjs/common");
const info_service_1 = require("./info.service");
const common_2 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const roles_decorator_1 = require("../../utils/roles/decorator/roles.decorator");
const roles_enum_1 = require("../../utils/roles/enum/roles.enum");
const auth_guard_1 = require("../../module/auth/auth.guard");
const roles_guard_1 = require("../../utils/roles/roles.guard");
let InfoController = class InfoController {
    constructor(infoService) {
        this.infoService = infoService;
    }
    getSystemInfo() {
        return this.infoService.getSystemInfo();
    }
    getAllEndpoints() {
        return this.infoService.listAllEndpoints();
    }
    async getServerAndDatabaseTime() {
        return await this.infoService.getServerAndDatabaseTime();
    }
    getPackageInfo() {
        return this.infoService.getPackageInfo();
    }
    getServerDomain(request) {
        const domain = `${request.protocol}://${request.get('host')}`;
        const info = {
            domain,
            protocol: request.protocol,
            host: request.get('host'),
            subdomain: request.subdomains[0],
            originalUrl: request.originalUrl,
            baseUrl: request.baseUrl,
            params: request.params,
            query: request.query,
            path: request.path,
            method: request.method,
            headers: request.headers,
            body: request.body,
            route: request.route,
        };
        return info;
    }
    getCookies(request) {
        const cookies = this.parseCookies(request.headers.cookie || '');
        return { cookies };
    }
    parseCookies(cookieHeader) {
        const cookies = {};
        cookieHeader.split(';').forEach((cookie) => {
            const [name, ...rest] = cookie.split('=');
            const value = rest.join('=').trim();
            if (name && value) {
                cookies[name.trim()] = decodeURIComponent(value);
            }
        });
        return cookies;
    }
    async createEnv(envData) {
        try {
            const envFilePath = path.resolve(__dirname, '../../../', '.env');
            fs.writeFileSync(envFilePath, envData, 'utf-8');
            const envContent = await this.infoService.readEnvFile();
            return envContent;
        }
        catch (error) {
            return {
                message: 'Error al crear el archivo .env',
                error: error.message,
            };
        }
    }
    async getEnvFile() {
        return this.infoService.readEnvFile();
    }
    getPerformanceStats() {
        return this.infoService.getPerformanceStats();
    }
    getLogs() {
        return this.infoService.getLogs();
    }
    async checkExternalService() {
        return await this.infoService.checkExternalService();
    }
};
exports.InfoController = InfoController;
__decorate([
    (0, common_1.Get)('system'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "getSystemInfo", null);
__decorate([
    (0, common_1.Get)('endpoints'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "getAllEndpoints", null);
__decorate([
    (0, common_1.Get)('time'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "getServerAndDatabaseTime", null);
__decorate([
    (0, common_1.Get)('package.json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "getPackageInfo", null);
__decorate([
    (0, common_1.Get)('domain'),
    __param(0, (0, common_2.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "getServerDomain", null);
__decorate([
    (0, common_1.Get)('cookies'),
    __param(0, (0, common_2.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "getCookies", null);
__decorate([
    (0, common_1.Post)('update-env'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "createEnv", null);
__decorate([
    (0, common_1.Get)('read-env'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "getEnvFile", null);
__decorate([
    (0, common_1.Get)('performance'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "getPerformanceStats", null);
__decorate([
    (0, common_1.Get)('logs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InfoController.prototype, "getLogs", null);
__decorate([
    (0, common_1.Get)('check-external-service'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InfoController.prototype, "checkExternalService", null);
exports.InfoController = InfoController = __decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.SuperAdmin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('info'),
    __metadata("design:paramtypes", [info_service_1.InfoService])
], InfoController);
//# sourceMappingURL=info.controller.js.map