import { AppService } from './app.service';
import { Response } from 'express';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHtml(res: Response): void;
    build(res: Response): {
        build_dist: {
            stats_modify_time: Date;
            local?: undefined;
            utc?: undefined;
        } | {
            local: string;
            utc: string;
            stats_modify_time?: undefined;
        };
        build_index: {
            stats_modify_time: Date;
            local?: undefined;
            utc?: undefined;
        } | {
            local: string;
            utc: string;
            stats_modify_time?: undefined;
        };
    };
    getVersionBackend(res: Response): {
        version: string;
    };
    getVersionMobile(): {
        version: string;
    };
}
