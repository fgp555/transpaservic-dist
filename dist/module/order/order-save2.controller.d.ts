import { CreateOrderDto } from './dto/create-order.dto';
import { OrderSave2Service } from './order-save2.service';
export declare class OrderSave2Controller {
    private readonly orderSave2Service;
    constructor(orderSave2Service: OrderSave2Service);
    create(createOrderDto: CreateOrderDto): Promise<{
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
        order: import("./entities/order.entity").OrderEntity[];
        wa_error?: undefined;
    } | {
        wa_error: any;
        order: import("./entities/order.entity").OrderEntity[];
        wa_resp?: undefined;
    } | {
        order: import("./entities/order.entity").OrderEntity[];
        wa_resp?: undefined;
        wa_error?: undefined;
    }>;
    saveArrayData(data: any[], sendToWhatsApp: boolean): Promise<any>;
}
