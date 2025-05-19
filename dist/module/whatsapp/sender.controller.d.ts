import { WaSenderService } from './sender.service';
export declare class WaSenderController {
    private readonly waSenderService;
    constructor(waSenderService: WaSenderService);
    findOrders(userPhone: string): Promise<{
        operator: string;
        id: number;
        orderNumber: string;
        patientName: string;
        documentType: import("../order/entities/order.entity").DocumentType;
        idCard: string;
        userPhone: string;
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
        status: import("../order/entities/order.entity").OrderStatus;
        ticketImage: string;
        dimensionImg: string;
        backticketHistory: import("../order/entities/back-ticket.entity").BackTicketEntity[];
        email: string;
        orderHistory: import("../order/entities/order-history.entity").OrderHistoryEntity[];
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
