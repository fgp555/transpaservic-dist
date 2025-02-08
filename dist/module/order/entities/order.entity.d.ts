import { OperatorEntity } from 'src/module/operator/entities/operator.entity';
import { BackTicketEntity } from './back-ticket.entity';
import { OrderHistoryEntity } from './order-history.entity';
export declare enum OrderStatus {
    PENDIENTE = "pendiente",
    APROBADO = "aprobado",
    CANCELADO = "cancelado",
    EXPIRADO = "expirado"
}
export declare class OrderEntity {
    id: number;
    operator: OperatorEntity;
    orderNumber: string;
    patientName: string;
    idCard: string;
    userPhone: string;
    itinerary: string;
    creationDate: Date;
    expirationDate: Date | null;
    setExpirationDate(): void;
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
    backticketHistory: BackTicketEntity[];
    email: string;
    orderHistory: OrderHistoryEntity[];
}
