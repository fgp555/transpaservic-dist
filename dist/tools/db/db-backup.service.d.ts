import { DataSource } from 'typeorm';
export declare class DBBackupService {
    private readonly dataSource;
    readonly backupsDir: string;
    constructor(dataSource: DataSource);
    backupPostgresDatabase(): Promise<{
        backupFile: string;
    }>;
    backupMySQLDatabase: () => Promise<unknown>;
    cleanupOldBackups(backupDir: string): void;
    getBackupFiles(): Promise<string[]>;
    getBackupFilePath(backupFile: string): string;
    deleteBackupFile(file: string): Promise<boolean>;
    restoreDatabaseFromBackup(backupfile: string): Promise<string>;
    restorePostgresDatabase(filePath: string): Promise<string>;
    restoreMySQLDatabase: (filePath: string) => Promise<string>;
    processUploadedSQLFile(filePath: string): Promise<unknown>;
}
