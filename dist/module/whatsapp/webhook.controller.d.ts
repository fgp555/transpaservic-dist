import { Request, Response } from 'express';
import { WebhookService } from './webhook.service';
export declare class WebhookController {
    private readonly service;
    constructor(service: WebhookService);
    verify(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
    receive(req: Request & {
        rawBody?: Buffer;
    }, res: Response, signature: string): Promise<Response<any, Record<string, any>>>;
}
