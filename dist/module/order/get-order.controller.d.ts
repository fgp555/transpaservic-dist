import { GetOrderService } from './get-order.service';
import { GetOrderDto } from './dto/get-order.dto';
export declare class GetOrderController {
    private readonly ordersService;
    constructor(ordersService: GetOrderService);
    getOrdersByDocument(query: GetOrderDto): Promise<{
        patientName: string;
        userPhone: string;
        id: number;
        operator: import("../operator/entities/operator.entity").OperatorEntity;
        orderNumber: string;
        documentType: import("./entities/order.entity").DocumentType;
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
        status: import("./entities/order.entity").OrderStatus;
        ticketImage: string;
        dimensionImg: string;
        backticketHistory: import("./entities/back-ticket.entity").BackTicketEntity[];
        email: string;
        orderHistory: import("./entities/order-history.entity").OrderHistoryEntity[];
    }[]>;
}
