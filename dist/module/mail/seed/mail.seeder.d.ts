import { MailTemplatesService } from '../mail-template.service';
export declare class MailSeederService {
    private readonly emailTemplatesService;
    constructor(emailTemplatesService: MailTemplatesService);
    seed(): Promise<string>;
    seedMail(): Promise<void>;
}
