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
exports.WaTemplateController = void 0;
const common_1 = require("@nestjs/common");
const template_service_1 = require("./template.service");
let WaTemplateController = class WaTemplateController {
    constructor(senderService) {
        this.senderService = senderService;
    }
    sendPayload(payload) {
        console.log('payload', payload);
        return this.senderService.sendPayload(payload);
    }
    ordenes_emitidas(body) {
        return this.senderService.ordenes_emitidas(body);
    }
    orden_emitida(body) {
        return this.senderService.orden_emitida(body);
    }
};
exports.WaTemplateController = WaTemplateController;
__decorate([
    (0, common_1.Post)('sendPayload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WaTemplateController.prototype, "sendPayload", null);
__decorate([
    (0, common_1.Post)('ordenes_emitidas'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WaTemplateController.prototype, "ordenes_emitidas", null);
__decorate([
    (0, common_1.Post)('orden_emitida'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WaTemplateController.prototype, "orden_emitida", null);
exports.WaTemplateController = WaTemplateController = __decorate([
    (0, common_1.Controller)('whatsapp/template'),
    __metadata("design:paramtypes", [template_service_1.WaTemplateService])
], WaTemplateController);
//# sourceMappingURL=template.controller.js.map