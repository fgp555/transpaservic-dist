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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const update_user_dto_1 = require("../user/dtos/update-user.dto");
const mail_service_1 = require("../mail/mail.service");
const mail_template_service_1 = require("../mail/mail-template.service");
const roles_enum_1 = require("../../utils/roles/enum/roles.enum");
let AuthService = class AuthService {
    constructor(userService, jwtService, mailService, emailTemplatesService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.emailTemplatesService = emailTemplatesService;
        this.refreshTokens = new Map();
    }
    validateToken(token) {
        try {
            const decoded = this.jwtService.verify(token);
            if (decoded.exp) {
                const expirationDate = new Date(decoded.exp * 1000).toLocaleString();
                const currentDate = new Date().toLocaleString();
                return { ...decoded, expirationDate, currentDate };
            }
            return decoded;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token inválido o expirado');
        }
    }
    async refreshAccessToken(token) {
        try {
            const decoded = this.jwtService.verify(token);
            const foundUser = await this.userService.findOneEmail(decoded.email);
            if (!foundUser) {
                throw new common_1.NotFoundException('Usuario no encontrado');
            }
            const userPayload = {
                sub: foundUser.id,
                userId: foundUser.id,
                email: foundUser.email,
                roles: [foundUser.role === 'admin' ? roles_enum_1.RolesEnum.Admin : roles_enum_1.RolesEnum.User],
            };
            const newAccessToken = this.jwtService.sign(userPayload);
            if (decoded.exp) {
                const expirationDate = new Date(decoded.exp * 1000).toLocaleString();
                const currentDate = new Date().toLocaleString();
                return { ...decoded, expirationDate, currentDate, newAccessToken };
            }
            return { newAccessToken: newAccessToken };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Refresh token expirado o inválido');
        }
    }
    async signup(body) {
        try {
            const userCreate = await this.userService.create(body);
            const { password, ...withoutPassword } = userCreate;
            console.log('withoutPassword', withoutPassword);
            const tempData = {
                to: 'fgp555@gmail.com',
                name: 'Frank GP',
                message: 'Bienvenido a nuestro servicio. Estamos felices de tenerte con nosotros.',
                text: 'Este es el contenido alternativo en texto plano.',
            };
            await this.sendEmail(tempData);
            return withoutPassword;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to create user', error.message);
        }
    }
    async sendEmail(body) {
        const template = await this.emailTemplatesService.getTemplateById(1);
        if (!template) {
            throw new common_1.NotFoundException('Plantilla no encontrada');
        }
        const placeholders = {
            name: body.name || 'Usuario',
            message: body.message || 'Gracias por registrarte en nuestro servicio.',
        };
        const personalizedHtml = this.replacePlaceholders(template.htmlContent, placeholders);
        const emailBody = {
            to: body.to || 'fgp555@gmail.com',
            subject: template.subject,
            text: body.text || 'Este es el contenido del correo en texto plano',
            html: personalizedHtml,
        };
        try {
            const result = await this.mailService.sendMail(emailBody);
            console.log('Email sent successfully:', result);
            return { message: 'Correo enviado exitosamente', result };
        }
        catch (error) {
            console.error('Error sending email:', error);
            throw new common_1.InternalServerErrorException('Error al enviar el correo');
        }
    }
    replacePlaceholders(template, variables) {
        return template.replace(/{{(\w+)}}/g, (_, key) => variables[key] || `{{${key}}}`);
    }
    async singin(createAuthDto) {
        const foundEmail = await this.userService.findOneEmail(createAuthDto.email);
        if (!foundEmail)
            throw new common_1.UnauthorizedException('Incorrect email or password');
        const isPasswordValid = await bcrypt.compare(createAuthDto.password, foundEmail.password);
        if (!isPasswordValid)
            throw new common_1.UnauthorizedException('Incorrect email or password');
        const { password, ...user } = foundEmail;
        const userPayload = {
            sub: foundEmail.id,
            id: foundEmail.id,
            email: foundEmail.email,
        };
        const token = this.jwtService.sign(userPayload);
        return { login: true, user, token };
    }
    async updateUser(id, updateUserDto) {
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }
        try {
            const updatedUser = await this.userService.update(id, updateUserDto);
            const { password, ...withoutPassword } = updatedUser;
            console.log('password', password);
            return withoutPassword;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update user', error.message);
        }
    }
};
exports.AuthService = AuthService;
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "signup", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "sendEmail", null);
__decorate([
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "singin", null);
__decorate([
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], AuthService.prototype, "updateUser", null);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mail_service_1.MailService,
        mail_template_service_1.MailTemplatesService])
], AuthService);
//# sourceMappingURL=auth.service.js.map