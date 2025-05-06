import { WaMessagesService } from './messages.service';
import { WaMessageEntity } from './entities/message.entity';
import { SendMessageDto } from './dtos/send-message.dto';
export declare class WaMessagesController {
    private readonly messagesService;
    constructor(messagesService: WaMessagesService);
    findAll(): Promise<WaMessageEntity[]>;
    findOne(id: number): Promise<WaMessageEntity>;
    findByPhone(phone: string): Promise<WaMessageEntity[]>;
    sendMessage(dto: SendMessageDto): Promise<WaMessageEntity>;
    sendPayload(payload: any): Promise<{
        userName: any;
        userEmail: any;
        to: any;
        content: any;
        type: any;
        templateName: any;
        timestamp: number;
        status: import("./entities/message.entity").MessageStatusEnum.PENDING;
        whatsappMessageId: any;
    } & WaMessageEntity>;
}
