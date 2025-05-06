export declare class WASenderService {
    private apiBaseUrl;
    private token;
    private phoneNumberId;
    private apiUrl;
    constructor();
    sendPayload(payload: any): Promise<any>;
    ordenes_emitidas(body: any): Promise<any>;
    orden_emitida(body: any): Promise<any>;
}
