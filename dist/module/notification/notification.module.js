"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationModule = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("./notification.service");
const notification_controller_1 = require("./notification.controller");
const typeorm_1 = require("@nestjs/typeorm");
const notification_entity_1 = require("./entities/notification.entity");
const order_entity_1 = require("../order/entities/order.entity");
const operator_entity_1 = require("../operator/entities/operator.entity");
const device_entity_1 = require("../device/entities/device.entity");
const websocket_gateway_1 = require("../websocket/websocket.gateway");
let NotificationModule = class NotificationModule {
};
exports.NotificationModule = NotificationModule;
exports.NotificationModule = NotificationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                notification_entity_1.NotificationEntity,
                order_entity_1.OrderEntity,
                operator_entity_1.OperatorEntity,
                device_entity_1.DeviceEntity,
            ]),
        ],
        controllers: [notification_controller_1.NotificationController],
        providers: [notification_service_1.NotificationService, websocket_gateway_1.WSGateway],
    })
], NotificationModule);
//# sourceMappingURL=notification.module.js.map