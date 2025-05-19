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
exports.WaSenderController = void 0;
const common_1 = require("@nestjs/common");
const sender_service_1 = require("./sender.service");
let WaSenderController = class WaSenderController {
    constructor(waSenderService) {
        this.waSenderService = waSenderService;
    }
    async findOrders(userPhone) {
        return await this.waSenderService.findOrders(userPhone);
    }
};
exports.WaSenderController = WaSenderController;
__decorate([
    (0, common_1.Get)('findOrders/:userPhone'),
    __param(0, (0, common_1.Param)('userPhone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WaSenderController.prototype, "findOrders", null);
exports.WaSenderController = WaSenderController = __decorate([
    (0, common_1.Controller)('whatsapp/sender'),
    __metadata("design:paramtypes", [sender_service_1.WaSenderService])
], WaSenderController);
//# sourceMappingURL=sender.controller.js.map