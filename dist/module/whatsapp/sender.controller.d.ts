import { WASenderService } from './sender.service';
export declare class WASenderController {
    private readonly senderService;
    constructor(senderService: WASenderService);
    sendPayload(payload: any): Promise<any>;
    ordenes_emitidas(body: any): Promise<any>;
    orden_emitida(body: any): Promise<any>;
}
