import { DocumentType } from 'src/module/order/entities/order.entity';
import { TravelDatesEntity } from './travelDates.entity';
export declare class PatientEntity {
    id: number;
    documentType: DocumentType;
    idCard: string;
    idCardImageFront: string;
    idCardImageBack: string;
    travelDates: TravelDatesEntity[];
    createdAt: Date;
    updatedAt: Date;
}
