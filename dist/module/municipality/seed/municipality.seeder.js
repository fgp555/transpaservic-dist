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
exports.MunicipalitySeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const municipality_entity_1 = require("../entities/municipality.entity");
const dataDemo = require("./dataBasic.json");
let MunicipalitySeederService = class MunicipalitySeederService {
    constructor(municipalityRepository) {
        this.municipalityRepository = municipalityRepository;
        console.log('MunicipalitySeederService');
        this.seed();
    }
    async seed() {
        console.log('Starting Municipality seed...');
        console.log('dataDemo', dataDemo);
        for (const [department, municipalityName] of dataDemo) {
            const exists = await this.municipalityRepository.findOne({
                where: { name: municipalityName },
            });
            if (!exists) {
                const municipality = this.municipalityRepository.create({
                    name: municipalityName,
                    department: department,
                });
                await this.municipalityRepository.save(municipality);
                console.log(`Inserted: ${municipalityName} in ${department}`);
            }
            else {
                console.log(`Skipped: ${municipalityName} in ${department} (already exists)`);
            }
        }
        console.log('Municipality seed completed.');
    }
};
exports.MunicipalitySeederService = MunicipalitySeederService;
exports.MunicipalitySeederService = MunicipalitySeederService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(municipality_entity_1.MunicipalityEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MunicipalitySeederService);
//# sourceMappingURL=municipality.seeder.js.map