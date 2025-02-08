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
exports.OperatorSeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const operator_entity_1 = require("../entities/operator.entity");
let OperatorSeederService = class OperatorSeederService {
    constructor(operatorRepository) {
        this.operatorRepository = operatorRepository;
    }
    async seed() {
        const dataDemo = [
            {
                name: 'COPETRAN',
            },
            {
                name: 'COOTRANSUNIDOS',
            },
            {
                name: 'COTAXI',
            },
            {
                name: 'COOTRANSMAGDALENA',
            },
            {
                name: 'TRANSSANDER',
            },
            {
                name: 'CONCORDE',
            },
            {
                name: 'TRANSRICAURTE',
            },
            {
                name: 'CATATUMBO',
            },
            {
                name: 'COTRANS',
            },
            {
                name: 'SOTRACOR',
            },
            {
                name: 'TRAESCOR',
            },
            {
                name: 'BALLEGOM',
            },
            {
                name: 'COTRANSAR',
            },
            {
                name: 'COOTRANSMOR',
            },
            {
                name: 'SOTRAMAGDALENA',
            },
            {
                name: 'COTRASANGIL',
            },
            {
                name: 'COTRASARAVITA',
            },
            {
                name: 'COTRANSTAME',
            },
            {
                name: 'COTRANAL',
            },
            {
                name: 'MOTILONES',
            },
            {
                name: 'COOPTMOTILON',
            },
        ];
        for (const operatorData of dataDemo) {
            const existingOperator = await this.operatorRepository.findOne({
                where: { name: operatorData.name },
            });
            if (!existingOperator) {
                const newOperator = this.operatorRepository.create(operatorData);
                await this.operatorRepository.save(newOperator);
                console.log(`Seeded operator: ${operatorData.name}`);
            }
            else {
                console.log(`Operator already exists: ${operatorData.name}`);
            }
        }
    }
};
exports.OperatorSeederService = OperatorSeederService;
exports.OperatorSeederService = OperatorSeederService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(operator_entity_1.OperatorEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OperatorSeederService);
//# sourceMappingURL=operator.seeder.js.map