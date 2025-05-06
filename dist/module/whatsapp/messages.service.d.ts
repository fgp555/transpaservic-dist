import { WaMessageEntity, MessageStatusEnum } from './entities/message.entity';
import { Repository } from 'typeorm';
import { WaContactsService } from './contacts.service';
import { SendMessageDto } from './dtos/send-message.dto';
export declare class WaMessagesService {
    private readonly messageRepository;
    private readonly conversationsService;
    private apiBaseUrl;
    private token;
    private phoneNumberId;
    private apiUrl;
    constructor(messageRepository: Repository<WaMessageEntity>, conversationsService: WaContactsService);
    sendPayload(payload: any): Promise<{
        userName: any;
        userEmail: any;
        to: any;
        content: any;
        type: any;
        templateName: any;
        timestamp: number;
        status: MessageStatusEnum.PENDING;
        whatsappMessageId: any;
    } & WaMessageEntity>;
    sendMessageFrontend(payloadDto: SendMessageDto): Promise<WaMessageEntity>;
    findAll(): Promise<WaMessageEntity[]>;
    findOne(id: number): Promise<WaMessageEntity | null>;
    findByPhone(phone: string): Promise<WaMessageEntity[]>;
}
