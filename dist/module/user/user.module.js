"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const user_entity_1 = require("./entities/user.entity");
const auth_controller_1 = require("../auth/auth.controller");
const mail_module_1 = require("../mail/mail.module");
const auth_password_service_1 = require("../auth/auth-password.service");
const auth_service_1 = require("../auth/auth.service");
const order_history_entity_1 = require("../order/entities/order-history.entity");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, order_history_entity_1.OrderHistoryEntity]),
            mail_module_1.MailModule,
        ],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, auth_controller_1.AuthController, auth_password_service_1.AuthPasswordService, auth_service_1.AuthService],
        exports: [user_service_1.UserService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map