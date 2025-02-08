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
                id: 1,
                name: 'COPETRAN',
                whatsapp: '601 5 87 0000',
                email: 'servicioalcliente@copetran.com',
                website: 'https://www.copetran.com/',
                image: 'https://i.postimg.cc/DfcNcm2G/copetran.webp',
            },
            {
                id: 2,
                name: 'COOTRANSUNIDOS',
                whatsapp: null,
                email: null,
                website: null,
                image: 'https://i.postimg.cc/rFFPZcmP/cootransunidos.webp',
            },
            {
                id: 3,
                name: 'COTAXI',
                whatsapp: null,
                email: null,
                website: null,
                image: 'https://i.postimg.cc/138YPHD0/cotaxi.webp',
            },
            {
                id: 4,
                name: 'COOTRANSMAGDALENA',
                whatsapp: null,
                email: null,
                website: null,
                image: 'https://i.postimg.cc/1XyjQ1K4/cootransmagdalena.webp',
            },
            {
                id: 5,
                name: 'TRANSSANDER',
                whatsapp: null,
                email: null,
                website: null,
                image: 'https://i.postimg.cc/4xHwj3TB/transsander.webp',
            },
            {
                id: 6,
                name: 'CONCORDE',
                whatsapp: null,
                email: null,
                website: null,
                image: 'https://i.postimg.cc/pTbSsFhf/concorde.webp',
            },
            {
                id: 7,
                name: 'TRANSRICAURTE',
                whatsapp: null,
                email: null,
                website: null,
                image: 'https://i.postimg.cc/HshBSyFr/transricaurte.webp',
            },
            {
                id: 8,
                name: 'CATATUMBO',
                whatsapp: null,
                email: null,
                website: null,
                image: 'https://i.postimg.cc/KYgV7Nzc/catatumbo.webp',
            },
            {
                id: 9,
                name: 'COTRANS',
                whatsapp: null,
                email: null,
                website: null,
                image: 'https://i.postimg.cc/nhNSLD1y/cotrans.webp',
            },
            {
                id: 10,
                name: 'SOTRACOR',
                whatsapp: null,
                email: null,
                website: null,
                image: 'https://i.postimg.cc/kMwjbZcF/sotracor.webp',
            },
            {
                id: 11,
                name: 'TRAESCOR',
                whatsapp: null,
                email: null,
                website: null,
                image: null,
            },
            {
                id: 12,
                name: 'BALLEGOM',
                whatsapp: null,
                email: null,
                website: null,
                image: 'https://i.postimg.cc/t4cwVf9m/ballegom.webp',
            },
            {
                id: 13,
                name: 'COOTRANSAR',
                whatsapp: null,
                email: 'cootransar@transpaservic.com.co',
                website: null,
                image: null,
            },
            {
                id: 14,
                name: 'COOTRANSMOR',
                whatsapp: null,
                email: null,
                website: null,
                image: 'https://i.postimg.cc/3N9brfL1/cootransmor.webp',
            },
            {
                id: 15,
                name: 'SOTRAMAGDALENA',
                whatsapp: null,
                email: null,
                website: null,
                image: 'https://i.postimg.cc/J4npcqYw/sotramagdalena.webp',
            },
            {
                id: 16,
                name: 'COOTRASANGIL',
                whatsapp: null,
                email: 'cootrasangil@transpaservic.com.co',
                website: null,
                image: null,
            },
            {
                id: 17,
                name: 'COTRASARAVITA',
                whatsapp: null,
                email: null,
                website: null,
                image: 'https://i.postimg.cc/BbZMzcqK/cotrasaravita.webp',
            },
            {
                id: 18,
                name: 'COOTRANSTAME',
                whatsapp: null,
                email: 'cootranstame@transpaservic.com.co',
                website: null,
                image: null,
            },
            {
                id: 19,
                name: 'COTRANAL',
                whatsapp: null,
                email: null,
                website: null,
                image: 'https://i.postimg.cc/65j1DS45/cotranal.webp',
            },
            {
                id: 20,
                name: 'MOTILONES',
                whatsapp: null,
                email: null,
                website: null,
                image: 'https://i.postimg.cc/j28ZYw5k/motilones.webp',
            },
            {
                id: 21,
                name: 'COOPTMOTILON',
                whatsapp: null,
                email: null,
                website: null,
                image: 'https://i.postimg.cc/tT3Mw4WL/cooptmotilon.webp',
            },
            {
                id: 22,
                name: 'TRANSPORTES LUZ',
                whatsapp: null,
                email: null,
                website: null,
                image: null,
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