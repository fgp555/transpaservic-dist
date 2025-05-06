import { SqlService } from './sql.service';
export declare class SqlController {
    private readonly sqlService;
    constructor(sqlService: SqlService);
    runSql(query: string): Promise<{
        result: any;
    }>;
}
