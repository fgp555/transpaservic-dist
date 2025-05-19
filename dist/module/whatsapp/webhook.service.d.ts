import { Repository } from 'typeorm';
import { WaContactsService } from './contacts.service';
import { WaMessageEntity } from './entities/message.entity';
import { WaSenderService } from './sender.service';
import { WebhookDto } from './dtos/webhook-message.dto';
import { PatientEntity } from '../patient/entities/patient.entity';
export declare class WaWebhookService {
    private readonly messageRepository;
    private readonly patientRepository;
    private readonly contactsService;
    private readonly senderService;
    private token;
    constructor(messageRepository: Repository<WaMessageEntity>, patientRepository: Repository<PatientEntity>, contactsService: WaContactsService, senderService: WaSenderService);
    handleIncomingMessage(data: WebhookDto): Promise<void>;
    private getMediaUrl;
    private downloadMedia;
}
