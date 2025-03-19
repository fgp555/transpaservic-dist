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
exports.WSGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let WSGateway = class WSGateway {
    constructor() {
        this.clients = new Map();
    }
    handleConnection(client) {
        const operatorId = client.handshake.query.operatorId;
        if (operatorId) {
            this.clients.set(operatorId, client.id);
            client.join(operatorId);
        }
        console.log({ operatorId, message: 'connect' });
    }
    handleDisconnect(client) {
        const operatorId = [...this.clients.entries()].find(([, socketId]) => socketId === client.id)?.[0];
        if (operatorId) {
            this.clients.delete(operatorId);
        }
        console.log({ operatorId, message: 'disconnect' });
    }
    sendNotificationGateway(operatorId, message) {
        this.server.to(operatorId).emit('orderNotification', message);
        console.log({ operatorId, message });
    }
};
exports.WSGateway = WSGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WSGateway.prototype, "server", void 0);
exports.WSGateway = WSGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], WSGateway);
//# sourceMappingURL=websocket.gateway.js.map