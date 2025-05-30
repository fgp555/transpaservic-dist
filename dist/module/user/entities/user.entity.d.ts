import { DeviceEntity } from 'src/module/device/entities/device.entity';
import { OperatorEntity } from 'src/module/operator/entities/operator.entity';
import { WablaEntity } from 'src/module/wablas/entities/wabla.entity';
export declare enum UserRole {
    USER = "user",
    ADMIN = "admin",
    SUPERADMIN = "superadmin",
    COLLABORATOR = "collaborator",
    DEVELOPER = "developer",
    GUEST = "guest"
}
export declare class UserEntity {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    whatsapp: string;
    password: string;
    image: string;
    role: UserRole;
    isVisible: boolean;
    operator: OperatorEntity;
    devices: DeviceEntity[];
    wabla: WablaEntity;
    createdAt: Date;
    updatedAt: Date;
}
