import { WaMessagesService } from './messages.service';
export declare class WaTemplateService {
    private readonly messagesService;
    private apiBaseUrl;
    private token;
    private phoneNumberId;
    private apiUrl;
    constructor(messagesService: WaMessagesService);
    sendPayload(payload: any): Promise<any>;
    ordenes_emitidas(body: any): Promise<{
        userName: any;
        userEmail: any;
        to: any;
        content: any;
        type: any;
        templateName: any;
        timestamp: number;
        status: import("./entities/message.entity").MessageStatusEnum.PENDING;
        whatsappMessageId: any;
    } & import("./entities/message.entity").WaMessageEntity>;
    orden_emitida(body: any): Promise<{
        userName: any;
        userEmail: any;
        to: any;
        content: any;
        type: any;
        templateName: any;
        timestamp: number;
        status: import("./entities/message.entity").MessageStatusEnum.PENDING;
        whatsappMessageId: any;
    } & import("./entities/message.entity").WaMessageEntity>;
}
