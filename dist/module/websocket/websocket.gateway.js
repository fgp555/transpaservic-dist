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
        this.operatorsGroup = new Map();
        this.anonymousGroup = [];
    }
    handleConnection(clientSocket) {
        const operatorId = clientSocket.handshake.query.operatorId;
        if (operatorId) {
            const existingSocketIds = this.operatorsGroup.get(operatorId) || [];
            existingSocketIds.push(clientSocket.id);
            this.operatorsGroup.set(operatorId, existingSocketIds);
            clientSocket.join(operatorId);
            console.log(`${clientSocket.id} unido a room ${operatorId}`);
        }
        else {
            this.anonymousGroup.push(clientSocket.id);
            clientSocket.join('anonymous');
            console.log(`${clientSocket.id} unido a room anonymous`);
        }
    }
    handleDisconnect(clientSocket) {
        let disconnectedOperatorId;
        for (const [operatorId, socketIds] of this.operatorsGroup.entries()) {
            const index = socketIds.indexOf(clientSocket.id);
            if (index !== -1) {
                socketIds.splice(index, 1);
                disconnectedOperatorId = operatorId;
                if (socketIds.length === 0) {
                    this.operatorsGroup.delete(operatorId);
                }
                else {
                    this.operatorsGroup.set(operatorId, socketIds);
                }
                break;
            }
        }
        if (!disconnectedOperatorId) {
            const index = this.anonymousGroup.indexOf(clientSocket.id);
            if (index !== -1) {
                this.anonymousGroup.splice(index, 1);
                disconnectedOperatorId = 'anonymous';
            }
        }
        console.info(`${clientSocket.id} desconectado`);
    }
    broadcastMessage(client, payload) {
        console.log(`Mensaje recibido del cliente (${client.id}):`, payload);
        client.broadcast.emit('broadcastMessage', `Reenviado: ${payload}`);
    }
    sendNotificationGateway(operatorId, message) {
        this.server.to(operatorId).emit('orderNotification', message);
    }
    getSocketIdsByOperatorId(operatorId) {
        return this.operatorsGroup.get(operatorId);
    }
    getConnectedClientsAndRooms() {
        const socketIORooms = this.server.sockets.adapter.rooms;
        const roomsObject = {};
        socketIORooms.forEach((socketIds, roomId) => {
            roomsObject[roomId] = Array.from(socketIds);
        });
        const operatorsGroup = Object.fromEntries(this.operatorsGroup);
        const anonymousGroup = this.anonymousGroup;
        return { operatorsGroup, anonymousGroup, socketIORooms: roomsObject };
    }
    broadcastToAll(body) {
        for (const operatorId of this.operatorsGroup.keys()) {
            this.server.to(operatorId).emit('broadcastMessage', body);
        }
        if (this.anonymousGroup.length > 0) {
            this.server.to('anonymous').emit('broadcastMessage', body);
        }
        console.info(body);
    }
};
exports.WSGateway = WSGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WSGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('broadcastMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], WSGateway.prototype, "broadcastMessage", null);
exports.WSGateway = WSGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true })
], WSGateway);
//# sourceMappingURL=websocket.gateway.js.map