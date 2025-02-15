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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const auth_guard_1 = require("./auth.guard");
const mail_template_service_1 = require("../mail/mail-template.service");
const auth_password_service_1 = require("./auth.password.service");
const platform_express_1 = require("@nestjs/platform-express");
const roles_enum_1 = require("../../utils/roles/enum/roles.enum");
const roles_decorator_1 = require("../../utils/roles/decorator/roles.decorator");
const roles_guard_1 = require("../../utils/roles/roles.guard");
const auth_service_1 = require("./auth.service");
let AuthController = class AuthController {
    constructor(userService, jwtService, emailTemplatesService, authPasswordService, authService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.emailTemplatesService = emailTemplatesService;
        this.authPasswordService = authPasswordService;
        this.authService = authService;
    }
    validateToken(authHeader) {
        const token = authHeader?.split(' ')[1];
        return this.authService.validateToken(token);
    }
    refreshToken(authHeader) {
        const token = authHeader?.split(' ')[1];
        return this.authService.refreshAccessToken(token);
    }
    uploadSingle(file) {
        console.log('file', file);
        return {
            message: 'Archivo cargado exitosamente',
            filename: file.filename,
        };
    }
    async signup(body) {
        console.log('body', body);
        if (body.sendMail && body.email) {
            const find = await this.userService.findOneEmail(body.email);
            if (find)
                throw new common_1.UnauthorizedException('Este correo electrónico ya existe');
        }
        if (body.password) {
            body.password = await bcrypt.hash(body.password, 10);
        }
        try {
            const userCreate = await this.userService.create(body);
            const { password, ...withoutPassword } = userCreate;
            if (body.sendMail && body.email) {
                const sendMail = await this.emailTemplatesService.sentMailRegister(body);
                return { withoutPassword, sendMail };
            }
            else {
                return withoutPassword;
            }
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error al crear el usuario', error.message);
        }
    }
    async singin(createAuthDto) {
        const foundEmail = await this.userService.findOneEmail(createAuthDto.email);
        if (!foundEmail)
            throw new common_1.UnauthorizedException('Correo electrónico o contraseña incorrectos');
        const isPasswordValid = await bcrypt.compare(createAuthDto.password, foundEmail.password);
        if (!isPasswordValid)
            throw new common_1.UnauthorizedException('Correo electrónico o contraseña incorrectos');
        const { password, ...user } = foundEmail;
        const userPayload = {
            sub: foundEmail.id,
            userId: foundEmail.id,
            email: foundEmail.email,
            roles: [foundEmail.role === 'admin' ? roles_enum_1.RolesEnum.Admin : roles_enum_1.RolesEnum.User],
        };
        const token = this.jwtService.sign(userPayload);
        return { login: true, user, token };
    }
    async updateUser(id, body) {
        if (body.password) {
            body.password = await bcrypt.hash(body.password, 10);
        }
        try {
            const { wabla, ...rest } = body;
            const updatedUser = await this.userService.update(id, rest);
            const { password, ...withoutPassword } = updatedUser;
            return withoutPassword;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('No se pudo actualizar el usuario', error.message);
        }
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
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('token/validate'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "validateToken", null);
__decorate([
    (0, common_1.Post)('token/refresh'),
    __param(0, (0, common_1.Headers)('authorization')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('single'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "uploadSingle", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.Admin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "singin", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.Admin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)('forgotPassword'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Post)('restorePassword'),
    __param(0, (0, common_1.Body)('emailEncrypt')),
    __param(1, (0, common_1.Body)('newPassword')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "restorePassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mail_template_service_1.MailTemplatesService,
        auth_password_service_1.AuthPasswordService,
        auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map