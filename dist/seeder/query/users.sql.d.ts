import { DataSource } from 'typeorm';
export declare class UsersSeederServiceSQL {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    seed(): Promise<void>;
}
