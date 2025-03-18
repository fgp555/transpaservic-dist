import { UserEntity } from 'src/module/user/entities/user.entity';
export declare enum DeviceType {
    IOS = "ios",
    ANDROID = "android"
}
export declare class DeviceEntity {
    id: number;
    user: UserEntity;
    expoPushToken: string;
    deviceType: DeviceType;
    createdAt: Date;
    updatedAt: Date;
}
