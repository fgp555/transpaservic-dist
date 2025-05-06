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
exports.OrderSave2Controller = void 0;
const common_1 = require("@nestjs/common");
const create_order_dto_1 = require("./dto/create-order.dto");
const roles_decorator_1 = require("../../utils/roles/decorator/roles.decorator");
const roles_enum_1 = require("../../utils/roles/enum/roles.enum");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../../utils/roles/roles.guard");
const order_save2_service_1 = require("./order-save2.service");
let OrderSave2Controller = class OrderSave2Controller {
    constructor(orderSave2Service) {
        this.orderSave2Service = orderSave2Service;
    }
    create(createOrderDto) {
        return this.orderSave2Service.create(createOrderDto);
    }
    async saveArrayData(data, sendToWhatsApp) {
        if (!Array.isArray(data) || data.length === 0) {
            throw new common_1.HttpException('El dato proporcionado debe ser un array no vacío', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.orderSave2Service.saveArrayData(data, sendToWhatsApp);
    }
};
exports.OrderSave2Controller = OrderSave2Controller;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrderSave2Controller.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin, roles_enum_1.RolesEnum.Collaborator),
    (0, common_1.Post)('saveArrayData'),
    __param(0, (0, common_1.Body)('data')),
    __param(1, (0, common_1.Body)('sendToWhatsApp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Boolean]),
    __metadata("design:returntype", Promise)
], OrderSave2Controller.prototype, "saveArrayData", null);
exports.OrderSave2Controller = OrderSave2Controller = __decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin, roles_enum_1.RolesEnum.Collaborator),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('order/v2'),
    __metadata("design:paramtypes", [order_save2_service_1.OrderSave2Service])
], OrderSave2Controller);
//# sourceMappingURL=order-save2.controller.js.map