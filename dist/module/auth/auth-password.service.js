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
exports.AuthPasswordService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const mail_service_1 = require("../mail/mail.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const roles_enum_1 = require("../../utils/roles/enum/roles.enum");
let AuthPasswordService = class AuthPasswordService {
    constructor(userRepository, mailService, jwtService, userService) {
        this.userRepository = userRepository;
        this.mailService = mailService;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    decodeToken(token) {
        try {
            return this.jwtService.decode(token);
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Token inválido');
        }
    }
    async refreshAccessToken(token) {
        try {
            const decoded = this.jwtService.verify(token);
            const foundUser = await this.userService.findOneEmail(decoded.email);
            if (!foundUser) {
                throw new common_1.NotFoundException('Usuario no encontrado');
            }
            const userRoles = foundUser.role === 'superadmin'
                ? [roles_enum_1.RolesEnum.SuperAdmin]
                : foundUser.role === 'admin'
                    ? [roles_enum_1.RolesEnum.Admin]
                    : foundUser.role === 'collaborator'
                        ? [roles_enum_1.RolesEnum.Collaborator]
                        : [roles_enum_1.RolesEnum.User];
            const userPayload = {
                sub: foundUser.id,
                userId: foundUser.id,
                email: foundUser.email,
                roles: userRoles,
            };
            const newAccessToken = this.jwtService.sign(userPayload);
            if (decoded.exp) {
                const expirationDate = new Date(decoded.exp * 1000).toLocaleString();
                const currentDate = new Date().toLocaleString();
                return { ...decoded, expirationDate, currentDate, newAccessToken };
            }
            return { newAccessToken };
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Refresh token expirado o inválido');
        }
    }
    async forgotPassword(email, domain) {
        try {
            const userExists = await this.userRepository.findOne({
                where: { email: email },
            });
            if (!userExists)
                throw new common_1.BadRequestException('El email no se encuentra registrado');
            function encryptToHex(text, key) {
                let encryptedHex = '';
                for (let i = 0; i < text.length; i++) {
                    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
                    encryptedHex += charCode.toString(16).padStart(2, '0');
                }
                return encryptedHex;
            }
            const encryptedHexMessage = encryptToHex(email, process.env.JWT_SECRET);
            const resetLink = `${domain}/password/restore/${encryptedHexMessage}`;
            const company = 'TranspaServic';
            const textContent = `Hola ${userExists.firstName},\n\nPuedes restablecer tu contraseña utilizando el siguiente enlace:\n\n${resetLink}\n\nSi no solicitaste un restablecimiento de contraseña, ignora este correo.\n\nSaludos cordiales,\nEquipo de ${company}`;
            const htmlContent = `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
          <img src="https://i.postimg.cc/Zn1WqNzG/Transpa-Servic-Logo.webp" alt="${company}" style="max-width: 400px; margin-top: 20px;">

          <h2>Solicitud de Restablecimiento de Contraseña</h2>
          <p>Hola ${userExists.firstName},</p>
          <p>Puedes restablecer tu contraseña utilizando el siguiente enlace:</p>

          <a href="${resetLink}"
          style="font-family: 'Futura', sans-serif; background-color: #bb0000; color: white; font-weight: bold; padding: 0.5rem 1rem; border-radius: 8px; width: 100%; outline: none; box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0); cursor: pointer; max-width: 20em; text-decoration: none; font-size: 1em; text-align: center; display: inline-block;"
          onmouseover="this.style.backgroundColor='#1e2a44'"
          onmouseout="this.style.backgroundColor='#bb0000'"
          onfocus="this.style.boxShadow='0 0 0 0.2rem rgba(43, 65, 104, 0.5)'"
          onblur="this.style.boxShadow='0 0 0 0.2rem rgba(255, 255, 255, 0)'"
          >
          Restablecer Contrase&ntilde;a
          </a>

          <p>Si no solicitaste un restablecimiento de contrase&ntilde;a, ignora este correo.</p>
          <p>Saludos cordiales,<br>Equipo de ${company}</p>
        </div>
      `;
            await this.mailService.sendMail2(`Equipo ${company} <${process.env.MAIL_USER}>`, email, `${company} - Restablecimiento de Contraseña`, textContent, htmlContent);
            return {
                message: '¡El enlace para restablecer la contraseña ha sido enviado a tu correo electrónico!',
            };
        }
        catch (error) {
            console.log('Error en forgotPassword: ', error);
            throw new common_1.BadRequestException(error.message);
        }
    }
    async restorePassword(emailEncrypt, newPassword) {
        function decryptFromHex(encryptedHex, key) {
            let decryptedText = '';
            for (let i = 0; i < encryptedHex.length; i += 2) {
                const hexPair = encryptedHex.slice(i, i + 2);
                const charCode = parseInt(hexPair, 16) ^ key.charCodeAt((i / 2) % key.length);
                decryptedText += String.fromCharCode(charCode);
            }
            return decryptedText;
        }
        if (!process.env.JWT_SECRET) {
            throw new common_1.BadRequestException('JWT_SECRET is not defined in the environment');
        }
        const decryptedMessage = decryptFromHex(emailEncrypt.toString(), process.env.JWT_SECRET);
        const user = await this.userRepository.findOne({
            where: { email: decryptedMessage },
        });
        if (!user)
            throw new common_1.BadRequestException('Invalid token');
        if (!newPassword || newPassword.trim().length === 0) {
            throw new common_1.BadRequestException('La nueva contraseña no puede estar vacía');
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await this.userRepository.save(user);
    }
};
exports.AuthPasswordService = AuthPasswordService;
exports.AuthPasswordService = AuthPasswordService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        mail_service_1.MailService,
        jwt_1.JwtService,
        user_service_1.UserService])
], AuthPasswordService);
//# sourceMappingURL=auth-password.service.js.map