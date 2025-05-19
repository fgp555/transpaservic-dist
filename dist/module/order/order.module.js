"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const order_controller_1 = require("./order.controller");
const typeorm_1 = require("@nestjs/typeorm");
const order_seeder_1 = require("./seed/order.seeder");
const order_entity_1 = require("./entities/order.entity");
const file_module_1 = require("../file/file.module");
const operator_entity_1 = require("../operator/entities/operator.entity");
const wablas_service_1 = require("../wablas/wablas.service");
const wabla_entity_1 = require("../wablas/entities/wabla.entity");
const back_ticket_entity_1 = require("./entities/back-ticket.entity");
const order_history_entity_1 = require("./entities/order-history.entity");
const setting_entity_1 = require("../setting/entities/setting.entity");
const setting_service_1 = require("../setting/setting.service");
const notification_service_1 = require("../notification/notification.service");
const notification_entity_1 = require("../notification/entities/notification.entity");
const device_entity_1 = require("../device/entities/device.entity");
const order_save_service_1 = require("./order-save.service");
const websocket_gateway_1 = require("../websocket/websocket.gateway");
const get_order_controller_1 = require("./get-order.controller");
const get_order_service_1 = require("./get-order.service");
const order_save2_service_1 = require("./order-save2.service");
const order_save2_controller_1 = require("./order-save2.controller");
const template_service_1 = require("../whatsapp/template.service");
const messages_service_1 = require("../whatsapp/messages.service");
const message_entity_1 = require("../whatsapp/entities/message.entity");
const contacts_service_1 = require("../whatsapp/contacts.service");
const whatsapp_module_1 = require("../whatsapp/whatsapp.module");
const contacts_entity_1 = require("../whatsapp/entities/contacts.entity");
const patient_service_1 = require("../patient/patient.service");
const patient_entity_1 = require("../patient/entities/patient.entity");
const travelDates_entity_1 = require("../patient/entities/travelDates.entity");
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            file_module_1.FileModule,
            typeorm_1.TypeOrmModule.forFeature([
                back_ticket_entity_1.BackTicketEntity,
                device_entity_1.DeviceEntity,
                notification_entity_1.NotificationEntity,
                operator_entity_1.OperatorEntity,
                order_entity_1.OrderEntity,
                order_history_entity_1.OrderHistoryEntity,
                setting_entity_1.SettingEntity,
                wabla_entity_1.WablaEntity,
                contacts_entity_1.WaContactsEntity,
                message_entity_1.WaMessageEntity,
                message_entity_1.WaMessageEntity,
                patient_entity_1.PatientEntity,
                travelDates_entity_1.TravelDatesEntity,
            ]),
            whatsapp_module_1.WhatsappModule,
        ],
        controllers: [order_controller_1.OrderController, get_order_controller_1.GetOrderController, order_save2_controller_1.OrderSave2Controller],
        providers: [
            get_order_service_1.GetOrderService,
            notification_service_1.NotificationService,
            order_save2_service_1.OrderSave2Service,
            order_save_service_1.OrderSaveService,
            order_seeder_1.OrderSeederService,
            order_service_1.OrderService,
            setting_service_1.SettingsService,
            wablas_service_1.WablasService,
            contacts_service_1.WaContactsService,
            messages_service_1.WaMessagesService,
            template_service_1.WaTemplateService,
            websocket_gateway_1.WSGateway,
            patient_service_1.PatientService,
        ],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map