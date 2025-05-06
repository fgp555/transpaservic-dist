import { DataSource } from 'typeorm';
export declare class SqlService {
    private dataSource;
    constructor(dataSource: DataSource);
    executeRawQuery(sql: string): Promise<any>;
}
