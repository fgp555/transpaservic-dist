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
exports.WaContactsController = void 0;
const common_1 = require("@nestjs/common");
const contacts_service_1 = require("./contacts.service");
const message_entity_1 = require("./entities/message.entity");
let WaContactsController = class WaContactsController {
    constructor(waContactsService) {
        this.waContactsService = waContactsService;
    }
    findAll(contactPhone, lastMessageStatus, from, to, page = 1, limit = 20) {
        return this.waContactsService.findAll({
            contactPhone,
            lastMessageStatus,
            from,
            to,
            page: +page,
            limit: +limit,
        });
    }
    findByContactPhone(contactPhone) {
        return this.waContactsService.findByContactPhone(contactPhone);
    }
    closeSupport(contactPhone) {
        return this.waContactsService.closeSupport(contactPhone);
    }
};
exports.WaContactsController = WaContactsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('contactPhone')),
    __param(1, (0, common_1.Query)('lastMessageStatus')),
    __param(2, (0, common_1.Query)('from')),
    __param(3, (0, common_1.Query)('to')),
    __param(4, (0, common_1.Query)('page')),
    __param(5, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Object, Object]),
    __metadata("design:returntype", void 0)
], WaContactsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findByContactPhone/:contactPhone'),
    __param(0, (0, common_1.Param)('contactPhone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WaContactsController.prototype, "findByContactPhone", null);
__decorate([
    (0, common_1.Post)('close-support/:contactPhone'),
    __param(0, (0, common_1.Param)('contactPhone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WaContactsController.prototype, "closeSupport", null);
exports.WaContactsController = WaContactsController = __decorate([
    (0, common_1.Controller)('whatsapp/contacts'),
    __metadata("design:paramtypes", [contacts_service_1.WaContactsService])
], WaContactsController);
//# sourceMappingURL=contacts.controller.js.map