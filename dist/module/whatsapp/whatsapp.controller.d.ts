import { WhatsappService } from './whatsapp.service';
export declare class WhatsappController {
    private readonly service;
    constructor(service: WhatsappService);
    getAllMessages(whatsappId: string, statusesStatus: string, from: string, to: string, page?: number, limit?: number): Promise<{
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        messages: import("./entities/whatsapp-users.entity").WhatsappUsersEntity[];
    }>;
    getMessagesByWHATSAPP_ID(whatsappId: string): Promise<import("./entities/whatsapp-messages.entity").WhatsappMessagesEntity[]>;
    getAllHistory(): Promise<import("./entities/whatsapp-messages.entity").WhatsappMessagesEntity[]>;
}
