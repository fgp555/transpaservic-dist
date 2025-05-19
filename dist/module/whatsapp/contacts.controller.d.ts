import { WaContactsService } from './contacts.service';
import { MessageStatusEnum } from './entities/message.entity';
export declare class WaContactsController {
    private readonly waContactsService;
    constructor(waContactsService: WaContactsService);
    findAll(contactPhone?: string, lastMessageStatus?: MessageStatusEnum, from?: string, to?: string, page?: number, limit?: number): Promise<{
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        results: import("./entities/contacts.entity").WaContactsEntity[];
    }>;
    findByContactPhone(contactPhone: string): Promise<import("./entities/contacts.entity").WaContactsEntity>;
    closeSupport(contactPhone: string): Promise<import("./entities/contacts.entity").WaContactsEntity>;
}
