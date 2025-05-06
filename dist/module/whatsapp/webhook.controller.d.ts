import { Request, Response } from 'express';
import { WaWebhookService } from './webhook.service';
import { WebhookDto } from './dtos/webhook-message.dto';
export declare class WaWebhookController {
    private readonly webhookService;
    constructor(webhookService: WaWebhookService);
    verify(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    receiveMessage(body: WebhookDto): Promise<{
        received: boolean;
    }>;
}
