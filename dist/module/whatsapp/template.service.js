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
exports.WaTemplateService = void 0;
const common_1 = require("@nestjs/common");
const messages_service_1 = require("./messages.service");
let WaTemplateService = class WaTemplateService {
    constructor(messagesService) {
        this.messagesService = messagesService;
        this.apiBaseUrl = process.env.WHATSAPP_API_BASE_URL;
        this.token = process.env.WHATSAPP_TOKEN;
        this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
        this.apiUrl = `${this.apiBaseUrl}/${this.phoneNumberId}/messages`;
    }
    async sendPayload(payload) {
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
        return await response.json();
    }
    async ordenes_emitidas(body) {
        const payload = {
            messaging_product: 'whatsapp',
            to: body.to,
            type: 'template',
            template: {
                name: process.env.ORDENES_EMITIDAS || 'ordenes_emitidas_1',
                language: {
                    code: 'es',
                },
                components: [
                    {
                        type: 'body',
                        parameters: [
                            {
                                type: 'text',
                                text: body.template.components[0].parameters[0].text,
                            },
                            {
                                type: 'text',
                                text: body.template.components[0].parameters[1].text,
                            },
                            {
                                type: 'text',
                                text: body.template.components[0].parameters[2].text,
                            },
                        ],
                    },
                ],
            },
        };
        return await this.messagesService.sendPayload(payload);
    }
    async orden_emitida(body) {
        const payload = {
            messaging_product: 'whatsapp',
            to: body.to,
            type: 'template',
            template: {
                name: process.env.ORDEN_EMITIDA || 'orden_emitida_2',
                language: {
                    code: 'es',
                },
                components: [
                    {
                        type: 'body',
                        parameters: [
                            {
                                type: 'text',
                                text: body.template.components[0].parameters[0].text,
                            },
                            {
                                type: 'text',
                                text: body.template.components[0].parameters[1].text,
                            },
                            {
                                type: 'text',
                                text: body.template.components[0].parameters[2].text,
                            },
                            {
                                type: 'text',
                                text: body.template.components[0].parameters[3].text,
                            },
                        ],
                    },
                ],
            },
        };
        return await this.messagesService.sendPayload(payload);
    }
};
exports.WaTemplateService = WaTemplateService;
exports.WaTemplateService = WaTemplateService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [messages_service_1.WaMessagesService])
], WaTemplateService);
//# sourceMappingURL=template.service.js.map