"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackupDBController = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const backup_db_service_1 = require("./backup-db.service");
const platform_express_1 = require("@nestjs/platform-express");
const schedule_1 = require("@nestjs/schedule");
let BackupDBController = class BackupDBController {
    constructor(backupService) {
        this.backupService = backupService;
    }
    async weeklyBackup() {
        console.log('Ejecutando respaldo de la base de datos...');
        const dbType = process.env.DB_TYPE || 'postgres';
        try {
            let result;
            if (dbType === 'mysql') {
                result = await this.backupService.backupMySQLDatabase();
            }
            else if (dbType === 'postgres') {
                result = await this.backupService.backupPostgresDatabase();
            }
            else {
                throw new Error('Unsupported database type');
            }
            const fileName = result.backupFile;
            console.log(`Respaldo exitoso: ${fileName}`);
        }
        catch (error) {
            console.error('Error al hacer el respaldo:', error.message);
        }
    }
    async createBackup() {
        return this.weeklyBackup();
    }
    async backupPostgresDatabase() {
        try {
            const result = await this.backupService.backupPostgresDatabase();
            return { message: result };
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async backupMySQLDatabase() {
        try {
            const result = await this.backupService.backupMySQLDatabase();
            return { message: result };
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async displayBackupFiles() {
        try {
            const files = await this.backupService.getBackupFiles();
            return { files };
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async downloadBackupFile(backupfile, res) {
        try {
            const filePath = this.backupService.getBackupFilePath(backupfile);
            res.download(filePath, (err) => {
                if (err) {
                    res.status(500).send({ error: 'Error downloading file' });
                }
            });
        }
        catch (error) {
            res.status(404).send({ error: error.message });
        }
    }
    async restoreFileBackup(backupfile, res) {
        try {
            const result = await this.backupService.restoreDatabaseFromBackup(backupfile);
            return res.json({ message: 'Database restored successfully', result });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async deleteBackupFile(file, res) {
        try {
            const result = await this.backupService.deleteBackupFile(file);
            return res
                .status(200)
                .json({ message: `File ${file} deleted successfully`, result });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async uploadBackupFile(file, res) {
        try {
            const uploadDir = path.join(__dirname, '../../../backups');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir);
            }
            let filePath = path.join(uploadDir, file.originalname);
            let fileExtension = path.extname(file.originalname);
            let baseName = path.basename(file.originalname, fileExtension);
            let counter = 1;
            while (fs.existsSync(filePath)) {
                filePath = path.join(uploadDir, `${baseName}(${counter})${fileExtension}`);
                counter++;
            }
            console.log('File will be saved to:', filePath);
            fs.writeFileSync(filePath, file.buffer);
            console.log('File saved successfully.');
            return res.json({
                message: 'File uploaded successfully',
                file: filePath,
            });
        }
        catch (error) {
            console.error('Error during file upload:', error);
            return res.status(500).json({ error: error.message });
        }
    }
};
exports.BackupDBController = BackupDBController;
__decorate([
    (0, schedule_1.Cron)('0 3 * * 0'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BackupDBController.prototype, "weeklyBackup", null);
__decorate([
    (0, common_1.Post)('create_backup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BackupDBController.prototype, "createBackup", null);
__decorate([
    (0, common_1.Post)('/create_backup/postgres'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BackupDBController.prototype, "backupPostgresDatabase", null);
__decorate([
    (0, common_1.Post)('/create_backup/mysql'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BackupDBController.prototype, "backupMySQLDatabase", null);
__decorate([
    (0, common_1.Post)('display_backups_files'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BackupDBController.prototype, "displayBackupFiles", null);
__decorate([
    (0, common_1.Get)('download/:backupfile'),
    __param(0, (0, common_1.Param)('backupfile')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BackupDBController.prototype, "downloadBackupFile", null);
__decorate([
    (0, common_1.Post)('restore/:backupfile'),
    __param(0, (0, common_1.Param)('backupfile')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BackupDBController.prototype, "restoreFileBackup", null);
__decorate([
    (0, common_1.Delete)('delete/:file'),
    __param(0, (0, common_1.Param)('file')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BackupDBController.prototype, "deleteBackupFile", null);
__decorate([
    (0, common_1.Post)('upload_backup'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BackupDBController.prototype, "uploadBackupFile", null);
exports.BackupDBController = BackupDBController = __decorate([
    (0, common_1.Controller)('database'),
    __metadata("design:paramtypes", [backup_db_service_1.BackupDBService])
], BackupDBController);
//# sourceMappingURL=backup-db.controller.js.map