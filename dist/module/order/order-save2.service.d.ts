import { Repository } from 'typeorm';
import { NotificationService } from '../notification/notification.service';
import { OperatorEntity } from '../operator/entities/operator.entity';
import { OrderEntity } from './entities/order.entity';
import { WaTemplateService } from '../whatsapp/template.service';
import { PatientService } from '../patient/patient.service';
export declare class OrderSave2Service {
    private readonly orderRepository;
    private readonly operatorRepository;
    private readonly notificationService;
    private readonly waTemplateService;
    private readonly patientService;
    constructor(orderRepository: Repository<OrderEntity>, operatorRepository: Repository<OperatorEntity>, notificationService: NotificationService, waTemplateService: WaTemplateService, patientService: PatientService);
    create(createOrderDto: any): Promise<{
        order: OrderEntity[];
    }>;
    saveArrayData(dataArray: any[], sendToWhatsApp: boolean): Promise<any>;
    private expireOldOrders;
    private addPatient;
    private sendWhatsAppMessage;
}
