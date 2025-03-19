import { WSGateway } from './websocket.gateway';
export declare class WSService {
    private readonly wsGateway;
    constructor(wsGateway: WSGateway);
    sendNotificationService(operatorId: string, message: string): Promise<{
        message: string;
    }>;
}
