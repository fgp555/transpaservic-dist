import { DataSource } from 'typeorm';
export declare class OperatorSeederServiceSQL {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    seed(): Promise<void>;
}
