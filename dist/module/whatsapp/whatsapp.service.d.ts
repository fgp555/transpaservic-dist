import { Repository } from 'typeorm';
import { WhatsappUsersEntity } from './entities/whatsapp-users.entity';
import { WhatsappMessagesEntity } from './entities/whatsapp-messages.entity';
export declare class WhatsappService {
    private readonly messageRepo;
    private readonly historyRepo;
    constructor(messageRepo: Repository<WhatsappUsersEntity>, historyRepo: Repository<WhatsappMessagesEntity>);
    getAllMessages(whatsappId: string, statusesStatus: string, from: string, to: string, page: number, limit: number): Promise<{
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        messages: WhatsappUsersEntity[];
    }>;
    getMessagesByWHATSAPP_ID(whatsappId: string): Promise<WhatsappMessagesEntity[]>;
    getAllHistory(): Promise<WhatsappMessagesEntity[]>;
}
