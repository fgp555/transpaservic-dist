import { Repository } from 'typeorm';
import { OrderEntity } from 'src/module/order/entities/order.entity';
export declare class OrderSeederService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<OrderEntity>);
    seed(): Promise<void>;
}
