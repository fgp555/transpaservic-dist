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
exports.SeederService = void 0;
const mail_seeder_1 = require("../module/mail/seed/mail.seeder");
const operator_seeder_1 = require("../module/operator/seed/operator.seeder");
const order_seeder_1 = require("../module/order/seed/order.seeder");
const setting_seed_1 = require("../module/setting/seed/setting.seed");
const wablas_seeder_1 = require("../module/wablas/seed/wablas.seeder");
const common_1 = require("@nestjs/common");
const user_seeder_1 = require("../module/user/seed/user.seeder");
const operator_sql_1 = require("./query/operator.sql");
const users_sql_1 = require("./query/users.sql");
let SeederService = class SeederService {
    constructor(operatorSeederService, userSeederService, mailSeederService, orderSeederService, wablasSeederService, settingSeedService, operatorSeederServiceSQL, userSeederServiceSQL) {
        this.operatorSeederService = operatorSeederService;
        this.userSeederService = userSeederService;
        this.mailSeederService = mailSeederService;
        this.orderSeederService = orderSeederService;
        this.wablasSeederService = wablasSeederService;
        this.settingSeedService = settingSeedService;
        this.operatorSeederServiceSQL = operatorSeederServiceSQL;
        this.userSeederServiceSQL = userSeederServiceSQL;
    }
    async onModuleInit() {
        console.log('process.env.USE_SEEDER', process.env.USE_SEEDER);
        if (process.env.USE_SEEDER === 'true' &&
            process.env.DROPSCHEMA === 'true') {
            try {
                await this.allSeeder();
            }
            catch (error) {
                console.error('Error al ejecutar los seeders al inicializar el módulo:', error);
            }
        }
        else {
            console.log('La aplicación está en producción, los seeders no se ejecutarán automáticamente.');
        }
    }
    async allSeeder() {
        const operador = await this.operatorSeederServiceSQL.seed();
        const user = await this.userSeederServiceSQL.seed();
        const mail = await this.mailSeederService.seed();
        const wablas = await this.wablasSeederService.seed();
        const setting = await this.settingSeedService.seed();
        let order = null;
        if (process.env.NODE_ENV !== 'production') {
            order = await this.orderSeederService.seed();
        }
        return {
            operador,
            user,
            mail,
            order,
            wablas,
            setting,
        };
    }
};
exports.SeederService = SeederService;
exports.SeederService = SeederService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [operator_seeder_1.OperatorSeederService,
        user_seeder_1.UserSeederService,
        mail_seeder_1.MailSeederService,
        order_seeder_1.OrderSeederService,
        wablas_seeder_1.WablasSeeder,
        setting_seed_1.SettingSeed,
        operator_sql_1.OperatorSeederServiceSQL,
        users_sql_1.UsersSeederServiceSQL])
], SeederService);
//# sourceMappingURL=seeder.service.js.map