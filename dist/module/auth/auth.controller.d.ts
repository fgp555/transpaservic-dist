import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signin_captcha(signinDto: any): Promise<{
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
    signin(signinDto: SigninDto): Promise<{
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
    signup(body: any, file?: Express.Multer.File): Promise<{
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
    update(file: Express.Multer.File, userId: string, updateDto: any, req: any): Promise<{
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
}
