import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    approveOrder(file: Express.Multer.File, body: {
        ticketNumber: string;
        orderId: string;
    }): Promise<import("./entities/order.entity").OrderEntity>;
    deleteTicketImage(orderId: string): Promise<{
        message: string;
    }>;
    saveArrayData(data: any[]): Promise<any>;
    checkIfExists(orderNumber?: string, operatorContract?: string): Promise<{
        exists: boolean;
    }>;
    create(createOrderDto: CreateOrderDto): Promise<{
        order: import("./entities/order.entity").OrderEntity[];
    }>;
    findAll(status?: string, operator?: number, page?: number, limit?: number, search?: string, dateFrom?: string, dateTo?: string): Promise<{
        results: import("./entities/order.entity").OrderEntity[];
        total: number;
        totalPages: number;
    }>;
    statusEnum(): Promise<import("./entities/order.entity").OrderStatus[]>;
    findOne(id: string): Promise<{
        operator: string;
        id: number;
        operatorContract: string;
        orderNumber: string;
        authorizationNumber: string;
        client: string;
        patientName: string;
        idCard: string;
        userPhone: string;
        email: string;
        creationDate: Date;
        origin: string;
        destination: string;
        itinerary: string;
        travelDate: Date | null;
        quantity: number;
        value: number;
        netValue: number;
        remarks: string;
        status: import("./entities/order.entity").OrderStatus;
        ticketNumber: string;
        ticketImage: string;
    }>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<{
        operator: string;
        id: number;
        operatorContract: string;
        orderNumber: string;
        authorizationNumber: string;
        client: string;
        patientName: string;
        idCard: string;
        userPhone: string;
        email: string;
        creationDate: Date;
        origin: string;
        destination: string;
        itinerary: string;
        travelDate: Date | null;
        quantity: number;
        value: number;
        netValue: number;
        remarks: string;
        status: import("./entities/order.entity").OrderStatus;
        ticketNumber: string;
        ticketImage: string;
    }>;
    remove(id: string): Promise<void>;
}
