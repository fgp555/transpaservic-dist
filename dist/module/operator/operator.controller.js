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
exports.OperatorController = void 0;
const common_1 = require("@nestjs/common");
const operator_service_1 = require("./operator.service");
const roles_decorator_1 = require("../../utils/roles/decorator/roles.decorator");
const roles_enum_1 = require("../../utils/roles/enum/roles.enum");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../../utils/roles/roles.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uploadPath_1 = require("../file/utils/uploadPath");
const path = require("path");
const fileName_1 = require("../file/utils/fileName");
let OperatorController = class OperatorController {
    constructor(operatorService) {
        this.operatorService = operatorService;
    }
    async uploadSingle(file, body) {
        const imageFilename = file ? file.filename : null;
        const filePath = path.join((0, uploadPath_1.getUploadFolder)('operator'), file.filename);
        const dataCreate = await this.operatorService.create({
            ...body,
            image: filePath,
        });
        return {
            message: file
                ? 'Archivo cargado exitosamente'
                : 'Operador creado sin imagen',
            dataCreate,
        };
    }
    async findAll(page = 1, limit = 30, search = '') {
        return await this.operatorService.findAll({ page, limit, search });
    }
    findByName(name) {
        if (!name) {
            return this.operatorService.findAllService();
        }
        return this.operatorService.findByName(name);
    }
    findOne(id) {
        return this.operatorService.findOne(+id);
    }
    async update(id, file, body) {
        console.log('body', body);
        const filePath = file
            ? path.join((0, uploadPath_1.getUploadFolder)('operator'), file.filename)
            : null;
        const updatedOperator = await this.operatorService.update(+id, {
            ...body,
            image: filePath || body.image || null,
        });
        return {
            message: file
                ? 'Operador actualizado con nueva imagen'
                : 'Operador actualizado',
            updatedOperator,
        };
    }
    remove(id) {
        return this.operatorService.remove(+id);
    }
};
exports.OperatorController = OperatorController;
__decorate([
    (0, common_1.Post)(''),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                cb(null, (0, uploadPath_1.getUploadFolder)('operator'));
            },
            filename: (req, file, cb) => {
                const sanitizedFileName = (0, fileName_1.sanitizeFileName)(file.originalname);
                const timestamp = (0, fileName_1.generateTimestamp)();
                cb(null, `${timestamp}-${(0, fileName_1.getStartChars)(sanitizedFileName)}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OperatorController.prototype, "uploadSingle", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.User, roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin, roles_enum_1.RolesEnum.Collaborator),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], OperatorController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.User, roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin, roles_enum_1.RolesEnum.Collaborator),
    (0, common_1.Get)('findByName/:name?'),
    __param(0, (0, common_1.Param)('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OperatorController.prototype, "findByName", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.User, roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OperatorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                cb(null, (0, uploadPath_1.getUploadFolder)('operator'));
            },
            filename: (req, file, cb) => {
                const sanitizedFileName = (0, fileName_1.sanitizeFileName)(file.originalname);
                const timestamp = (0, fileName_1.generateTimestamp)();
                cb(null, `${timestamp}-${(0, fileName_1.getStartChars)(sanitizedFileName)}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], OperatorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OperatorController.prototype, "remove", null);
exports.OperatorController = OperatorController = __decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('operator'),
    __metadata("design:paramtypes", [operator_service_1.OperatorService])
], OperatorController);
//# sourceMappingURL=operator.controller.js.map