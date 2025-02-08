import { Repository } from 'typeorm';
import { WablasService } from './wablas.service';
import { WablasReportEntity } from './entities/wabla-report.entity';
export declare class WablasReportService {
    private readonly wablasReportRepository;
    private readonly wablasService;
    constructor(wablasReportRepository: Repository<WablasReportEntity>, wablasService: WablasService);
    fetchAndSaveData(): Promise<any[]>;
    getById(id: string): Promise<WablasReportEntity>;
    findAllByFilters(filters: {
        status?: string;
        deviceID?: string;
        page: number;
        limit: number;
        search?: string;
        dateFrom?: string;
        dateTo?: string;
    }): Promise<{
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        results: WablasReportEntity[];
    }>;
}
