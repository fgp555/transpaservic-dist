import { WablasReportService } from './wablas-report.service';
export declare class WablasReportController {
    private readonly wablasReportService;
    constructor(wablasReportService: WablasReportService);
    fetchAndSaveData(): Promise<any[]>;
    getById(id: string): Promise<import("./entities/wabla-report.entity").WablasReportEntity>;
    findAllByFilters(status?: string, deviceID?: string, page?: number, limit?: number, search?: string, dateFrom?: string, dateTo?: string): Promise<{
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        results: import("./entities/wabla-report.entity").WablasReportEntity[];
    }>;
}
