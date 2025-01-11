import { TransportEntity } from 'src/module/transport/entities/transport.entity';
export declare class UserEntity {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    whatsapp: string;
    username: string;
    password: string;
    image: string;
    role: 'user' | 'professional' | 'admin';
    createdAt: Date;
    transport: TransportEntity;
}
