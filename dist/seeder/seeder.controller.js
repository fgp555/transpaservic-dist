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
exports.SeederController = void 0;
const common_1 = require("@nestjs/common");
const mail_seeder_1 = require("../module/mail/seed/mail.seeder");
const operator_seeder_1 = require("../module/operator/seed/operator.seeder");
const order_seeder_1 = require("../module/order/seed/order.seeder");
const setting_seed_1 = require("../module/setting/seed/setting.seed");
const wablas_seeder_1 = require("../module/wablas/seed/wablas.seeder");
const seeder_service_1 = require("./seeder.service");
const user_seeder_1 = require("../module/user/seed/user.seeder");
const roles_decorator_1 = require("../utils/roles/decorator/roles.decorator");
const roles_enum_1 = require("../utils/roles/enum/roles.enum");
const auth_guard_1 = require("../module/auth/auth.guard");
const roles_guard_1 = require("../utils/roles/roles.guard");
let SeederController = class SeederController {
    constructor(operatorSeederService, userSeederService, mailSeederService, orderSeederService, wablasSeederService, settingSeedService, seederService) {
        this.operatorSeederService = operatorSeederService;
        this.userSeederService = userSeederService;
        this.mailSeederService = mailSeederService;
        this.orderSeederService = orderSeederService;
        this.wablasSeederService = wablasSeederService;
        this.settingSeedService = settingSeedService;
        this.seederService = seederService;
    }
    async allSeeder() {
        return await this.seederService.allSeeder();
    }
    async operatorSeeder() {
        return await this.operatorSeederService.seed();
    }
    async userSeeder() {
        return await this.userSeederService.seed();
    }
    async mailSeeder() {
        return await this.mailSeederService.seed();
    }
    async orderSeeder() {
        return await this.orderSeederService.seed();
    }
    async wablasSeeder() {
        return await this.wablasSeederService.seed();
    }
    async settingSeed() {
        return await this.settingSeedService.seed();
    }
};
exports.SeederController = SeederController;
__decorate([
    (0, common_1.Post)('allSeeder'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeederController.prototype, "allSeeder", null);
__decorate([
    (0, common_1.Post)('operator'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeederController.prototype, "operatorSeeder", null);
__decorate([
    (0, common_1.Post)('user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeederController.prototype, "userSeeder", null);
__decorate([
    (0, common_1.Post)('mail'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeederController.prototype, "mailSeeder", null);
__decorate([
    (0, common_1.Post)('order'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeederController.prototype, "orderSeeder", null);
__decorate([
    (0, common_1.Post)('wablas'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeederController.prototype, "wablasSeeder", null);
__decorate([
    (0, common_1.Post)('setting'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeederController.prototype, "settingSeed", null);
exports.SeederController = SeederController = __decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('seeder'),
    __metadata("design:paramtypes", [operator_seeder_1.OperatorSeederService,
        user_seeder_1.UserSeederService,
        mail_seeder_1.MailSeederService,
        order_seeder_1.OrderSeederService,
        wablas_seeder_1.WablasSeeder,
        setting_seed_1.SettingSeed,
        seeder_service_1.SeederService])
], SeederController);
//# sourceMappingURL=seeder.controller.js.map