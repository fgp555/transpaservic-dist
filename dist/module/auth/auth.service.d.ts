import { CreateAuthDto } from './dto/create-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from '../user/dtos/update-user.dto';
import { MailService } from '../mail/mail.service';
import { MailTemplatesService } from '../mail/mail-template.service';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly mailService;
    private readonly emailTemplatesService;
    constructor(userService: UserService, jwtService: JwtService, mailService: MailService, emailTemplatesService: MailTemplatesService);
    signup(body: any): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        whatsapp: string;
        username: string;
        image: string;
        role: "user" | "professional" | "admin";
        createdAt: Date;
        operator: import("../operator/entities/operator.entity").OperatorEntity;
        wabla: import("../wablas/entities/wabla.entity").WablaEntity;
    }>;
    sendEmail(body: any): Promise<{
        message: string;
        result: any;
    }>;
    private replacePlaceholders;
    singin(createAuthDto: CreateAuthDto): Promise<{
        login: boolean;
        user: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            whatsapp: string;
            username: string;
            image: string;
            role: "user" | "professional" | "admin";
            createdAt: Date;
            operator: import("../operator/entities/operator.entity").OperatorEntity;
            wabla: import("../wablas/entities/wabla.entity").WablaEntity;
        };
        token: string;
    }>;
    updateUser(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        whatsapp: string;
        username: string;
        image: string;
        role: "user" | "professional" | "admin";
        createdAt: Date;
        operator: import("../operator/entities/operator.entity").OperatorEntity;
        wabla: import("../wablas/entities/wabla.entity").WablaEntity;
    }>;
}
