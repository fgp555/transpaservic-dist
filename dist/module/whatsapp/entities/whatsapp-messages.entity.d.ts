import { WhatsappUsersEntity } from './whatsapp-users.entity';
export declare class WhatsappMessagesEntity {
    id: number;
    whatsappMessage: WhatsappUsersEntity;
    entry_id: string;
    contacts_wa_id: string;
    contacts_name: string;
    messages_from: string;
    messages_id: string;
    messages_timestamp: string;
    messages_type: string;
    messages_body: string;
    reaction_emoji: string;
    statuses_id: string;
    statuses_timestamp: string;
    statuses_recipient_id: string;
    expiration_timestamp: string;
    pricing_billable: string;
    pricing_category: string;
    statuses_status: string;
    payload: string;
    createdAt: Date;
    updatedAt: Date;
}
