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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mail_template_service_1 = require("../mail/mail-template.service");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const roles_enum_1 = require("../../utils/roles/enum/roles.enum");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(mailTemplatesService, userService, jwtService) {
        this.mailTemplatesService = mailTemplatesService;
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async signin(SigninDto) {
        const foundEmail = await this.userService.findOneEmail(SigninDto.email);
        if (!foundEmail) {
            throw new common_1.UnauthorizedException('Correo electrónico o contraseña incorrectos');
        }
        const isPasswordValid = await bcrypt.compare(SigninDto.password, foundEmail.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Correo electrónico o contraseña incorrectos');
        }
        const { password, ...user } = foundEmail;
        const userRoles = foundEmail.role === 'superadmin'
            ? [roles_enum_1.RolesEnum.SuperAdmin]
            : foundEmail.role === 'admin'
                ? [roles_enum_1.RolesEnum.Admin]
                : foundEmail.role === 'collaborator'
                    ? [roles_enum_1.RolesEnum.Collaborator]
                    : [roles_enum_1.RolesEnum.User];
        const userPayload = {
            sub: foundEmail.id,
            userId: foundEmail.id,
            email: foundEmail.email,
            roles: userRoles,
        };
        const token = this.jwtService.sign(userPayload);
        return { login: true, user, token };
    }
    async signup(body, filePath) {
        const isString = typeof body.sendMail === 'string';
        if (isString) {
            body.sendMail = body.sendMail === 'true' ? true : false;
            body.operator = body.operator && JSON.parse(body.operator);
        }
        const existingUser = await this.userService.findOneEmail(body.email);
        if (existingUser)
            throw new common_1.BadRequestException('El email ya existe');
        const passwordInitial = body.password;
        if (body.password) {
            body.password = await bcrypt.hash(body.password, 10);
        }
        const user = await this.userService.create({
            ...body,
            image: filePath || null,
        });
        if (body.sendMail && body.email) {
            const sendMail = await this.mailTemplatesService.sentMailRegister({
                ...body,
                password: passwordInitial,
            });
            const { password, ...userWithoutPassword } = user;
            return {
                message: user.image
                    ? `Imagen cargado exitosamente`
                    : 'Usuario creado sin imagen',
                user: userWithoutPassword,
                sendMail,
            };
        }
        const { password, ...userWithoutPassword } = user;
        return {
            message: user.image
                ? `Imagen cargado exitosamente`
                : 'Usuario creado sin imagen',
            user: userWithoutPassword,
        };
    }
    async update(userId, body, filePath, currentUser) {
        const allowedRoles = [roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin];
        const userRoles = Array.isArray(currentUser.roles) ? currentUser.roles : [];
        const hasAccess = currentUser.userId === userId ||
            userRoles.some((role) => allowedRoles.includes(role));
        if (!hasAccess) {
            throw new common_1.ForbiddenException('No tienes permisos para modificar este usuario');
        }
        if (typeof body.operator === 'string') {
            body.operator = JSON.parse(body.operator);
        }
        if (body.password) {
            body.password = await bcrypt.hash(body.password, 10);
        }
        const { wabla, ...rest } = body;
        const updateData = { ...rest };
        if (filePath) {
            updateData.image = filePath;
        }
        else {
            delete updateData.image;
        }
        const updatedUser = await this.userService.update(userId, updateData);
        const { password, ...withoutPassword } = updatedUser;
        return withoutPassword;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mail_template_service_1.MailTemplatesService,
        user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map