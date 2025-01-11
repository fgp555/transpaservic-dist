"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./module/user/user.module");
const db_module_1 = require("./config/db.module");
const info_module_1 = require("./tools/info/info.module");
const backup_db_module_1 = require("./tools/db-backup/backup-db.module");
const auth_module_1 = require("./module/auth/auth.module");
const ticket_module_1 = require("./module/ticket/ticket.module");
const transport_module_1 = require("./module/transport/transport.module");
const municipality_module_1 = require("./module/municipality/municipality.module");
const seeder_module_1 = require("./seed/seeder.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            db_module_1.DbConfigModule,
            info_module_1.InfoModule,
            backup_db_module_1.DbBackupModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            ticket_module_1.TicketModule,
            transport_module_1.TransportModule,
            municipality_module_1.MunicipalityModule,
            seeder_module_1.SeederModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map