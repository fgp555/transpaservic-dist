import { WaTemplateService } from './template.service';
export declare class WaTemplateController {
    private readonly senderService;
    constructor(senderService: WaTemplateService);
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
