import { Response } from 'express';
export declare class FileBackupController {
    private readonly uploadsDir;
    private readonly backupFileDir;
    private readonly backupZipDir;
    private readonly zipBackupPath;
    constructor();
    private copyFiles;
    backupFiles(res: Response): Promise<Response<any, Record<string, any>>>;
    restoreFiles(res: Response): Promise<Response<any, Record<string, any>>>;
    listBackupsZip(res: Response): Promise<Response<any, Record<string, any>>>;
    listBackups(res: Response): Promise<Response<any, Record<string, any>>>;
    backupToZip(res: Response): Promise<Response<any, Record<string, any>>>;
    restoreFromZip(res: Response): Promise<Response<any, Record<string, any>>>;
}
