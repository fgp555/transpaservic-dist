import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { MailTemplatesService } from '../mail/mail-template.service';
export declare class AuthController {
    private readonly userService;
    private readonly jwtService;
    private readonly emailTemplatesService;
    constructor(userService: UserService, jwtService: JwtService, emailTemplatesService: MailTemplatesService);
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
        transport: import("../transport/entities/transport.entity").TransportEntity;
    } | {
        withoutPassword: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            whatsapp: string;
            username: string;
            image: string;
            role: "user" | "professional" | "admin";
            createdAt: Date;
            transport: import("../transport/entities/transport.entity").TransportEntity;
        };
        sendMail: {
            message: string;
            result: any;
        };
    }>;
    singin(createAuthDto: any): Promise<{
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
            transport: import("../transport/entities/transport.entity").TransportEntity;
        };
        token: string;
    }>;
    updateUser(id: string, body: any): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        whatsapp: string;
        username: string;
        image: string;
        role: "user" | "professional" | "admin";
        createdAt: Date;
        transport: import("../transport/entities/transport.entity").TransportEntity;
    }>;
}
