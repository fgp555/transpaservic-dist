import { OrderStatus, DocumentType } from '../entities/order.entity';
export declare class GetOrderDto {
    documentType: DocumentType;
    idCard: string;
    status?: OrderStatus;
}
