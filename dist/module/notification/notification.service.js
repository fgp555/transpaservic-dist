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
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const notification_entity_1 = require("./entities/notification.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const expo_server_sdk_1 = require("expo-server-sdk");
const order_entity_1 = require("../order/entities/order.entity");
const operator_entity_1 = require("../operator/entities/operator.entity");
const device_entity_1 = require("../device/entities/device.entity");
let NotificationService = NotificationService_1 = class NotificationService {
    constructor(notificationRepository, orderRepository, operatorRepository, deviceRepository) {
        this.notificationRepository = notificationRepository;
        this.orderRepository = orderRepository;
        this.operatorRepository = operatorRepository;
        this.deviceRepository = deviceRepository;
        this.expo = new expo_server_sdk_1.default({ useFcmV1: true });
        this.logger = new common_1.Logger(NotificationService_1.name);
    }
    async findAll() {
        return await this.notificationRepository.find();
    }
    async sendPushNotification(toTokens, message, title = 'Transpaservic S.A.S.') {
        if (!toTokens.every(expo_server_sdk_1.default.isExpoPushToken)) {
            throw new common_1.BadRequestException('Invalid Expo push tokens');
        }
        const messages = toTokens.map((token) => ({
            to: token,
            sound: 'default',
            body: message,
            title,
            data: { timestamp: Date.now() },
        }));
        const chunks = this.expo.chunkPushNotifications(messages);
        const tickets = [];
        for (const chunk of chunks) {
            try {
                const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
                tickets.push(...ticketChunk);
            }
            catch (error) {
                this.logger.error('Error sending push notifications', error);
                throw new common_1.InternalServerErrorException('Error sending push notifications');
            }
        }
        this.logger.log(`Sent ${tickets.length} push notifications successfully.`);
        return { success: true, tickets };
    }
    async sendOperatorOrderNotifications(operatorIds) {
        console.log('operatorIds', operatorIds);
        const notifications = [];
        const pushNotifications = [];
        await Promise.all(operatorIds.map(async (operatorId) => {
            const orderCount = await this.orderRepository.count({
                where: {
                    operator: { id: operatorId },
                    status: order_entity_1.OrderStatus.PENDIENTE,
                },
            });
            if (orderCount === 0) {
                console.log(`🔹 Operador ${operatorId} no tiene órdenes pendientes.`);
                return;
            }
            const findOperator = await this.operatorRepository.findOne({
                where: { id: operatorId },
            });
            const operatorName = findOperator ? findOperator.name : 'Operador';
            const message = `${operatorName} tienes ${orderCount} órdenes pendientes.`;
            const devices = await this.deviceRepository
                .createQueryBuilder('device')
                .innerJoinAndSelect('device.user', 'user')
                .where('user.operatorId = :operatorId', { operatorId })
                .getMany();
            const tokens = devices.map((device) => device.expoPushToken);
            if (tokens.length === 0) {
                console.warn(`⚠️ Operador ${operatorId} no tiene dispositivos registrados.`);
                return;
            }
            notifications.push(this.notificationRepository.create({
                operator: { id: operatorId },
                title: 'Órdenes Pendientes',
                message,
                status: notification_entity_1.NotificationStatus.DELIVERED,
            }));
            pushNotifications.push({ tokens, message });
        }));
        if (notifications.length > 0) {
            await this.notificationRepository.save(notifications);
        }
        if (pushNotifications.length > 0) {
            await Promise.all(pushNotifications.map(({ tokens, message }) => this.sendPushNotification(tokens, message)));
        }
        return { success: true };
    }
    async viewOperatorOrderPending(operatorId) {
        const orderCount = await this.orderRepository.count({
            where: { operator: { id: operatorId }, status: order_entity_1.OrderStatus.PENDIENTE },
        });
        return { orderCount };
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(notification_entity_1.NotificationEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(operator_entity_1.OperatorEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(device_entity_1.DeviceEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], NotificationService);
//# sourceMappingURL=notification.service.js.map