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
exports.AuthPasswordController = void 0;
const common_1 = require("@nestjs/common");
const auth_password_service_1 = require("./auth-password.service");
let AuthPasswordController = class AuthPasswordController {
    constructor(authPasswordService) {
        this.authPasswordService = authPasswordService;
    }
    decodeToken(authHeader) {
        const token = authHeader?.split(' ')[1];
        if (!token) {
            throw new common_1.UnauthorizedException('Token no proporcionado');
        }
        return this.authPasswordService.decodeToken(token);
    }
    refreshAccessToken(authHeader) {
        const token = authHeader?.split(' ')[1];
        return this.authPasswordService.refreshAccessToken(token);
    }
    async forgotPassword(body) {
        const { email, domain } = body;
        return await this.authPasswordService.forgotPassword(email, domain);
    }
    async restorePassword(emailEncrypt, newPassword) {
        try {
            await this.authPasswordService.restorePassword(emailEncrypt, newPassword);
            return { message: 'La contraseña se ha restablecido correctamente' };
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.AuthPasswordController = AuthPasswordController;
__decorate([
    (0, common_1.Post)('token/decode'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthPasswordController.prototype, "decodeToken", null);
__decorate([
    (0, common_1.Post)('token/refresh'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthPasswordController.prototype, "refreshAccessToken", null);
__decorate([
    (0, common_1.Post)('forgotPassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthPasswordController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('restorePassword'),
    __param(0, (0, common_1.Body)('emailEncrypt')),
    __param(1, (0, common_1.Body)('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthPasswordController.prototype, "restorePassword", null);
exports.AuthPasswordController = AuthPasswordController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_password_service_1.AuthPasswordService])
], AuthPasswordController);
//# sourceMappingURL=auth-password.controller.js.map