import { NotificationEntity } from './entities/notification.entity';
import { Repository } from 'typeorm';
import { ExpoPushTicket } from 'expo-server-sdk';
import { OrderEntity } from '../order/entities/order.entity';
import { OperatorEntity } from '../operator/entities/operator.entity';
import { DeviceEntity } from '../device/entities/device.entity';
import { WSGateway } from '../websocket/websocket.gateway';
export declare class NotificationService {
    private readonly wsGateway;
    private notificationRepository;
    private readonly orderRepository;
    private operatorRepository;
    private deviceRepository;
    constructor(wsGateway: WSGateway, notificationRepository: Repository<NotificationEntity>, orderRepository: Repository<OrderEntity>, operatorRepository: Repository<OperatorEntity>, deviceRepository: Repository<DeviceEntity>);
    private expo;
    private readonly logger;
    findAll(): Promise<NotificationEntity[]>;
    sendPushNotification(toTokens: string[], message: string, title?: string): Promise<{
        success: boolean;
        tickets: ExpoPushTicket[];
    }>;
    sendOperatorOrderNotifications(operatorIds: number[]): Promise<{
        success: boolean;
    }>;
    viewOperatorOrderPending(operatorId: number): Promise<{
        orderCount: number;
    }>;
}
