import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
export declare class WSGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private clients;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    sendNotificationGateway(operatorId: string, message: string): void;
}
