import { CreateOrderDto } from './dto/create-order.dto';
import { OrderSave2Service } from './order-save2.service';
export declare class OrderSave2Controller {
    private readonly orderSave2Service;
    constructor(orderSave2Service: OrderSave2Service);
    create(createOrderDto: CreateOrderDto): Promise<{
        order: import("./entities/order.entity").OrderEntity[];
    }>;
    saveArrayData(data: any[], sendToWhatsApp: boolean): Promise<any>;
}
