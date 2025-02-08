import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
export declare class AuthPasswordService {
    private userRepository;
    private readonly mailService;
    private readonly jwtService;
    private readonly userService;
    constructor(userRepository: Repository<UserEntity>, mailService: MailService, jwtService: JwtService, userService: UserService);
    decodeToken(token: string): any;
    refreshAccessToken(token: string): Promise<any>;
    forgotPassword(email: string, domain: string): Promise<{
        message: string;
    }>;
    restorePassword(emailEncrypt: string, newPassword: string): Promise<void>;
}
