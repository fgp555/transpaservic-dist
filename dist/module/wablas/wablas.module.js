"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WablasModule = void 0;
const common_1 = require("@nestjs/common");
const wablas_service_1 = require("./wablas.service");
const wablas_controller_1 = require("./wablas.controller");
const typeorm_1 = require("@nestjs/typeorm");
const wabla_entity_1 = require("./entities/wabla.entity");
const wablas_seeder_1 = require("./seed/wablas.seeder");
let WablasModule = class WablasModule {
};
exports.WablasModule = WablasModule;
exports.WablasModule = WablasModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([wabla_entity_1.WablaEntity])],
        controllers: [wablas_controller_1.WablasController],
        providers: [wablas_service_1.WablasService, wablas_seeder_1.WablasSeeder],
        exports: [wablas_seeder_1.WablasSeeder, wablas_service_1.WablasService],
    })
], WablasModule);
//# sourceMappingURL=wablas.module.js.map