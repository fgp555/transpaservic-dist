"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeederModule = void 0;
const mail_seeder_1 = require("../module/mail/seed/mail.seeder");
const mail_service_1 = require("../module/mail/mail.service");
const mail_template_entity_1 = require("../module/mail/entities/mail-template.entity");
const mail_template_service_1 = require("../module/mail/mail-template.service");
const common_1 = require("@nestjs/common");
const operator_entity_1 = require("../module/operator/entities/operator.entity");
const operator_seeder_1 = require("../module/operator/seed/operator.seeder");
const order_entity_1 = require("../module/order/entities/order.entity");
const order_seeder_1 = require("../module/order/seed/order.seeder");
const seeder_controller_1 = require("./seeder.controller");
const setting_entity_1 = require("../module/setting/entities/setting.entity");
const setting_seed_1 = require("../module/setting/seed/setting.seed");
const setting_service_1 = require("../module/setting/setting.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../module/user/entities/user.entity");
const user_service_1 = require("../module/user/user.service");
const wabla_entity_1 = require("../module/wablas/entities/wabla.entity");
const wablas_seeder_1 = require("../module/wablas/seed/wablas.seeder");
const wablas_service_1 = require("../module/wablas/wablas.service");
const seeder_service_1 = require("./seeder.service");
const user_seeder_1 = require("../module/user/seed/user.seeder");
const operator_sql_1 = require("./query/operator.sql");
const users_sql_1 = require("./query/users.sql");
const order_history_entity_1 = require("../module/order/entities/order-history.entity");
let SeederModule = class SeederModule {
};
exports.SeederModule = SeederModule;
exports.SeederModule = SeederModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                operator_entity_1.OperatorEntity,
                user_entity_1.UserEntity,
                order_entity_1.OrderEntity,
                wabla_entity_1.WablaEntity,
                setting_entity_1.SettingEntity,
                mail_template_entity_1.MailTemplate,
                order_history_entity_1.OrderHistoryEntity,
            ]),
        ],
        providers: [
            operator_seeder_1.OperatorSeederService,
            user_seeder_1.UserSeederService,
            user_service_1.UserService,
            order_seeder_1.OrderSeederService,
            wablas_service_1.WablasService,
            wablas_seeder_1.WablasSeeder,
            setting_service_1.SettingsService,
            setting_seed_1.SettingSeed,
            mail_seeder_1.MailSeederService,
            mail_service_1.MailService,
            mail_template_service_1.MailTemplatesService,
            operator_sql_1.OperatorSeederServiceSQL,
            users_sql_1.UsersSeederServiceSQL,
            seeder_service_1.SeederService,
        ],
        controllers: [seeder_controller_1.SeederController],
    })
], SeederModule);
//# sourceMappingURL=seeder.module.js.map