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
exports.WaSenderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("../order/entities/order.entity");
const typeorm_2 = require("typeorm");
const contacts_service_1 = require("./contacts.service");
let WaSenderService = class WaSenderService {
    constructor(orderRepository, contactsService) {
        this.orderRepository = orderRepository;
        this.contactsService = contactsService;
        this.apiBaseUrl = process.env.WHATSAPP_API_BASE_URL;
        this.token = process.env.WHATSAPP_TOKEN;
        this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
        this.apiUrl = `${this.apiBaseUrl}/${this.phoneNumberId}/messages`;
    }
    async processReplyMessage(message, contactName) {
        const from = message.from;
        const payload = message.interactive?.button_reply?.id;
        const ButtonText = message?.button?.text;
        if (message.type === 'button' && ButtonText) {
            if (ButtonText === 'Ver información completa') {
                const viajes = await this.templateOrders(from);
                await this.sendTextMessage(from, viajes);
                return;
            }
            if (ButtonText === 'Confirmar') {
                await this.sendTextMessage(from, 'Gracias por confirmar');
                return;
            }
        }
        if (message.type === 'interactive' && payload) {
            if (payload === 'consultar_tiquetes') {
                const viajes = await this.templateOrders(from);
                await this.sendTextMessage(from, viajes);
                return;
            }
            if (payload === 'hablar_soporte') {
                await this.contactsService.updateOrCreate({
                    contactPhone: from,
                    inSupportChat: true,
                    lastAgentInteraction: Date.now() - 15 * 60 * 1000,
                });
                await this.sendTextMessage(from, 'Conectándote con un agente de soporte. Por favor, espera...');
                return;
            }
        }
        const contact = await this.contactsService.findByContactPhone(from);
        const now = Date.now();
        const lastInteraction = contact?.lastAgentInteraction || 0;
        const minutesSinceLast = (now - lastInteraction) / (1000 * 60);
        const umbral = 20;
        if (contact?.inSupportChat && minutesSinceLast > umbral) {
            console.log('Reactivando bot');
            await this.contactsService.updateOrCreate({
                contactPhone: from,
                inSupportChat: false,
                lastAgentInteraction: null,
            });
            await this.sendSupportTemplate(from);
        }
        else if (contact?.inSupportChat) {
            await this.contactsService.updateOrCreate({
                contactPhone: from,
                inSupportChat: true,
            });
            return;
        }
        if (!contact?.inSupportChat) {
            await this.sendSupportTemplate(from);
        }
    }
    async sendSupportTemplate(from) {
        await this.sendInteractiveMessage(from, {
            body: '👋 ¡Hola! Bienvenido a *Transpasevic*.\n\n¿Deseas consultar tus tiquetes?',
            buttons: [
                {
                    type: 'reply',
                    reply: {
                        id: 'consultar_tiquetes',
                        title: '🧾 Consultar tiquetes',
                    },
                },
            ],
        });
    }
    async sendTextMessage(to, body) {
        const payload = {
            messaging_product: 'whatsapp',
            to,
            type: 'text',
            text: { body },
        };
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
        };
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error al enviar el mensaje:', errorData);
                throw new Error(`Error de envío: ${response.status} - ${JSON.stringify(errorData)}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error al enviar el mensaje:', error);
            throw error;
        }
    }
    async sendInteractiveMessage(to, payload) {
        const bodyPayload = {
            messaging_product: 'whatsapp',
            to,
            type: 'interactive',
            interactive: {
                type: 'button',
                body: {
                    text: payload.body,
                },
                action: {
                    buttons: payload.buttons,
                },
            },
        };
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
        };
        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify(bodyPayload),
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error al enviar el mensaje interactivo:', errorData);
                throw new Error(`Error de envío: ${response.status} - ${JSON.stringify(errorData)}`);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Error al enviar el mensaje interactivo:', error);
            throw error;
        }
    }
    async templateOrders(from) {
        const orders = await this.findOrders(from);
        if (!orders.length) {
            return 'Ud no tiene órdenes pendientes.';
        }
        const newArray = orders.map((item) => {
            return `
  📌 *Número de orden:* ${item.orderNumber}
  🚌 *Operadora:* ${item.operator}
  📍 *Itinerario:* ${item.itinerary}
  🗓️ *Fecha de expiración:* ${new Date(item.expirationDate).toLocaleDateString('es-CO')}`;
        });
        const header = `*🚗 Tiquetes aprobados para ${orders[0].patientName}*\n`;
        const body = newArray.join('\n');
        const footer = `\n\n_TRANSPASERVIC S.A.S_`;
        return `${header}${body}${footer}`;
    }
    async findOrders(userPhone) {
        const orders = await this.orderRepository.find({
            where: {
                userPhone: userPhone,
                status: order_entity_1.OrderStatus.PENDIENTE,
            },
            relations: ['operator'],
            order: {
                expirationDate: 'ASC',
            },
        });
        return orders.map((order) => ({
            ...order,
            operator: order.operator?.name || null,
        }));
    }
};
exports.WaSenderService = WaSenderService;
exports.WaSenderService = WaSenderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        contacts_service_1.WaContactsService])
], WaSenderService);
//# sourceMappingURL=sender.service.js.map