import { UserEntity } from 'src/module/user/entities/user.entity';
export declare class WablaEntity {
    id: number;
    deviceId: string;
    deviceName: string;
    whatsappNumber: string;
    domain: string;
    apiKeyToken: string;
    secretKey: string;
    user: UserEntity;
}
