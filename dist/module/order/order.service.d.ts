import { Repository } from 'typeorm';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderEntity, OrderStatus } from './entities/order.entity';
import { OperatorEntity } from '../operator/entities/operator.entity';
import { WablasService } from '../wablas/wablas.service';
export declare class OrderService {
    private readonly orderRepository;
    private readonly operatorRepository;
    private readonly wablasService;
    constructor(orderRepository: Repository<OrderEntity>, operatorRepository: Repository<OperatorEntity>, wablasService: WablasService);
    approveOrder(orderId: string, ticketNumber: string, filename: string): Promise<OrderEntity>;
    deleteTicketImage(orderId: string): Promise<{
        message: string;
    }>;
    saveArrayData(data: any[]): Promise<any>;
    create(createOrderDto: any): Promise<{
        order: OrderEntity[];
    }>;
    checkIfExists(orderNumber?: string, operatorContract?: string): Promise<{
        exists: boolean;
    }>;
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
        travelDate: Date | null;
        quantity: number;
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
        travelDate: Date | null;
        quantity: number;
        value: number;
        netValue: number;
        remarks: string;
        status: OrderStatus;
        ticketNumber: string;
        ticketImage: string;
    }>;
    remove(id: number): Promise<void>;
}
