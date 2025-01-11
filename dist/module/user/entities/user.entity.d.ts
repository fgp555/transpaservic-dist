import { OperatorEntity } from 'src/module/operator/entities/operator.entity';
import { WablaEntity } from 'src/module/wablas/entities/wabla.entity';
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
    operator: OperatorEntity;
    wabla: WablaEntity;
}
