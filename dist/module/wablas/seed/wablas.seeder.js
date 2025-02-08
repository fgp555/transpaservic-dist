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
exports.WablasSeeder = void 0;
const common_1 = require("@nestjs/common");
const wablas_service_1 = require("../wablas.service");
let WablasSeeder = class WablasSeeder {
    constructor(wablasService) {
        this.wablasService = wablasService;
    }
    async seed() {
        console.log('process.env.WABLAS_TOKEN', process.env.WABLAS_TOKEN);
        const data = {
            deviceId: '8542Q5',
            deviceName: 'TRANSPASERVIC',
            whatsappNumber: '573229650957',
            domain: 'https://texas.wablas.com',
            apiKeyToken: process.env.WABLAS_TOKEN,
            secretKey: 'LMhRywB3',
        };
        await this.wablasService.create(data);
        console.log('Wablas seed created');
    }
};
exports.WablasSeeder = WablasSeeder;
exports.WablasSeeder = WablasSeeder = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [wablas_service_1.WablasService])
], WablasSeeder);
//# sourceMappingURL=wablas.seeder.js.map