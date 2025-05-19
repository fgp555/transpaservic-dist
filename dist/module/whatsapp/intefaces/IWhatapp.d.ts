import { MessageStatusEnum } from '../entities/message.entity';
export interface IUpdateOrCreate {
    userName?: string;
    contactPhone?: string;
    contactName?: string;
    lastMessageContent?: string;
    lastMessageTimestamp?: number;
    lastMessageStatus?: MessageStatusEnum;
    increaseUnread?: boolean;
    inSupportChat?: boolean;
    lastAgentInteraction?: number;
}
