import { OperatorEntity } from 'src/module/operator/entities/operator.entity';
export declare enum OrderStatus {
    PENDIENTE = "pendiente",
    APROBADO = "aprobado",
    CANCELADO = "cancelado"
}
export declare class OrderEntity {
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
    operator: OperatorEntity;
    status: OrderStatus;
    ticketNumber: string;
    ticketImage: string;
}
