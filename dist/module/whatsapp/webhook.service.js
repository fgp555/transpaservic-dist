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
exports.WaWebhookService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const message_entity_1 = require("./entities/message.entity");
const contacts_service_1 = require("./contacts.service");
let WaWebhookService = class WaWebhookService {
    constructor(messageRepository, contactsService) {
        this.messageRepository = messageRepository;
        this.contactsService = contactsService;
    }
    async handleIncomingMessage(data) {
        const rawPayload = JSON.stringify(data);
        if (process.env.DEVELOPMENT_MODE === 'true') {
            console.log('body=', JSON.stringify(data));
        }
        for (const entry of data.entry) {
            for (const change of entry.changes) {
                const messages = change.value.messages || [];
                const statuses = change.value.statuses || [];
                const contacts = change.value.contacts || [];
                const contactName = contacts[0]?.profile?.name || null;
                for (const message of messages) {
                    const exists = await this.messageRepository.findOneBy({
                        whatsappMessageId: message.id,
                    });
                    if (message.type === 'reaction') {
                        if (!exists) {
                            const reaction = this.messageRepository.create({
                                whatsappMessageId: message.id,
                                from: message.from,
                                to: message.to,
                                reactionToMessageId: message.reaction?.message_id || null,
                                reactionEmoji: message.reaction?.emoji || null,
                                timestamp: +message.timestamp * 1000,
                                status: message_entity_1.MessageStatusEnum.INCOMING,
                                payload: rawPayload,
                            });
                            await this.messageRepository.save(reaction);
                        }
                        continue;
                    }
                    if (!exists) {
                        const incoming = this.messageRepository.create({
                            whatsappMessageId: message.id,
                            from: message.from,
                            content: message.text?.body || null,
                            messageType: message.type,
                            messageButtonText: message.button?.text || null,
                            timestamp: +message.timestamp * 1000,
                            status: message_entity_1.MessageStatusEnum.INCOMING,
                            payload: rawPayload,
                        });
                        await this.messageRepository.save(incoming);
                        await this.contactsService.updateOrCreate({
                            contactPhone: message.from,
                            contactName,
                            lastMessageContent: incoming.content || '',
                            lastMessageTimestamp: incoming.timestamp,
                            lastMessageStatus: message_entity_1.MessageStatusEnum.INCOMING,
                            increaseUnread: true,
                        });
                    }
                }
                for (const status of statuses) {
                    const whatsappMessageId = status.id;
                    const newStatus = status.status;
                    const message = await this.messageRepository.findOneBy({
                        whatsappMessageId,
                    });
                    if (message && message.status !== newStatus) {
                        message.status = newStatus;
                        message.payload = rawPayload;
                        await this.messageRepository.save(message);
                        const contactPhone = message.from || message.to;
                        const conversation = await this.contactsService.findByContactPhone(contactPhone);
                        if (conversation) {
                            conversation.lastMessageStatus = newStatus;
                            await this.contactsService.save(conversation);
                        }
                    }
                }
            }
        }
    }
};
exports.WaWebhookService = WaWebhookService;
exports.WaWebhookService = WaWebhookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.WaMessageEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        contacts_service_1.WaContactsService])
], WaWebhookService);
//# sourceMappingURL=webhook.service.js.map