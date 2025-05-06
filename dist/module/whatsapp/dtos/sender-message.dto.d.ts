export declare class SenderMessageDto {
    to: string;
    template: string;
    language?: string;
    header1: string;
    body1: string;
    body2: string;
    body3: string;
    body4: string;
}
export declare class SenderMessageDynamicDto {
    to: string;
    template: string;
    language?: string;
    header1?: string;
    headerParams?: string[];
    bodyParams: string[];
}
