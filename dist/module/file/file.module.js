"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileModule = void 0;
const common_1 = require("@nestjs/common");
const file_controller_1 = require("./file.controller");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const fileName_1 = require("./utils/fileName");
const uploadPath_1 = require("./utils/uploadPath");
const file_backup_controller_1 = require("./file-backup.controller");
let FileModule = class FileModule {
};
exports.FileModule = FileModule;
exports.FileModule = FileModule = __decorate([
    (0, common_1.Module)({
        imports: [
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: (req, file, cb) => {
                        cb(null, (0, uploadPath_1.getUploadFolder)('file'));
                    },
                    filename: (req, file, cb) => {
                        const sanitizedFileName = (0, fileName_1.sanitizeFileName)(file.originalname);
                        const timestamp = (0, fileName_1.generateTimestamp)();
                        cb(null, `${timestamp}-${(0, fileName_1.getStartChars)(sanitizedFileName)}`);
                    },
                }),
            }),
        ],
        controllers: [file_controller_1.FileController, file_backup_controller_1.FileBackupController],
        exports: [platform_express_1.MulterModule],
    })
], FileModule);
//# sourceMappingURL=file.module.js.map