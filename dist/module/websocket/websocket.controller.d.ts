import { WSService } from './websocket.service';
export declare class WSController {
    private readonly wsService;
    constructor(wsService: WSService);
    webSocketTest(operatorId: string, message: string): void;
}
