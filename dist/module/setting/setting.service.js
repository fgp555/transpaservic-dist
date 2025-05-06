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
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const setting_entity_1 = require("./entities/setting.entity");
let SettingsService = class SettingsService {
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
    }
    async getSettingAll() {
        return this.settingsRepository.find();
    }
    async findOne(key) {
        return this.settingsRepository.findOne({ where: { key } });
    }
    async getSettingKey(key) {
        const setting = await this.settingsRepository.findOne({ where: { key } });
        return setting ? setting.value : null;
    }
    async setSetting(key, type, value) {
        let valueToSave = String(value);
        if (type === 'json') {
            try {
                const parsed = typeof value === 'string' ? JSON.parse(value) : value;
                valueToSave = JSON.stringify(parsed, null, 2);
            }
            catch (e) {
                throw new Error(`El valor de tipo JSON es inválido para "${key}"`);
            }
        }
        await this.settingsRepository.save({ key, type, value: valueToSave });
    }
    async updateSetting(key, value) {
        const setting = await this.settingsRepository.findOne({ where: { key } });
        if (setting) {
            setting.value =
                typeof value === 'object'
                    ? JSON.stringify(value, null, 2)
                    : String(value);
            await this.settingsRepository.save(setting);
        }
    }
    async deleteSetting(key) {
        await this.settingsRepository.delete({ key });
    }
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(setting_entity_1.SettingEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SettingsService);
//# sourceMappingURL=setting.service.js.map