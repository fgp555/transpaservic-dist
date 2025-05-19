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
const contacts_service_1 = require("./contacts.service");
const message_entity_1 = require("./entities/message.entity");
const sender_service_1 = require("./sender.service");
const fs = require("fs");
const path = require("path");
const patient_entity_1 = require("../patient/entities/patient.entity");
const dir = path.join(__dirname, './../../../uploads/patient/whatsapp');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}
let WaWebhookService = class WaWebhookService {
    constructor(messageRepository, patientRepository, contactsService, senderService) {
        this.messageRepository = messageRepository;
        this.patientRepository = patientRepository;
        this.contactsService = contactsService;
        this.senderService = senderService;
        this.token = process.env.WHATSAPP_TOKEN;
    }
    async handleIncomingMessage(data) {
        const rawPayload = JSON.stringify(data);
        if (process.env.DEVELOPMENT_MODE === 'true') {
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
                    if (message.type === 'image') {
                        const mediaId = message.image.id;
                        const from = message.from;
                        await this.senderService.sendTextMessage(from, '🛠️ La opción para subir imágenes aún está en desarrollo.');
                        return;
                        const patient = await this.patientRepository.findOne({
                            where: { userPhone: from },
                        });
                        if (patient) {
                            const mediaUrl = await this.getMediaUrl(mediaId);
                            const imageBuffer = await this.downloadMedia(mediaUrl);
                            const fileName = `${mediaId}.jpg`;
                            const filePath = path.join(dir, fileName);
                            await fs.promises.writeFile(filePath, imageBuffer);
                            console.log(`Imagen guardada en: ${filePath}`);
                            await this.senderService.sendTextMessage(from, 'Imagen recibida. ¡Gracias!');
                            patient.idCardImageFront = `uploads/patient/whatsapp/${fileName}`;
                            patient.idCardImageBack = `uploads/patient/whatsapp/${fileName}`;
                            await this.patientRepository.save(patient);
                        }
                        else {
                            console.log('Patient not found');
                            await this.senderService.sendTextMessage(from, '📞 Este número no está registrado.');
                        }
                    }
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
                        const patient = await this.patientRepository.findOne({
                            where: { userPhone: message.from },
                        });
                        if (message.type !== 'image' && patient) {
                            await this.senderService.processReplyMessage(message, contactName);
                        }
                        else {
                            await this.senderService.sendTextMessage(message.from, '📞 Este número no está registrado.');
                        }
                    }
                }
                for (const status of statuses) {
                    const whatsappMessageId = status.id;
                    const newStatus = status.status;
                    const message = await this.messageRepository.findOneBy({
                        whatsappMessageId,
                    });
                    if (!message)
                        continue;
                    const category = status.pricing?.category || null;
                    if (category) {
                        message.category = category;
                    }
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
    async getMediaUrl(mediaId) {
        const url = `${process.env.WHATSAPP_API_BASE_URL}/${mediaId}`;
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
        if (!res.ok) {
            throw new Error('Error al obtener la URL del archivo');
        }
        const data = await res.json();
        return data.url;
    }
    async downloadMedia(url) {
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${this.token}`,
            },
        });
        if (!res.ok) {
            throw new Error('Error al descargar el archivo');
        }
        const arrayBuffer = await res.arrayBuffer();
        return Buffer.from(arrayBuffer);
    }
};
exports.WaWebhookService = WaWebhookService;
exports.WaWebhookService = WaWebhookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(message_entity_1.WaMessageEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(patient_entity_1.PatientEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        contacts_service_1.WaContactsService,
        sender_service_1.WaSenderService])
], WaWebhookService);
//# sourceMappingURL=webhook.service.js.map