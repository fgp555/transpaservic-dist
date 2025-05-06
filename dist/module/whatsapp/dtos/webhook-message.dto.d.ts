export declare class WebhookDto {
    object: string;
    entry: {
        id: string;
        changes: {
            value: {
                messaging_product: string;
                metadata: any;
                contacts?: any[];
                messages?: any[];
                statuses?: any[];
            };
            field: string;
        }[];
    }[];
}
