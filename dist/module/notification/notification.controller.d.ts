import { NotificationService } from './notification.service';
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    sendPushNotification(body: any): Promise<{
        success: boolean;
        tickets: import("expo-server-sdk").ExpoPushTicket[];
    }>;
    findAll(): Promise<import("./entities/notification.entity").NotificationEntity[]>;
    sendOperatorOrderNotifications(operatorIds?: number[]): Promise<{
        success: boolean;
    }>;
    viewOperatorOrderPending(operatorId?: number): Promise<{
        orderCount: number;
    }>;
}
