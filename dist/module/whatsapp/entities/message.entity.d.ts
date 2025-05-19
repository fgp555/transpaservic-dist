export declare enum MessageStatusEnum {
    INCOMING = "incoming",
    SENT = "sent",
    DELIVERED = "delivered",
    READ = "read",
    FAILED = "failed",
    PENDING = "pending"
}
export declare class WaMessageEntity {
    id: number;
    userName: string;
    userEmail: string;
    whatsappMessageId: string;
    from: string;
    to: string;
    content: string;
    type?: string;
    templateName?: string;
    messageType?: string;
    messageButtonText?: string;
    timestamp: number;
    reactionToMessageId?: string;
    reactionEmoji?: string;
    status: MessageStatusEnum;
    category?: string;
    payload: string;
    createdAt: Date;
    updatedAt: Date;
}
