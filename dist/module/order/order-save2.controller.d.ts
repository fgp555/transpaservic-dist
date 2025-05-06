import { CreateOrderDto } from './dto/create-order.dto';
import { OrderSave2Service } from './order-save2.service';
export declare class OrderSave2Controller {
    private readonly orderSave2Service;
    constructor(orderSave2Service: OrderSave2Service);
    create(createOrderDto: CreateOrderDto): Promise<{
        wa_resp: any;
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
