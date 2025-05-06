import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BroadcastMessageDto } from './dtos/websocket.dto';
export declare class WSGateway implements OnGatewayConnection, OnGatewayDisconnect {
    server: Server;
    private operatorsGroup;
    private anonymousGroup;
    handleConnection(clientSocket: Socket): void;
    handleDisconnect(clientSocket: Socket): void;
    broadcastMessage(client: Socket, payload: string): void;
    sendNotificationGateway(operatorId: string, message: string): void;
    getSocketIdsByOperatorId(operatorId: string): string[];
    getConnectedClientsAndRooms(): {
        operatorsGroup: {
            [k: string]: string[];
        };
        anonymousGroup: string[];
        socketIORooms: {};
    };
    broadcastToAll(body: BroadcastMessageDto): void;
}
