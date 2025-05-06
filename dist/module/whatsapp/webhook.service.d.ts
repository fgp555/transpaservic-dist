import { Repository } from 'typeorm';
import { WhatsappMessagesEntity } from './entities/whatsapp-messages.entity';
import { WhatsappUsersEntity } from './entities/whatsapp-users.entity';
export declare class WebhookService {
    private readonly messageRepository;
    private readonly userRepository;
    constructor(messageRepository: Repository<WhatsappMessagesEntity>, userRepository: Repository<WhatsappUsersEntity>);
    saveOrUpdateMessage(data: Partial<WhatsappMessagesEntity>): Promise<void>;
    updateStatusByMessageId(messageId: string, data: Partial<WhatsappMessagesEntity>): Promise<void>;
    saveMessage(data: Partial<WhatsappMessagesEntity>): Promise<WhatsappMessagesEntity>;
    upsertWhatsappUser(whatsappId: string, contactName?: string, status?: string): Promise<WhatsappUsersEntity>;
}
