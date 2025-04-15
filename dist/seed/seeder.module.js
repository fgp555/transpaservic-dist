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
exports.SeederModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("../module/order/entities/order.entity");
const order_seeder_1 = require("../module/order/seed/order.seeder");
const operator_entity_1 = require("../module/operator/entities/operator.entity");
const operator_seeder_1 = require("../module/operator/seed/operator.seeder");
const user_entity_1 = require("../module/user/entities/user.entity");
const user_seeder_1 = require("../module/user/seed/user.seeder");
const user_service_1 = require("../module/user/user.service");
const wabla_entity_1 = require("../module/wablas/entities/wabla.entity");
const wablas_seeder_1 = require("../module/wablas/seed/wablas.seeder");
const wablas_service_1 = require("../module/wablas/wablas.service");
const setting_seed_1 = require("../module/setting/seed/setting.seed");
const setting_entity_1 = require("../module/setting/entities/setting.entity");
const setting_service_1 = require("../module/setting/setting.service");
const mail_template_service_1 = require("../module/mail/mail-template.service");
const mail_seeder_1 = require("../module/mail/seed/mail.seeder");
const mail_service_1 = require("../module/mail/mail.service");
const mail_template_entity_1 = require("../module/mail/entities/mail-template.entity");
let SeederModule = class SeederModule {
    constructor(operatorSeederService, userSeederService, mailSeederService, orderSeederService, wablasSeeder, settingSeed) {
        this.operatorSeederService = operatorSeederService;
        this.userSeederService = userSeederService;
        this.mailSeederService = mailSeederService;
        this.orderSeederService = orderSeederService;
        this.wablasSeeder = wablasSeeder;
        this.settingSeed = settingSeed;
        this.seed();
    }
    async seed() {
        await this.operatorSeederService.seed();
        await this.userSeederService.seed();
        await this.mailSeederService.seed();
        await this.orderSeederService.seed();
        await this.wablasSeeder.seed();
        await this.settingSeed.seed();
    }
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
        ],
    }),
    __metadata("design:paramtypes", [operator_seeder_1.OperatorSeederService,
        user_seeder_1.UserSeederService,
        mail_seeder_1.MailSeederService,
        order_seeder_1.OrderSeederService,
        wablas_seeder_1.WablasSeeder,
        setting_seed_1.SettingSeed])
], SeederModule);
//# sourceMappingURL=seeder.module.js.map