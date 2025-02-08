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
exports.DBBackupController = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const db_backup_service_1 = require("./db-backup.service");
const platform_express_1 = require("@nestjs/platform-express");
const roles_decorator_1 = require("../../utils/roles/decorator/roles.decorator");
const roles_enum_1 = require("../../utils/roles/enum/roles.enum");
const auth_guard_1 = require("../../module/auth/auth.guard");
const roles_guard_1 = require("../../utils/roles/roles.guard");
const schedule_1 = require("@nestjs/schedule");
let DBBackupController = class DBBackupController {
    constructor(dbBackupService) {
        this.dbBackupService = dbBackupService;
        this.backupsDir = this.dbBackupService.backupsDir;
    }
    async displayBackupFiles() {
        try {
            const files = await this.dbBackupService.getBackupFiles();
            return { files };
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async downloadBackupFile(backupfile, res) {
        try {
            const filePath = this.dbBackupService.getBackupFilePath(backupfile);
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
    async createBackup() {
        this.weeklyBackup();
        return { message: 'Backup created successfully' };
    }
    async renameBackupFile(body) {
        const { oldName, newName } = body;
        if (!oldName || !newName) {
            throw new common_1.BadRequestException('Los nombres de archivo son obligatorios');
        }
        try {
            const oldPath = path.join(this.backupsDir, oldName);
            const newPath = path.join(this.backupsDir, newName);
            if (!fs.existsSync(oldPath)) {
                throw new common_1.BadRequestException('El archivo no existe');
            }
            fs.renameSync(oldPath, newPath);
            return { message: `Archivo renombrado de ${oldName} a ${newName}` };
        }
        catch (error) {
            throw new common_1.BadRequestException(`Error al renombrar el archivo: ${error.message}`);
        }
    }
    async restoreFileBackup(backupfile, res) {
        try {
            const result = await this.dbBackupService.restoreDatabaseFromBackup(backupfile);
            return res.json({ message: 'Database restored successfully', result });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async deleteBackupFile(file, res) {
        try {
            const result = await this.dbBackupService.deleteBackupFile(file);
            return res
                .status(200)
                .json({ message: `File ${file} deleted successfully`, result });
        }
        catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    async weeklyBackup() {
        console.log('Ejecutando respaldo de la base de datos...');
        const dbType = process.env.DB_TYPE || 'postgres';
        try {
            let result;
            if (dbType === 'mysql') {
                result = await this.dbBackupService.backupMySQLDatabase();
            }
            else if (dbType === 'postgres') {
                result = await this.dbBackupService.backupPostgresDatabase();
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
    async uploadBackupFile(file, res) {
        try {
            if (!fs.existsSync(this.backupsDir)) {
                fs.mkdirSync(this.backupsDir);
            }
            let filePath = path.join(this.backupsDir, file.originalname);
            let fileExtension = path.extname(file.originalname);
            let baseName = path.basename(file.originalname, fileExtension);
            let counter = 1;
            while (fs.existsSync(filePath)) {
                filePath = path.join(this.backupsDir, `${baseName}(${counter})${fileExtension}`);
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
    async backupPostgresDatabase() {
        try {
            const result = await this.dbBackupService.backupPostgresDatabase();
            return { message: result };
        }
        catch (error) {
            return { error: error.message };
        }
    }
    async backupMySQLDatabase() {
        try {
            const result = await this.dbBackupService.backupMySQLDatabase();
            return { message: result };
        }
        catch (error) {
            return { error: error.message };
        }
    }
};
exports.DBBackupController = DBBackupController;
__decorate([
    (0, common_1.Get)('getAllBackups'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DBBackupController.prototype, "displayBackupFiles", null);
__decorate([
    (0, common_1.Get)('download/:backupfile'),
    __param(0, (0, common_1.Param)('backupfile')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DBBackupController.prototype, "downloadBackupFile", null);
__decorate([
    (0, common_1.Post)('createBackup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DBBackupController.prototype, "createBackup", null);
__decorate([
    (0, common_1.Patch)('rename_backup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DBBackupController.prototype, "renameBackupFile", null);
__decorate([
    (0, common_1.Put)('restore/:backupfile'),
    __param(0, (0, common_1.Param)('backupfile')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DBBackupController.prototype, "restoreFileBackup", null);
__decorate([
    (0, common_1.Delete)('delete/:file'),
    __param(0, (0, common_1.Param)('file')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DBBackupController.prototype, "deleteBackupFile", null);
__decorate([
    (0, schedule_1.Cron)('0 3 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DBBackupController.prototype, "weeklyBackup", null);
__decorate([
    (0, common_1.Post)('upload_backup'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DBBackupController.prototype, "uploadBackupFile", null);
__decorate([
    (0, common_1.Post)('/createBackup/postgres'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DBBackupController.prototype, "backupPostgresDatabase", null);
__decorate([
    (0, common_1.Post)('/createBackup/mysql'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DBBackupController.prototype, "backupMySQLDatabase", null);
exports.DBBackupController = DBBackupController = __decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('dbBackup'),
    __metadata("design:paramtypes", [db_backup_service_1.DBBackupService])
], DBBackupController);
//# sourceMappingURL=db-backup.controller.js.map