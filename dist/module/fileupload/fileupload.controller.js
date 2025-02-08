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
exports.FileuploadController = void 0;
const common_1 = require("@nestjs/common");
const fileupload_service_1 = require("./fileupload.service");
const platform_express_1 = require("@nestjs/platform-express");
const path = require("path");
const fs = require("fs");
let FileuploadController = class FileuploadController {
    constructor(fileuploadService) {
        this.fileuploadService = fileuploadService;
    }
    async createUser(profileImage, body, res) {
        const { name, email } = body;
        if (!profileImage) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: 'Se requiere una imagen de perfil.',
            });
        }
        const uploadDir = path.join(__dirname, '../../../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        const uniqueSuffix = new Date()
            .toISOString()
            .replace(/[:.\-TZ]/g, '')
            .slice(2, -3);
        const sanitizedFileName = profileImage.originalname.replace(/\s+/g, '_');
        const newFileName = `${uniqueSuffix}-${sanitizedFileName}`;
        const newFilePath = path.join(uploadDir, newFileName);
        fs.renameSync(profileImage.path, newFilePath);
        console.log('newFilePath', {
            name,
            email,
            profileImage: newFileName,
        });
        return res.status(common_1.HttpStatus.CREATED).json({
            message: 'Usuario creado correctamente',
            user: {
                name,
                email,
                profileImage: newFileName,
            },
        });
    }
    uploadSingle(file) {
        console.log('file', file);
        return {
            message: 'File uploaded successfully',
            filename: file.filename,
        };
    }
    uploadMultiple(files) {
        console.log('Archivos recibidos:', files);
        if (!files || files.length === 0) {
            return { message: 'No se recibieron archivos' };
        }
        return {
            message: 'Archivos subidos correctamente',
            files: files.map((file) => file.filename),
        };
    }
    async listFiles(res) {
        const uploadDir = path.join(__dirname, '../../../uploads');
        if (!fs.existsSync(uploadDir)) {
            throw new common_1.NotFoundException('La carpeta de archivos no existe');
        }
        const files = fs.readdirSync(uploadDir);
        if (files.length === 0) {
            return res.status(common_1.HttpStatus.OK).json({
                message: 'No se encontraron archivos',
                files: [],
            });
        }
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Archivos listados correctamente',
            files,
        });
    }
    async updateFile(file, filename, res) {
        const uploadDir = path.join(__dirname, '../../../uploads');
        const filePath = path.join(uploadDir, filename);
        if (fs.existsSync(filePath)) {
            const backupFilePath = path.join(uploadDir, filename.replace(/\.(\w+)$/, '-backup.$1'));
            fs.renameSync(filePath, backupFilePath);
        }
        else {
            throw new common_1.NotFoundException(`El archivo ${filename} no fue encontrado`);
        }
        const uniqueSuffix = new Date()
            .toISOString()
            .replace(/[:.\-TZ]/g, '')
            .slice(2, -3);
        const newFilename = filename.replace(/\s+/g, '_');
        const newFilePath = path.join(uploadDir, newFilename);
        fs.renameSync(file.path, newFilePath);
        const backupFilePath = path.join(uploadDir, filename.replace(/\.(\w+)$/, '-backup.$1'));
        if (fs.existsSync(backupFilePath)) {
            fs.unlinkSync(backupFilePath);
        }
        return res.status(common_1.HttpStatus.OK).json({
            message: 'Archivo actualizado correctamente',
            filename: newFilename,
        });
    }
    async deleteFile(filename, res) {
        const filePath = path.join(__dirname, '../../../uploads', filename);
        if (!fs.existsSync(filePath)) {
            throw new common_1.NotFoundException(`El archivo ${filename} no fue encontrado`);
        }
        fs.unlinkSync(filePath);
        return res.status(common_1.HttpStatus.OK).json({
            message: `Archivo ${filename} eliminado correctamente`,
        });
    }
};
exports.FileuploadController = FileuploadController;
__decorate([
    (0, common_1.Post)('profileImage'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('profileImage')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], FileuploadController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('single'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FileuploadController.prototype, "uploadSingle", null);
__decorate([
    (0, common_1.Post)('multiple'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', 10)),
    __param(0, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], FileuploadController.prototype, "uploadMultiple", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FileuploadController.prototype, "listFiles", null);
__decorate([
    (0, common_1.Post)('update/:filename'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('filename')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], FileuploadController.prototype, "updateFile", null);
__decorate([
    (0, common_1.Delete)('delete/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileuploadController.prototype, "deleteFile", null);
exports.FileuploadController = FileuploadController = __decorate([
    (0, common_1.Controller)('fileupload'),
    __metadata("design:paramtypes", [fileupload_service_1.FileuploadService])
], FileuploadController);
//# sourceMappingURL=fileupload.controller.js.map