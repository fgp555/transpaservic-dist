import { OperatorEntity } from 'src/module/operator/entities/operator.entity';
export declare enum NotificationStatus {
    PENDING = "pending",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELED = "canceled"
}
export declare class NotificationEntity {
    id: number;
    operator: OperatorEntity;
    title: string;
    message: string;
    status: NotificationStatus;
    createdAt: Date;
}
