import { WhatsappMessagesEntity } from './whatsapp-messages.entity';
export declare class WhatsappUsersEntity {
    id: number;
    WHATSAPP_ID: string;
    contacts_name: string;
    statuses_status: string;
    createdAt: Date;
    updatedAt: Date;
    histories: WhatsappMessagesEntity[];
}
