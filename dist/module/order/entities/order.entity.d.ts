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
    quantity: number;
    travelDate: Date | null;
    value: number;
    netValue: number;
    remarks: string;
    status: OrderStatus;
    operator: OperatorEntity;
    ticketNumber: string;
    ticketImage: string;
}
