import { WaContactsEntity } from './entities/contacts.entity';
import { MessageStatusEnum } from './entities/message.entity';
import { IUpdateOrCreate } from './intefaces/IWhatapp';
import { Repository } from 'typeorm';
export declare class WaContactsService {
    private readonly contactsRepository;
    constructor(contactsRepository: Repository<WaContactsEntity>);
    updateOrCreate({ userName, contactPhone, contactName, lastMessageContent, lastMessageTimestamp, lastMessageStatus, increaseUnread, inSupportChat, lastAgentInteraction, }: IUpdateOrCreate): Promise<WaContactsEntity>;
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
    closeSupport(contactPhone: string): Promise<WaContactsEntity>;
}
