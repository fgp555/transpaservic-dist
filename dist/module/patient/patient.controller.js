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
exports.PatientController = void 0;
const common_1 = require("@nestjs/common");
const patient_service_1 = require("./patient.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uploadPath_1 = require("../file/utils/uploadPath");
const fileName_1 = require("../file/utils/fileName");
const path = require("path");
let PatientController = class PatientController {
    constructor(patientService) {
        this.patientService = patientService;
    }
    async create(createTempDto, files) {
        const front = files.find((f) => f.fieldname === 'idCardImageFront');
        const back = files.find((f) => f.fieldname === 'idCardImageBack');
        if (front) {
            createTempDto.idCardImageFront = path.join((0, uploadPath_1.getUploadFolder)('patient'), front.filename);
        }
        if (back) {
            createTempDto.idCardImageBack = path.join((0, uploadPath_1.getUploadFolder)('patient'), back.filename);
        }
        return await this.patientService.create(createTempDto);
    }
    async findAll() {
        return await this.patientService.findAll();
    }
    async checkImgExist() {
    }
    findOneById(id) {
        return this.patientService.findOneById(+id);
    }
    findOneByDNI(dni) {
    }
    update(id, updateTempDto) {
        return this.patientService.update(+id, updateTempDto);
    }
    async registerTravel(id, updateTempDto) {
        return this.patientService.registerTravel(id, updateTempDto);
    }
    remove(id) {
        return this.patientService.remove(+id);
    }
};
exports.PatientController = PatientController;
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.AnyFilesInterceptor)({
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                cb(null, (0, uploadPath_1.getUploadFolder)('patient'));
            },
            filename: (req, file, cb) => {
                const sanitizedFileName = (0, fileName_1.sanitizeFileName)(file.originalname);
                const timestamp = (0, fileName_1.generateTimestamp)();
                cb(null, `${timestamp}-${(0, fileName_1.getStartChars)(sanitizedFileName)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Array]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('findAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('checkImgExist'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "checkImgExist", null);
__decorate([
    (0, common_1.Get)('findOneById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "findOneById", null);
__decorate([
    (0, common_1.Get)('findOneByDNI/:dni'),
    __param(0, (0, common_1.Param)('dni')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "findOneByDNI", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('registerTravel/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PatientController.prototype, "registerTravel", null);
__decorate([
    (0, common_1.Delete)('remove/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PatientController.prototype, "remove", null);
exports.PatientController = PatientController = __decorate([
    (0, common_1.Controller)('patient'),
    __metadata("design:paramtypes", [patient_service_1.PatientService])
], PatientController);
//# sourceMappingURL=patient.controller.js.map