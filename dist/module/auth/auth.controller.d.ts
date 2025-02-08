import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin-auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
            createdAt: Date;
            operator: import("../operator/entities/operator.entity").OperatorEntity;
            wabla: import("../wablas/entities/wabla.entity").WablaEntity;
        };
        token: string;
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
            createdAt: Date;
            operator: import("../operator/entities/operator.entity").OperatorEntity;
            wabla: import("../wablas/entities/wabla.entity").WablaEntity;
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
            createdAt: Date;
            operator: import("../operator/entities/operator.entity").OperatorEntity;
            wabla: import("../wablas/entities/wabla.entity").WablaEntity;
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
        createdAt: Date;
        operator: import("../operator/entities/operator.entity").OperatorEntity;
        wabla: import("../wablas/entities/wabla.entity").WablaEntity;
    }>;
}
