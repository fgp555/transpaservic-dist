import { WaContactsEntity } from './entities/contacts.entity';
import { Repository } from 'typeorm';
import { MessageStatusEnum } from './entities/message.entity';
export declare class WaContactsService {
    private readonly contactsRepository;
    constructor(contactsRepository: Repository<WaContactsEntity>);
    updateOrCreate({ userName, contactPhone, contactName, lastMessageContent, lastMessageTimestamp, lastMessageStatus, increaseUnread, }: {
        userName?: string;
        contactPhone: string;
        contactName?: string;
        lastMessageContent: string;
        lastMessageTimestamp: number;
        lastMessageStatus: MessageStatusEnum;
        increaseUnread?: boolean;
    }): Promise<WaContactsEntity>;
    markAsRead(userName: string, contactPhone: string): Promise<void>;
    findAll({ contactPhone, lastMessageStatus, from, to, page, limit, }: {
        contactPhone?: string;
        lastMessageStatus?: MessageStatusEnum;
        from?: string;
        to?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        results: WaContactsEntity[];
    }>;
    findByContactPhone(phone: string): Promise<WaContactsEntity>;
    save(conversation: WaContactsEntity): Promise<WaContactsEntity>;
}
