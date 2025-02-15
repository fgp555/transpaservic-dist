import { Response } from 'express';
import { BackupDBService } from './backup-db.service';
export declare class BackupDBController {
    private readonly backupService;
    constructor(backupService: BackupDBService);
    weeklyBackup(): Promise<void>;
    createBackup(): Promise<void>;
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
    displayBackupFiles(): Promise<{
        files: string[];
        error?: undefined;
    } | {
        error: any;
        files?: undefined;
    }>;
    downloadBackupFile(backupfile: string, res: Response): Promise<void>;
    restoreFileBackup(backupfile: string, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteBackupFile(file: string, res: Response): Promise<Response<any, Record<string, any>>>;
    uploadBackupFile(file: Express.Multer.File, res: Response): Promise<Response<any, Record<string, any>>>;
}
