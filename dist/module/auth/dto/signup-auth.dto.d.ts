import { RolesEnum } from 'src/utils/roles/enum/roles.enum';
export declare class SignupDto {
    firstName: string;
    email: string;
    whatsapp?: string;
    password: string;
    image?: string | null;
    role?: RolesEnum;
    sendMail?: boolean;
    operatorId?: number;
    operator?: {
        id: number;
    };
}
