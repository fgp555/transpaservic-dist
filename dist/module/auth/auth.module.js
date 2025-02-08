"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_controller_1 = require("./auth.controller");
const user_service_1 = require("../user/user.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../user/entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
const mail_module_1 = require("../mail/mail.module");
const auth_password_service_1 = require("./auth-password.service");
const file_module_1 = require("../file/file.module");
const auth_service_1 = require("./auth.service");
const auth_password_controller_1 = require("./auth-password.controller");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            file_module_1.FileModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
            jwt_1.JwtModule.register({
                global: true,
                signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '2d' },
                secret: process.env.JWT_SECRET,
            }),
            mail_module_1.MailModule,
        ],
        controllers: [auth_controller_1.AuthController, auth_password_controller_1.AuthPasswordController],
        providers: [user_service_1.UserService, auth_password_service_1.AuthPasswordService, auth_service_1.AuthService],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map