import { Repository } from 'typeorm';
import { DocumentType, OrderEntity, OrderStatus } from './entities/order.entity';
export declare class GetOrderService {
    private readonly orderRepository;
    constructor(orderRepository: Repository<OrderEntity>);
    findByDocument(documentType: string, idCard: string): Promise<{
        patientName: string;
        userPhone: string;
        id: number;
        operator: import("../operator/entities/operator.entity").OperatorEntity;
        orderNumber: string;
        documentType: DocumentType;
        idCard: string;
        itinerary: string;
        creationDate: Date;
        expirationDate: Date | null;
        travelDate: Date | null;
        approvalDate: Date | null;
        approvalTravelDate: Date | null;
        ticketNumber: string;
        quantity: number;
        approvalQuantity: number;
        authorizationNumber: string;
        operatorContract: string;
        value: number;
        netValue: number;
        origin: string;
        destination: string;
        client: string;
        remarks: string;
        status: OrderStatus;
        ticketImage: string;
        dimensionImg: string;
        backticketHistory: import("./entities/back-ticket.entity").BackTicketEntity[];
        email: string;
        orderHistory: import("./entities/order-history.entity").OrderHistoryEntity[];
    }[]>;
}
