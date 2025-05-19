import { MailTemplatesService } from '../mail/mail-template.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SigninDto } from './dto/signin-auth.dto';
export declare class AuthService {
    private readonly mailTemplatesService;
    private readonly userService;
    private readonly jwtService;
    private readonly turnstileSecretKey;
    constructor(mailTemplatesService: MailTemplatesService, userService: UserService, jwtService: JwtService);
    signin(SigninDto: SigninDto): Promise<{
        login: boolean;
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            whatsapp: string;
            image: string;
            role: import("../user/entities/user.entity").UserRole;
            isVisible: boolean;
            operator: import("../operator/entities/operator.entity").OperatorEntity;
            devices: import("../device/entities/device.entity").DeviceEntity[];
            wabla: import("../wablas/entities/wabla.entity").WablaEntity;
            createdAt: Date;
            updatedAt: Date;
        };
        token: string;
        loginDate: string;
        expirationDate: string;
    }>;
    signup(body: any, filePath?: string): Promise<{
        message: string;
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            whatsapp: string;
            image: string;
            role: import("../user/entities/user.entity").UserRole;
            isVisible: boolean;
            operator: import("../operator/entities/operator.entity").OperatorEntity;
            devices: import("../device/entities/device.entity").DeviceEntity[];
            wabla: import("../wablas/entities/wabla.entity").WablaEntity;
            createdAt: Date;
            updatedAt: Date;
        };
        sendMail: {
            message: string;
            result: any;
        };
    } | {
        message: string;
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            whatsapp: string;
            image: string;
            role: import("../user/entities/user.entity").UserRole;
            isVisible: boolean;
            operator: import("../operator/entities/operator.entity").OperatorEntity;
            devices: import("../device/entities/device.entity").DeviceEntity[];
            wabla: import("../wablas/entities/wabla.entity").WablaEntity;
            createdAt: Date;
            updatedAt: Date;
        };
        sendMail?: undefined;
    }>;
    update(userId: string, body: any, filePath: string, currentUser: any): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        whatsapp: string;
        image: string;
        role: import("../user/entities/user.entity").UserRole;
        isVisible: boolean;
        operator: import("../operator/entities/operator.entity").OperatorEntity;
        devices: import("../device/entities/device.entity").DeviceEntity[];
        wabla: import("../wablas/entities/wabla.entity").WablaEntity;
        createdAt: Date;
        updatedAt: Date;
    }>;
    verifyTurnstileToken(token: string): Promise<any>;
}
