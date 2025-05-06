import { WSService } from './websocket.service';
import { BroadcastMessageDto } from './dtos/websocket.dto';
export declare class WSController {
    private readonly wsService;
    constructor(wsService: WSService);
    webSocketTest(operatorId: string, message: string): void;
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
