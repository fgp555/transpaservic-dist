import { MessageStatusEnum } from './message.entity';
export declare class WaContactsEntity {
    id: number;
    userName: string;
    contactPhone: string;
    contactName: string;
    lastMessageContent: string;
    lastMessageTimestamp: number;
    lastMessageStatus: MessageStatusEnum;
    unreadCount: number;
    createdAt: Date;
    updatedAt: Date;
}
