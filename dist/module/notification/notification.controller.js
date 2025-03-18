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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const notification_service_1 = require("./notification.service");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async sendPushNotification(body) {
        try {
            if (!body.to || body.to.length === 0) {
                throw new common_1.BadRequestException('At least one recipient token is required');
            }
            const response = await this.notificationService.sendPushNotification(body.to, body.message || 'Default message', body.title || 'Notification');
            return response;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Failed to send push notification');
        }
    }
    findAll() {
        return this.notificationService.findAll();
    }
    sendOperatorOrderNotifications(operatorIds = [1, 29]) {
        return this.notificationService.sendOperatorOrderNotifications(operatorIds);
    }
    viewOperatorOrderPending(operatorId = 1) {
        return this.notificationService.viewOperatorOrderPending(operatorId);
    }
};
exports.NotificationController = NotificationController;
__decorate([
    (0, common_1.Post)('/sendPushNotification'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "sendPushNotification", null);
__decorate([
    (0, common_1.Get)('findAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('sendOperatorOrderNotifications'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "sendOperatorOrderNotifications", null);
__decorate([
    (0, common_1.Get)('viewOperatorOrderPending'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], NotificationController.prototype, "viewOperatorOrderPending", null);
exports.NotificationController = NotificationController = __decorate([
    (0, common_1.Controller)('notification'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
//# sourceMappingURL=notification.controller.js.map