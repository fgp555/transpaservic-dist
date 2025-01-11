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
const mail_template_service_1 = require("../mail/mail-template.service");
let AuthController = class AuthController {
    constructor(userService, jwtService, emailTemplatesService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.emailTemplatesService = emailTemplatesService;
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
            throw new common_1.InternalServerErrorException('Failed to create user', error.message);
        }
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
    async updateUser(id, body) {
        if (body.password) {
            body.password = await bcrypt.hash(body.password, 10);
        }
        try {
            const updatedUser = await this.userService.update(id, body);
            const { password, ...withoutPassword } = updatedUser;
            return withoutPassword;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to update user', error.message);
        }
    }
};
exports.AuthController = AuthController;
__decorate([
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
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mail_template_service_1.MailTemplatesService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map