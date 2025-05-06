import { Repository } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { OperatorEntity } from '../operator/entities/operator.entity';
import { OrderEntity } from './entities/order.entity';
import { WASenderService } from '../whatsapp/sender.service';
export declare class OrderSave2Service {
    private readonly orderRepository;
    private readonly operatorRepository;
    private readonly notificationService;
    private readonly waSenderService;
    constructor(orderRepository: Repository<OrderEntity>, operatorRepository: Repository<OperatorEntity>, notificationService: NotificationService, waSenderService: WASenderService);
    create(createOrderDto: any): Promise<{
        wa_resp: any;
        order: OrderEntity[];
        wa_error?: undefined;
    } | {
        wa_error: any;
        order: OrderEntity[];
        wa_resp?: undefined;
    } | {
        order: OrderEntity[];
        wa_resp?: undefined;
        wa_error?: undefined;
    }>;
    saveArrayData(dataArray: any[], sendToWhatsApp: boolean): Promise<any>;
    private expireOldOrders;
}
