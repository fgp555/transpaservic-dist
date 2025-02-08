import { OrderEntity } from './order.entity';
export declare class BackTicketEntity {
    id: number;
    operator: string;
    ticketNumber: string;
    travelDate: Date | null;
    order: OrderEntity;
    createdAt: Date;
}
