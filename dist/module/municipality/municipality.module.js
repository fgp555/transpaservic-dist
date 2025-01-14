"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MunicipalityModule = void 0;
const common_1 = require("@nestjs/common");
const municipality_service_1 = require("./municipality.service");
const municipality_controller_1 = require("./municipality.controller");
const typeorm_1 = require("@nestjs/typeorm");
const municipality_entity_1 = require("./entities/municipality.entity");
const municipality_seeder_1 = require("./seed/municipality.seeder");
let MunicipalityModule = class MunicipalityModule {
};
exports.MunicipalityModule = MunicipalityModule;
exports.MunicipalityModule = MunicipalityModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([municipality_entity_1.MunicipalityEntity])],
        controllers: [municipality_controller_1.MunicipalityController],
        providers: [municipality_service_1.MunicipalityService, municipality_seeder_1.MunicipalitySeederService],
    })
], MunicipalityModule);
//# sourceMappingURL=municipality.module.js.map