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
exports.WSService = void 0;
const common_1 = require("@nestjs/common");
const websocket_gateway_1 = require("./websocket.gateway");
let WSService = class WSService {
    constructor(wsGateway) {
        this.wsGateway = wsGateway;
    }
    async sendNotificationService(operatorId, message) {
        this.wsGateway.sendNotificationGateway(operatorId, message);
        return { message: 'Orden creada exitosamente' };
    }
    getConnectedClientsAndRooms() {
        return this.wsGateway.getConnectedClientsAndRooms();
    }
    getSocketIdsByOperatorId(operatorId) {
        return this.wsGateway.getSocketIdsByOperatorId(operatorId);
    }
    broadcastToAll(body) {
        this.wsGateway.broadcastToAll(body);
        return { message: 'Mensaje enviado a todos los operadores conectados' };
    }
};
exports.WSService = WSService;
exports.WSService = WSService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [websocket_gateway_1.WSGateway])
], WSService);
//# sourceMappingURL=websocket.service.js.map