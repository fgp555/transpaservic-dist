import { Repository } from 'typeorm';
import { WaMessageEntity } from './entities/message.entity';
import { WebhookDto } from './dtos/webhook-message.dto';
import { WaContactsService } from './contacts.service';
export declare class WaWebhookService {
    private readonly messageRepository;
    private readonly contactsService;
    constructor(messageRepository: Repository<WaMessageEntity>, contactsService: WaContactsService);
    handleIncomingMessage(data: WebhookDto): Promise<void>;
}
