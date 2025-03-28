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
let OrderModule = class OrderModule {
};
exports.OrderModule = OrderModule;
exports.OrderModule = OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            file_module_1.FileModule,
            typeorm_1.TypeOrmModule.forFeature([
                order_entity_1.OrderEntity,
                operator_entity_1.OperatorEntity,
                wabla_entity_1.WablaEntity,
                back_ticket_entity_1.BackTicketEntity,
                order_history_entity_1.OrderHistoryEntity,
                setting_entity_1.SettingEntity,
                notification_entity_1.NotificationEntity,
                device_entity_1.DeviceEntity,
            ]),
        ],
        controllers: [order_controller_1.OrderController, get_order_controller_1.GetOrderController],
        providers: [
            order_service_1.OrderService,
            order_save_service_1.OrderSaveService,
            order_seeder_1.OrderSeederService,
            wablas_service_1.WablasService,
            setting_service_1.SettingsService,
            notification_service_1.NotificationService,
            websocket_gateway_1.WSGateway,
            get_order_service_1.GetOrderService,
        ],
    })
], OrderModule);
//# sourceMappingURL=order.module.js.map