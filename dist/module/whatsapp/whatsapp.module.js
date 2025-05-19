"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WhatsappModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contacts_controller_1 = require("./contacts.controller");
const contacts_entity_1 = require("./entities/contacts.entity");
const contacts_service_1 = require("./contacts.service");
const message_entity_1 = require("./entities/message.entity");
const messages_controller_1 = require("./messages.controller");
const messages_service_1 = require("./messages.service");
const template_controller_1 = require("./template.controller");
const template_service_1 = require("./template.service");
const webhook_controller_1 = require("./webhook.controller");
const webhook_service_1 = require("./webhook.service");
const order_entity_1 = require("../order/entities/order.entity");
const sender_service_1 = require("./sender.service");
const sender_controller_1 = require("./sender.controller");
const patient_entity_1 = require("../patient/entities/patient.entity");
const wa_config_controller_1 = require("./wa-config.controller");
let WhatsappModule = class WhatsappModule {
};
exports.WhatsappModule = WhatsappModule;
exports.WhatsappModule = WhatsappModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                message_entity_1.WaMessageEntity,
                contacts_entity_1.WaContactsEntity,
                order_entity_1.OrderEntity,
                patient_entity_1.PatientEntity,
            ]),
        ],
        controllers: [
            webhook_controller_1.WaWebhookController,
            template_controller_1.WaTemplateController,
            messages_controller_1.WaMessagesController,
            contacts_controller_1.WaContactsController,
            sender_controller_1.WaSenderController,
            wa_config_controller_1.WaConfigController,
        ],
        providers: [
            webhook_service_1.WaWebhookService,
            template_service_1.WaTemplateService,
            messages_service_1.WaMessagesService,
            contacts_service_1.WaContactsService,
            sender_service_1.WaSenderService,
        ],
    })
], WhatsappModule);
//# sourceMappingURL=whatsapp.module.js.map