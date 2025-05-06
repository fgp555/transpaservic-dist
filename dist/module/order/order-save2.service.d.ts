import { Repository } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { OperatorEntity } from '../operator/entities/operator.entity';
import { OrderEntity } from './entities/order.entity';
import { WaTemplateService } from '../whatsapp/template.service';
export declare class OrderSave2Service {
    private readonly orderRepository;
    private readonly operatorRepository;
    private readonly notificationService;
    private readonly waTemplateService;
    constructor(orderRepository: Repository<OrderEntity>, operatorRepository: Repository<OperatorEntity>, notificationService: NotificationService, waTemplateService: WaTemplateService);
    create(createOrderDto: any): Promise<{
        wa_resp: {
            userName: any;
            userEmail: any;
            to: any;
            content: any;
            type: any;
            templateName: any;
            timestamp: number;
            status: import("../whatsapp/entities/message.entity").MessageStatusEnum.PENDING;
            whatsappMessageId: any;
        } & import("../whatsapp/entities/message.entity").WaMessageEntity;
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
