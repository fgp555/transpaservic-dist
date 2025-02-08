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
exports.SettingSeed = void 0;
const common_1 = require("@nestjs/common");
const setting_service_1 = require("../setting.service");
let SettingSeed = class SettingSeed {
    constructor(settingService) {
        this.settingService = settingService;
    }
    async seed() {
        const dataSeed = [
            {
                key: 'whatsapp_message_template',
                value: '*Estimado Usuario {{firstName}}*%0A%0ANos complace informarle que sus tiquetes de viaje han sido emitidos.%0A%0APara mayor información, puede comunicarse con el operador a través de los siguientes canales:%0A%0APBX: {{phoneOperator}}%0ATaquillas en la terminal de operador _{{nameOperator}}_%0ASitio web: {{websiteOperator}}%0A%0A¡Le deseamos un excelente viaje!%0A%0A{{newDate}}',
            },
        ];
        for (const data of dataSeed) {
            const setting = await this.settingService.getSetting(data.key);
            if (!setting) {
                await this.settingService.setSetting(data.key, data.value);
            }
        }
        console.log('Setting seed created');
    }
};
exports.SettingSeed = SettingSeed;
exports.SettingSeed = SettingSeed = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [setting_service_1.SettingsService])
], SettingSeed);
//# sourceMappingURL=setting.seed.js.map