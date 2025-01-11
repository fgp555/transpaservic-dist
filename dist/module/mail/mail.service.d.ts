import { MailDto } from './dtos/mail.dto';
export declare class MailService {
    private transporter;
    constructor();
    sendMail(body: MailDto): Promise<any>;
    sendMail2(from: string, to: string, subject: string, text: string, html?: string): Promise<void>;
}
