import { OrderEntity } from './order.entity';
import { UserEntity } from 'src/module/user/entities/user.entity';
export declare enum ActionEnum {
    CREATED = "created",
    UPDATED = "updated",
    DELETED = "deleted",
    BACKTICKET = "backticket",
    APPROVED = "approved"
}
export declare class OrderHistoryEntity {
    id: number;
    order: OrderEntity;
    modifiedByUser: UserEntity;
    action: ActionEnum;
    modifiedAt: Date;
}
