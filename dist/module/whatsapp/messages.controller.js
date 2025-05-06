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
exports.WaMessagesController = void 0;
const common_1 = require("@nestjs/common");
const messages_service_1 = require("./messages.service");
const send_message_dto_1 = require("./dtos/send-message.dto");
let WaMessagesController = class WaMessagesController {
    constructor(messagesService) {
        this.messagesService = messagesService;
    }
    async findAll() {
        return this.messagesService.findAll();
    }
    async findOne(id) {
        const message = await this.messagesService.findOne(id);
        if (!message)
            throw new common_1.NotFoundException('Message not found');
        return message;
    }
    async findByPhone(phone) {
        return this.messagesService.findByPhone(phone);
    }
    async sendMessage(dto) {
        return this.messagesService.sendMessageFrontend(dto);
    }
    sendPayload(payload) {
        return this.messagesService.sendPayload(payload);
    }
};
exports.WaMessagesController = WaMessagesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WaMessagesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], WaMessagesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('chat/:phone'),
    __param(0, (0, common_1.Param)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WaMessagesController.prototype, "findByPhone", null);
__decorate([
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [send_message_dto_1.SendMessageDto]),
    __metadata("design:returntype", Promise)
], WaMessagesController.prototype, "sendMessage", null);
__decorate([
    (0, common_1.Post)('sendPayload'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WaMessagesController.prototype, "sendPayload", null);
exports.WaMessagesController = WaMessagesController = __decorate([
    (0, common_1.Controller)('whatsapp/messages'),
    __metadata("design:paramtypes", [messages_service_1.WaMessagesService])
], WaMessagesController);
//# sourceMappingURL=messages.controller.js.map