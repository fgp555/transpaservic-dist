import { Response } from 'express';
import { DBBackupService } from './db-backup.service';
export declare class DBBackupController {
    private readonly dbBackupService;
    constructor(dbBackupService: DBBackupService);
    private backupsDir;
    displayBackupFiles(): Promise<{
        files: string[];
        error?: undefined;
    } | {
        error: any;
        files?: undefined;
    }>;
    downloadBackupFile(backupfile: string, res: Response): Promise<void>;
    createBackup(): Promise<{
        message: string;
    }>;
    renameBackupFile(body: {
        oldName: string;
        newName: string;
    }): Promise<{
        message: string;
    }>;
    restoreFileBackup(backupfile: string, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteBackupFile(file: string, res: Response): Promise<Response<any, Record<string, any>>>;
    weeklyBackup(): Promise<void>;
    uploadBackupFile(file: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
    backupPostgresDatabase(): Promise<{
        message: {
            backupFile: string;
        };
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
    backupMySQLDatabase(): Promise<{
        message: unknown;
        error?: undefined;
    } | {
        error: any;
        message?: undefined;
    }>;
}
