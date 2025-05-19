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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaConfigController = void 0;
const common_1 = require("@nestjs/common");
let WaConfigController = class WaConfigController {
    constructor() {
        this.apiBaseUrl = process.env.WHATSAPP_API_BASE_URL;
        this.token = process.env.WHATSAPP_TOKEN;
        this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    }
    async getPhoneNumberStatus() {
        const url = new URL(`${this.apiBaseUrl}/${this.phoneNumberId}`);
        url.searchParams.set('fields', 'verified_name,code_verification_status,quality_rating');
        url.searchParams.set('access_token', this.token);
        try {
            const response = await fetch(url.toString(), {
                method: 'GET',
            });
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response from WhatsApp API:', errorData);
                throw new common_1.HttpException('Error fetching WhatsApp phone number status', response.status);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error('Fetch error:', error);
            throw new common_1.HttpException('Failed to fetch WhatsApp phone number status', common_1.HttpStatus.BAD_GATEWAY);
        }
    }
};
exports.WaConfigController = WaConfigController;
__decorate([
    (0, common_1.Get)('status'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WaConfigController.prototype, "getPhoneNumberStatus", null);
exports.WaConfigController = WaConfigController = __decorate([
    (0, common_1.Controller)('whatsapp/config'),
    __metadata("design:paramtypes", [])
], WaConfigController);
//# sourceMappingURL=wa-config.controller.js.map