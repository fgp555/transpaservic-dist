import { Repository } from 'typeorm';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity, OrderStatus } from './entities/order.entity';
export declare class OrderService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<OrderEntity>);
    saveFilteredData(data: any[]): Promise<any>;
    checkIfExists(orderNumber?: string, operatorContract?: string): Promise<{
        exists: boolean;
    }>;
    create(createOrderDto: any): Promise<OrderEntity[]>;
    findAll(filters: {
        status?: string;
        operator?: number;
        page?: number;
        limit?: number;
        search?: string;
        dateFrom?: string;
        dateTo?: string;
    }): Promise<{
        results: OrderEntity[];
        total: number;
        totalPages: number;
    }>;
    statusEnum(): Promise<OrderStatus[]>;
    findOne(id: number): Promise<{
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
        quantity: number;
        travelDate: Date | null;
        value: number;
        netValue: number;
        remarks: string;
        status: OrderStatus;
        ticketNumber: string;
        ticketImage: string;
    }>;
    update(id: number, updateOrderDto: UpdateOrderDto): Promise<{
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
        quantity: number;
        travelDate: Date | null;
        value: number;
        netValue: number;
        remarks: string;
        status: OrderStatus;
        ticketNumber: string;
        ticketImage: string;
    }>;
    remove(id: number): Promise<void>;
}
