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
exports.WaMessagesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const message_entity_1 = require("./entities/message.entity");
const typeorm_2 = require("typeorm");
const contacts_service_1 = require("./contacts.service");
let WaMessagesService = class WaMessagesService {
    constructor(messageRepository, conversationsService) {
        this.messageRepository = messageRepository;
        this.conversationsService = conversationsService;
        this.apiBaseUrl = process.env.WHATSAPP_API_BASE_URL;
        this.token = process.env.WHATSAPP_TOKEN;
        this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
        this.apiUrl = `${this.apiBaseUrl}/${this.phoneNumberId}/messages`;
    }
    async sendPayload(payload) {
        const timestamp = Date.now();
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error de envío: ${response.status} - ${errorText}`);
            throw new common_1.InternalServerErrorException(`Error de envío: ${response.status} - ${errorText}`);
        }
        const responseBody = await response.json();
        const whatsappMessageId = responseBody?.messages?.[0]?.id;
        const saved = await this.messageRepository.save({
            userName: payload.userName || 'Plantilla API WhatsApp',
            userEmail: payload.userEmail || 'sin correo',
            to: payload.to,
            content: payload.content || payload.text?.body,
            type: payload.type,
            templateName: payload.template?.name,
            timestamp,
            status: message_entity_1.MessageStatusEnum.PENDING,
            whatsappMessageId,
        });
        await this.conversationsService.updateOrCreate({
            userName: payload.userName,
            contactPhone: payload.to,
            lastMessageContent: payload.content,
            lastMessageTimestamp: Date.now(),
            lastMessageStatus: message_entity_1.MessageStatusEnum.SENT,
        });
        return saved;
    }
    async sendMessageFrontend(payloadDto) {
        const timestamp = Date.now();
        console.log('payloadDto', payloadDto);
        const payload = {
            messaging_product: 'whatsapp',
            to: payloadDto.to,
            type: 'text',
            text: { body: payloadDto.content },
        };
        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${this.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error de envío: ${response.status} - ${errorText}`);
            throw new common_1.InternalServerErrorException(`Error de envío: ${response.status} - ${errorText}`);
        }
        const responseBody = await response.json();
        const whatsappMessageId = responseBody?.messages?.[0]?.id;
        const saved = await this.messageRepository.save({
            userName: payloadDto.userName,
            userEmail: payloadDto.userEmail,
            to: payloadDto.to,
            content: payloadDto.content,
            timestamp,
            status: message_entity_1.MessageStatusEnum.PENDING,
            whatsappMessageId,
        });
        await this.conversationsService.updateOrCreate({
            userName: payloadDto.userName,
            contactPhone: payloadDto.to,
            lastMessageContent: payloadDto.content,
            lastMessageTimestamp: Date.now(),
            lastMessageStatus: message_entity_1.MessageStatusEnum.SENT,
        });
        return saved;
    }
    findAll() {
        return this.messageRepository.find({ order: { timestamp: 'DESC' } });
    }
    async findOne(id) {
        const message = await this.messageRepository
            .createQueryBuilder('message')
            .addSelect('message.payload')
            .where('message.id = :id', { id })
            .getOne();
        if (message?.payload) {
            try {
                message.payload = JSON.parse(message.payload);
            }
            catch (e) {
                console.warn('Payload JSON inválido', e);
            }
        }
        return message;
    }
    findByPhone(phone) {
        return this.messageRepository.find({
            where: [{ from: phone }, { to: phone }],
            order: { timestamp: 'DESC' },
            take: 10,
        });
    }
};
exports.WaMessagesService = WaMessagesService;
exports.WaMessagesService = WaMessagesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.WaMessageEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        contacts_service_1.WaContactsService])
], WaMessagesService);
//# sourceMappingURL=messages.service.js.map