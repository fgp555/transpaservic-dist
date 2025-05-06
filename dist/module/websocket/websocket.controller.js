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
exports.WSController = void 0;
const common_1 = require("@nestjs/common");
const websocket_service_1 = require("./websocket.service");
const websocket_dto_1 = require("./dtos/websocket.dto");
let WSController = class WSController {
    constructor(wsService) {
        this.wsService = wsService;
    }
    webSocketTest(operatorId, message) {
        this.wsService.sendNotificationService(operatorId, message);
    }
    getConnectedClientsAndRooms() {
        return this.wsService.getConnectedClientsAndRooms();
    }
    getSocketIdsByOperatorId(operatorId) {
        return this.wsService.getSocketIdsByOperatorId(operatorId);
    }
    broadcastToAll(body) {
        return this.wsService.broadcastToAll(body);
    }
};
exports.WSController = WSController;
__decorate([
    (0, common_1.Post)('test'),
    __param(0, (0, common_1.Body)('operatorId')),
    __param(1, (0, common_1.Body)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], WSController.prototype, "webSocketTest", null);
__decorate([
    (0, common_1.Get)('getConnectedClientsAndRooms'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], WSController.prototype, "getConnectedClientsAndRooms", null);
__decorate([
    (0, common_1.Get)('getSocketIdsByOperatorId/:operatorId'),
    __param(0, (0, common_1.Param)('operatorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WSController.prototype, "getSocketIdsByOperatorId", null);
__decorate([
    (0, common_1.Post)('broadcastToAll'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [websocket_dto_1.BroadcastMessageDto]),
    __metadata("design:returntype", void 0)
], WSController.prototype, "broadcastToAll", null);
exports.WSController = WSController = __decorate([
    (0, common_1.Controller)('websocket'),
    __metadata("design:paramtypes", [websocket_service_1.WSService])
], WSController);
//# sourceMappingURL=websocket.controller.js.map