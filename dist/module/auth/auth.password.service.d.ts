import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { MailService } from '../mail/mail.service';
export declare class AuthPasswordService {
    private userRepository;
    private readonly mailService;
    constructor(userRepository: Repository<UserEntity>, mailService: MailService);
    forgotPassword(email: string, domain: string): Promise<{
        message: string;
    }>;
    restorePassword(emailEncrypt: string, newPassword: string): Promise<void>;
}
