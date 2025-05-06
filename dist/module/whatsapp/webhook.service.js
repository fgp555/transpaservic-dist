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
exports.WebhookService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const whatsapp_messages_entity_1 = require("./entities/whatsapp-messages.entity");
const whatsapp_users_entity_1 = require("./entities/whatsapp-users.entity");
let WebhookService = class WebhookService {
    constructor(messageRepository, userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }
    async saveOrUpdateMessage(data) {
        const existing = await this.messageRepository.findOneBy({
            messages_id: data.messages_id,
        });
        const whatsappId = data.contacts_wa_id;
        let message = null;
        if (whatsappId) {
            const existingMessage = await this.userRepository.findOneBy({
                WHATSAPP_ID: whatsappId,
            });
            const updateMessage = {
                WHATSAPP_ID: whatsappId,
                contacts_name: data.contacts_name,
                statuses_status: data.statuses_status,
            };
            if (existingMessage) {
                this.userRepository.merge(existingMessage, updateMessage);
                message = await this.userRepository.save(existingMessage);
            }
            else {
                message = await this.userRepository.save(this.userRepository.create(updateMessage));
            }
        }
        if (existing) {
            this.messageRepository.merge(existing, data);
            existing.whatsappMessage = message ?? existing.whatsappMessage;
            await this.messageRepository.save(existing);
        }
        else {
            const historyToSave = this.messageRepository.create({
                ...data,
                whatsappMessage: message ?? null,
            });
            await this.messageRepository.save(historyToSave);
        }
    }
    async updateStatusByMessageId(messageId, data) {
        const existing = await this.messageRepository.findOneBy({
            messages_id: messageId,
        });
        const whatsappId = data.statuses_recipient_id;
        let message = null;
        if (whatsappId) {
            const existingMessage = await this.userRepository.findOneBy({
                WHATSAPP_ID: whatsappId,
            });
            const updateMessage = {
                WHATSAPP_ID: whatsappId,
                statuses_status: data.statuses_status,
            };
            if (existingMessage) {
                this.userRepository.merge(existingMessage, updateMessage);
                message = await this.userRepository.save(existingMessage);
            }
            else {
                message = await this.userRepository.save(this.userRepository.create(updateMessage));
            }
        }
        if (existing) {
            this.messageRepository.merge(existing, data);
            existing.whatsappMessage = message ?? existing.whatsappMessage;
            await this.messageRepository.save(existing);
        }
        else {
            const historyToSave = this.messageRepository.create({
                ...data,
                whatsappMessage: message ?? null,
            });
            await this.messageRepository.save(historyToSave);
        }
    }
    async saveMessage(data) {
        const message = this.messageRepository.create(data);
        return this.messageRepository.save(message);
    }
    async upsertWhatsappUser(whatsappId, contactName, status) {
        let user = await this.userRepository.findOne({
            where: { WHATSAPP_ID: whatsappId },
        });
        if (user) {
            user.contacts_name = contactName ?? user.contacts_name;
            user.statuses_status = status ?? user.statuses_status;
        }
        else {
            user = this.userRepository.create({
                WHATSAPP_ID: whatsappId,
                contacts_name: contactName,
                statuses_status: status,
            });
        }
        return this.userRepository.save(user);
    }
};
exports.WebhookService = WebhookService;
exports.WebhookService = WebhookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(whatsapp_messages_entity_1.WhatsappMessagesEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(whatsapp_users_entity_1.WhatsappUsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], WebhookService);
//# sourceMappingURL=webhook.service.js.map