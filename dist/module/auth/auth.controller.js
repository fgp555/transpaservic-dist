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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("./auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const roles_decorator_1 = require("../../utils/roles/decorator/roles.decorator");
const roles_enum_1 = require("../../utils/roles/enum/roles.enum");
const roles_guard_1 = require("../../utils/roles/roles.guard");
const auth_service_1 = require("./auth.service");
const multer_1 = require("multer");
const uploadPath_1 = require("../file/utils/uploadPath");
const fileName_1 = require("../file/utils/fileName");
const path = require("path");
const signin_auth_dto_1 = require("./dto/signin-auth.dto");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signin(signinDto) {
        return this.authService.signin(signinDto);
    }
    async signup(body, file) {
        console.log('body', body);
        const filePath = file
            ? path.join((0, uploadPath_1.getUploadFolder)('user'), file.filename)
            : null;
        return this.authService.signup(body, filePath);
    }
    async update(file, userId, updateDto, req) {
        const filePath = file
            ? path.join((0, uploadPath_1.getUploadFolder)('user'), file.filename)
            : null;
        return this.authService.update(userId, updateDto, filePath, req.user);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signin_auth_dto_1.SigninDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Post)('signup'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', createMulterConfig('user'))),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.User, roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin, roles_enum_1.RolesEnum.Collaborator),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Patch)('update/:userId'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', createMulterConfig('user'))),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Param)('userId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "update", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
function createMulterConfig(folder) {
    return {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                cb(null, (0, uploadPath_1.getUploadFolder)(folder));
            },
            filename: (req, file, cb) => {
                const sanitizedFileName = (0, fileName_1.sanitizeFileName)(file.originalname);
                const timestamp = (0, fileName_1.generateTimestamp)();
                cb(null, `${timestamp}-${(0, fileName_1.getStartChars)(sanitizedFileName)}`);
            },
        }),
    };
}
//# sourceMappingURL=auth.controller.js.map