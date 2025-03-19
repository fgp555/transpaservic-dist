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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const platform_express_1 = require("@nestjs/platform-express");
const roles_decorator_1 = require("../../utils/roles/decorator/roles.decorator");
const roles_enum_1 = require("../../utils/roles/enum/roles.enum");
const auth_guard_1 = require("../auth/auth.guard");
const roles_guard_1 = require("../../utils/roles/roles.guard");
const schedule_1 = require("@nestjs/schedule");
const path = require("path");
const uploadPath_1 = require("../file/utils/uploadPath");
const multer_1 = require("multer");
const fileName_1 = require("../file/utils/fileName");
const order_save_service_1 = require("./order-save.service");
let OrderController = class OrderController {
    constructor(orderService, orderSaveService) {
        this.orderService = orderService;
        this.orderSaveService = orderSaveService;
    }
    async orderHistoryAll() {
        return this.orderService.orderHistoryAll();
    }
    async expireOldOrders() {
        await this.orderService.expireOrders();
    }
    approveOrder(file, body) {
        console.log('body:', body);
        console.log('file:', file);
        const filePath = path.join((0, uploadPath_1.getUploadFolder)('order'), file.filename);
        return this.orderService.approveOrder(body, filePath);
    }
    approvalTravelDate(body) {
        return this.orderService.approvalTravelDate(body);
    }
    deleteTicketImage(orderNumber) {
        return this.orderService.deleteTicketImage(orderNumber);
    }
    async saveArrayData(data, sendToWhatsApp) {
        if (!Array.isArray(data) || data.length === 0) {
            throw new common_1.HttpException('El dato proporcionado debe ser un array no vacío', common_1.HttpStatus.BAD_REQUEST);
        }
        return this.orderSaveService.saveArrayData(data, sendToWhatsApp);
    }
    async checkAndUpdateExpirationDates() {
        return this.orderService.updateExpirationDates();
    }
    async checkIfExists(orderNumber, operatorContract) {
        if (!orderNumber && !operatorContract) {
            throw new common_1.BadRequestException('Debes proporcionar al menos orderNumber o operatorContract.');
        }
        return this.orderService.checkIfExists(orderNumber, operatorContract);
    }
    create(createOrderDto) {
        return this.orderSaveService.create(createOrderDto);
    }
    findAll(status, operator, page, limit, search, dateFrom, dateTo) {
        return this.orderService.findAll({
            status,
            operator,
            page,
            limit,
            search,
            dateFrom,
            dateTo,
        });
    }
    statusEnum() {
        return this.orderService.statusEnum();
    }
    findOne(id) {
        return this.orderService.findOne(+id);
    }
    findManyByPhone(userPhone) {
        return this.orderService.findManyByPhone(userPhone);
    }
    findOneOrderNumber(orderNumber) {
        return this.orderService.orderNumber(orderNumber);
    }
    createBackTicket(orderNumber, body) {
        return this.orderService.createBackTicket(orderNumber, body);
    }
    update(id, updateOrderDto) {
        return this.orderService.update(+id, updateOrderDto);
    }
    deleteBackTicket(id) {
        return this.orderService.deleteBackTicket(+id);
    }
    remove(id) {
        return this.orderService.remove(+id);
    }
};
exports.OrderController = OrderController;
__decorate([
    (0, common_1.Get)('orderHistoryAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "orderHistoryAll", null);
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    (0, common_1.Patch)('expireOldOrders'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "expireOldOrders", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.User, roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin, roles_enum_1.RolesEnum.Collaborator),
    (0, common_1.Post)('approve'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                cb(null, (0, uploadPath_1.getUploadFolder)('order'));
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
    __metadata("design:returntype", void 0)
], OrderController.prototype, "approveOrder", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.User, roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin, roles_enum_1.RolesEnum.Collaborator),
    (0, common_1.Post)('approvalTravelDate'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "approvalTravelDate", null);
__decorate([
    (0, common_1.Delete)('deleteTicketImage/:orderNumber'),
    __param(0, (0, common_1.Param)('orderNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "deleteTicketImage", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin, roles_enum_1.RolesEnum.Collaborator),
    (0, common_1.Post)('save-array-data'),
    __param(0, (0, common_1.Body)('data')),
    __param(1, (0, common_1.Body)('sendToWhatsApp')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Boolean]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "saveArrayData", null);
__decorate([
    (0, common_1.Patch)('check-expiration'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "checkAndUpdateExpirationDates", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.User, roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin, roles_enum_1.RolesEnum.Collaborator),
    (0, common_1.Get)('exists'),
    __param(0, (0, common_1.Query)('orderNumber')),
    __param(1, (0, common_1.Query)('operatorContract')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "checkIfExists", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "create", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.User, roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin, roles_enum_1.RolesEnum.Collaborator),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __param(1, (0, common_1.Query)('operator')),
    __param(2, (0, common_1.Query)('page')),
    __param(3, (0, common_1.Query)('limit')),
    __param(4, (0, common_1.Query)('search')),
    __param(5, (0, common_1.Query)('dateFrom')),
    __param(6, (0, common_1.Query)('dateTo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, Number, String, String, String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.User, roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin, roles_enum_1.RolesEnum.Collaborator),
    (0, common_1.Get)('status/enum'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "statusEnum", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.User, roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin, roles_enum_1.RolesEnum.Collaborator),
    (0, common_1.Get)('findOne/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.User, roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin, roles_enum_1.RolesEnum.Collaborator),
    (0, common_1.Get)('findManyByPhone/:userPhone'),
    __param(0, (0, common_1.Param)('userPhone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findManyByPhone", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.User, roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin, roles_enum_1.RolesEnum.Collaborator),
    (0, common_1.Get)('findOneOrderNumber/:orderNumber'),
    __param(0, (0, common_1.Param)('orderNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findOneOrderNumber", null);
__decorate([
    (0, common_1.Patch)('createBackTicket/:orderNumber'),
    __param(0, (0, common_1.Param)('orderNumber')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "createBackTicket", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('deleteBackTicket/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "deleteBackTicket", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "remove", null);
exports.OrderController = OrderController = __decorate([
    (0, roles_decorator_1.Roles)(roles_enum_1.RolesEnum.Admin, roles_enum_1.RolesEnum.SuperAdmin, roles_enum_1.RolesEnum.Collaborator),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        order_save_service_1.OrderSaveService])
], OrderController);
//# sourceMappingURL=order.controller.js.map