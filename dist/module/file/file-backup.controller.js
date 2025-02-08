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
exports.FileBackupController = void 0;
const common_1 = require("@nestjs/common");
const path = require("path");
const fs = require("fs");
const AdmZip = require("adm-zip");
let FileBackupController = class FileBackupController {
    constructor() {
        this.uploadsDir = path.join(__dirname, '../../../uploads');
        this.backupFileDir = path.join(__dirname, '../../../backups/file/');
        this.backupZipDir = path.join(__dirname, '../../../backups/zip/');
        this.zipBackupPath = path.join(this.backupZipDir, 'backup.zip');
        if (!fs.existsSync(this.backupFileDir)) {
            fs.mkdirSync(this.backupFileDir, { recursive: true });
        }
        if (!fs.existsSync(this.backupZipDir)) {
            fs.mkdirSync(this.backupZipDir, { recursive: true });
        }
    }
    copyFiles(sourceRoot, destRoot) {
        if (!fs.existsSync(sourceRoot)) {
            throw new common_1.NotFoundException(`El directorio ${sourceRoot} no existe.`);
        }
        const directories = fs.readdirSync(sourceRoot).filter((dir) => {
            return fs.statSync(path.join(sourceRoot, dir)).isDirectory();
        });
        directories.forEach((dir) => {
            const sourceDir = path.join(sourceRoot, dir);
            const destDir = path.join(destRoot, dir);
            if (!fs.existsSync(destDir)) {
                fs.mkdirSync(destDir, { recursive: true });
            }
            fs.readdirSync(sourceDir).forEach((file) => {
                const sourceFile = path.join(sourceDir, file);
                const destFile = path.join(destDir, file);
                if (!fs.existsSync(destFile) || sourceRoot === this.uploadsDir) {
                    fs.copyFileSync(sourceFile, destFile);
                }
            });
        });
    }
    async backupFiles(res) {
        this.copyFiles(this.uploadsDir, this.backupFileDir);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Backup realizado correctamente.',
            backupLocation: this.backupFileDir,
        });
    }
    async restoreFiles(res) {
        this.copyFiles(this.backupFileDir, this.uploadsDir);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Restauración completada con éxito.',
            restoreLocation: this.uploadsDir,
        });
    }
    async listBackupsZip(res) {
        if (!fs.existsSync(this.backupZipDir)) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                message: 'No se encontró la carpeta de backups.',
            });
        }
        const files = fs.readdirSync(this.backupZipDir).map((file) => {
            const filePath = path.join(this.backupZipDir, file);
            const stats = fs.statSync(filePath);
            return {
                name: file,
                size: stats.size,
                createdAt: stats.birthtime,
            };
        });
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Lista de backups obtenida correctamente.',
            backups: files,
        });
    }
    async listBackups(res) {
        if (!fs.existsSync(this.backupFileDir)) {
            return res.status(common_1.HttpStatus.NOT_FOUND).json({
                message: 'No se encontró la carpeta de backups.',
            });
        }
        const files = fs.readdirSync(this.backupFileDir).map((file) => {
            const filePath = path.join(this.backupFileDir, file);
            const stats = fs.statSync(filePath);
            return {
                name: file,
                size: stats.size,
                createdAt: stats.birthtime,
            };
        });
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Lista de backups obtenida correctamente.',
            backups: files,
        });
    }
    async backupToZip(res) {
        if (!fs.existsSync(this.backupZipDir)) {
            throw new common_1.NotFoundException('La carpeta de backup no existe.');
        }
        const zip = new AdmZip();
        zip.addLocalFolder(this.backupZipDir);
        zip.writeZip(this.zipBackupPath);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Backup comprimido exitosamente.',
            zipPath: this.zipBackupPath,
        });
    }
    async restoreFromZip(res) {
        if (!fs.existsSync(this.zipBackupPath)) {
            throw new common_1.NotFoundException('No se encontró el archivo backup.zip.');
        }
        const zip = new AdmZip(this.zipBackupPath);
        zip.extractAllTo(this.uploadsDir, true);
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Backup restaurado desde ZIP con éxito.',
            restoreLocation: this.uploadsDir,
        });
    }
};
exports.FileBackupController = FileBackupController;
__decorate([
    (0, common_1.Post)('backup'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileBackupController.prototype, "backupFiles", null);
__decorate([
    (0, common_1.Post)('restore'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileBackupController.prototype, "restoreFiles", null);
__decorate([
    (0, common_1.Get)('list-backup-zip'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileBackupController.prototype, "listBackupsZip", null);
__decorate([
    (0, common_1.Get)('list-backup'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileBackupController.prototype, "listBackups", null);
__decorate([
    (0, common_1.Post)('backup-to-zip'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileBackupController.prototype, "backupToZip", null);
__decorate([
    (0, common_1.Post)('restore-to-zip'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileBackupController.prototype, "restoreFromZip", null);
exports.FileBackupController = FileBackupController = __decorate([
    (0, common_1.Controller)('fileBackup'),
    __metadata("design:paramtypes", [])
], FileBackupController);
//# sourceMappingURL=file-backup.controller.js.map