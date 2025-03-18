import { OrderHistoryEntity } from './entities/order-history.entity';
import { BackTicketEntity } from './entities/back-ticket.entity';
import { Repository } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { OperatorEntity } from '../operator/entities/operator.entity';
import { OrderEntity } from './entities/order.entity';
import { WablasService } from '../wablas/wablas.service';
export declare class OrderSaveService {
    private readonly orderRepository;
    private readonly backTicketRepository;
    private readonly orderHistoryRepository;
    private readonly operatorRepository;
    private readonly wablasService;
    private readonly notificationService;
    constructor(orderRepository: Repository<OrderEntity>, backTicketRepository: Repository<BackTicketEntity>, orderHistoryRepository: Repository<OrderHistoryEntity>, operatorRepository: Repository<OperatorEntity>, wablasService: WablasService, notificationService: NotificationService);
    saveArrayData(dataArray: any[], sendToWhatsApp: boolean): Promise<any>;
    create(createOrderDto: any): Promise<{
        order: OrderEntity[];
        wablas: Promise<{
            apiResponse: any;
            id: number;
            deviceId: string;
            deviceName: string;
            whatsappNumber: string;
            domain: string;
            apiKeyToken: string;
            secretKey: string;
            user: import("../user/entities/user.entity").UserEntity;
        }>;
    } | {
        order: OrderEntity[];
        wablas?: undefined;
    }>;
}
