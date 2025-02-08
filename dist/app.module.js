"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./module/auth/auth.module");
const db_module_1 = require("./tools/db/db.module");
const db_module_2 = require("./config/db.module");
const file_module_1 = require("./module/file/file.module");
const mail_module_1 = require("./module/mail/mail.module");
const common_1 = require("@nestjs/common");
const operator_module_1 = require("./module/operator/operator.module");
const order_module_1 = require("./module/order/order.module");
const schedule_1 = require("@nestjs/schedule");
const user_module_1 = require("./module/user/user.module");
const wablas_module_1 = require("./module/wablas/wablas.module");
const setting_module_1 = require("./module/setting/setting.module");
const modules = [
    schedule_1.ScheduleModule.forRoot(),
    db_module_2.DbConfigModule,
    user_module_1.UserModule,
    auth_module_1.AuthModule,
    order_module_1.OrderModule,
    operator_module_1.OperatorModule,
    wablas_module_1.WablasModule,
    mail_module_1.MailModule,
    file_module_1.FileModule,
    setting_module_1.SettingModule,
    db_module_1.DbModule,
];
if (process.env.USE_SEEDER === 'true' && process.env.DROPSCHEMA === 'true') {
    const { SeederModule } = require('./seed/seeder.module');
    modules.push(SeederModule);
    const { InfoModule } = require('./tools/info/info.module');
    modules.push(InfoModule);
}
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: modules,
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map