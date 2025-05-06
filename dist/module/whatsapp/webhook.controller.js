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
exports.WebhookController = void 0;
const common_1 = require("@nestjs/common");
const webhook_service_1 = require("./webhook.service");
let WebhookController = class WebhookController {
    constructor(service) {
        this.service = service;
    }
    async verify(req, res) {
        const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN;
        const mode = req.query['hub.mode'];
        const token = req.query['hub.verify_token'];
        const challenge = req.query['hub.challenge'];
        if (mode && token && mode === 'subscribe' && token === VERIFY_TOKEN) {
            return res.status(common_1.HttpStatus.OK).send(challenge);
        }
        return res.sendStatus(common_1.HttpStatus.FORBIDDEN);
    }
    async receive(req, res, signature) {
        const body = req.body;
        if (process.env.DEVELOPMENT_MODE === 'true') {
            console.log('body=', JSON.stringify(body));
        }
        if (body.object === 'whatsapp_business_account') {
            for (const entry of body.entry) {
                for (const change of entry.changes) {
                    const value = change.value;
                    const contact = value?.contacts?.[0];
                    const message = value?.messages?.[0];
                    const status = value?.statuses?.[0];
                    const whatsappId = contact?.wa_id ?? message?.from ?? status?.recipient_id;
                    const user = await this.service.upsertWhatsappUser(whatsappId, contact?.profile?.name, status?.status);
                    const data = {
                        entry_id: entry.id,
                        contacts_wa_id: whatsappId,
                        contacts_name: contact?.profile?.name,
                        messages_from: message?.from,
                        messages_id: message?.id,
                        messages_timestamp: message?.timestamp,
                        messages_type: message?.type,
                        messages_body: message?.text?.body ??
                            message?.interactive?.button_reply?.title ??
                            message?.reaction?.emoji ??
                            null,
                        reaction_emoji: message?.reaction?.emoji,
                        statuses_id: status?.id,
                        statuses_timestamp: status?.timestamp,
                        statuses_recipient_id: status?.recipient_id,
                        statuses_status: status?.status,
                        expiration_timestamp: value?.conversation?.expiration_timestamp,
                        pricing_billable: value?.pricing?.billable?.toString(),
                        pricing_category: value?.pricing?.category,
                        payload: JSON.stringify(body),
                        whatsappMessage: user,
                    };
                    await this.service.saveMessage(data);
                }
            }
            return res.sendStatus(common_1.HttpStatus.OK);
        }
        return res.sendStatus(common_1.HttpStatus.NOT_FOUND);
    }
};
exports.WebhookController = WebhookController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "verify", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Headers)('x-hub-signature-256')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String]),
    __metadata("design:returntype", Promise)
], WebhookController.prototype, "receive", null);
exports.WebhookController = WebhookController = __decorate([
    (0, common_1.Controller)('whatsapp/webhook'),
    __metadata("design:paramtypes", [webhook_service_1.WebhookService])
], WebhookController);
//# sourceMappingURL=webhook.controller.js.map