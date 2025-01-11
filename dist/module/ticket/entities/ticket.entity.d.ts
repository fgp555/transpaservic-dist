import { TransportEntity } from 'src/module/transport/entities/transport.entity';
export declare enum TicketStatus {
    APROBADO = "aprobado",
    PENDIENTE = "pendiente"
}
export declare class TicketEntity {
    id: number;
    transportContract: string;
    orderNumber: string;
    mainDiagnosis: string;
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
    travelDate: Date;
    value: number;
    netValue: number;
    check: string;
    remarks: string;
    status: TicketStatus;
    transport: TransportEntity;
}
