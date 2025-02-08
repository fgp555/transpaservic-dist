import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { MailTemplatesService } from '../mail/mail-template.service';
import { AuthPasswordService } from './auth.password.service';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly userService;
    private readonly jwtService;
    private readonly emailTemplatesService;
    private readonly authPasswordService;
    private readonly authService;
    constructor(userService: UserService, jwtService: JwtService, emailTemplatesService: MailTemplatesService, authPasswordService: AuthPasswordService, authService: AuthService);
    validateToken(authHeader: string): any;
    refreshToken(authHeader: string): Promise<any>;
    uploadSingle(file: Express.Multer.File): {
        message: string;
        filename: string;
    };
    signup(body: any): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        whatsapp: string;
        image: string;
        role: "user" | "professional" | "admin";
        createdAt: Date;
        operator: import("../operator/entities/operator.entity").OperatorEntity;
        wabla: import("../wablas/entities/wabla.entity").WablaEntity;
    } | {
        withoutPassword: {
            id: number;
            firstName: string;
            lastName: string;
            email: string;
            whatsapp: string;
            image: string;
            role: "user" | "professional" | "admin";
            createdAt: Date;
            operator: import("../operator/entities/operator.entity").OperatorEntity;
            wabla: import("../wablas/entities/wabla.entity").WablaEntity;
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
            image: string;
            role: "user" | "professional" | "admin";
            createdAt: Date;
            operator: import("../operator/entities/operator.entity").OperatorEntity;
            wabla: import("../wablas/entities/wabla.entity").WablaEntity;
        };
        token: string;
    }>;
    updateUser(id: string, body: any): Promise<{
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        whatsapp: string;
        image: string;
        role: "user" | "professional" | "admin";
        createdAt: Date;
        operator: import("../operator/entities/operator.entity").OperatorEntity;
        wabla: import("../wablas/entities/wabla.entity").WablaEntity;
    }>;
    forgotPassword(body: {
        email: string;
        domain: string;
    }): Promise<{
        message: string;
    }>;
    restorePassword(emailEncrypt: string, newPassword: string): Promise<{
        message: string;
    }>;
}
