import { OrderEntity } from 'src/module/order/entities/order.entity';
import { UserEntity } from 'src/module/user/entities/user.entity';
export declare class OperatorEntity {
    id: number;
    name: string;
    whatsapp: string;
    email: string;
    website: string;
    image: string;
    registrationDate: Date;
    orders: OrderEntity;
    users: UserEntity;
}
