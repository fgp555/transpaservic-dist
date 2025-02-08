import { AuthPasswordService } from './auth-password.service';
export declare class AuthPasswordController {
    private readonly authPasswordService;
    constructor(authPasswordService: AuthPasswordService);
    decodeToken(authHeader: string): any;
    refreshAccessToken(authHeader: string): Promise<any>;
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
