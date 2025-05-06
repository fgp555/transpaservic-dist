import { WSGateway } from './websocket.gateway';
import { BroadcastMessageDto } from './dtos/websocket.dto';
export declare class WSService {
    private readonly wsGateway;
    constructor(wsGateway: WSGateway);
    sendNotificationService(operatorId: string, message: string): Promise<{
        message: string;
    }>;
    getConnectedClientsAndRooms(): {
        operatorsGroup: {
            [k: string]: string[];
        };
        anonymousGroup: string[];
        socketIORooms: {};
    };
    getSocketIdsByOperatorId(operatorId: string): string[];
    broadcastToAll(body: BroadcastMessageDto): {
        message: string;
    };
}
