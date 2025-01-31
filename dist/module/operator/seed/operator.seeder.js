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
                username: 'copetran',
                whatsapp: '987987987',
                email: 'contact@copetran.com',
                website: 'https://copetran.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'COOTRANSUNIDOS',
                username: 'cootransunidos',
                whatsapp: '987987988',
                email: 'contact@cootransunidos.com',
                website: 'https://cootransunidos.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'COTAXI',
                username: 'cotaxi',
                whatsapp: '987987989',
                email: 'contact@cotaxi.com',
                website: 'https://cotaxi.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'COOTRANSMAGDALENA',
                username: 'cootransmagdalena',
                whatsapp: '987987990',
                email: 'contact@cootransmagdalena.com',
                website: 'https://cootransmagdalena.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'TRANSSANDER',
                username: 'transsander',
                whatsapp: '987987991',
                email: 'contact@transsander.com',
                website: 'https://transsander.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'CONCORDE',
                username: 'concorde',
                whatsapp: '987987992',
                email: 'contact@concorde.com',
                website: 'https://concorde.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'TRANSRICAURTE',
                username: 'transricaurte',
                whatsapp: '987987993',
                email: 'contact@transricaurte.com',
                website: 'https://transricaurte.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'CATATUMBO',
                username: 'catatumbo',
                whatsapp: '987987994',
                email: 'contact@catatumbo.com',
                website: 'https://catatumbo.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'COTRANS',
                username: 'cotrans',
                whatsapp: '987987995',
                email: 'contact@cotrans.com',
                website: 'https://cotrans.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'SOTRACOR',
                username: 'sotracor',
                whatsapp: '987987996',
                email: 'contact@sotracor.com',
                website: 'https://sotracor.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'TRAESCOR',
                username: 'traescor',
                whatsapp: '987987997',
                email: 'contact@traescor.com',
                website: 'https://traescor.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'BALLEGOM',
                username: 'ballegom',
                whatsapp: '987987998',
                email: 'contact@ballegom.com',
                website: 'https://ballegom.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'COTRANSAR',
                username: 'cotransar',
                whatsapp: '987987999',
                email: 'contact@cotransar.com',
                website: 'https://cotransar.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'COOTRANSMOR',
                username: 'cootransmor',
                whatsapp: '987988000',
                email: 'contact@cootransmor.com',
                website: 'https://cootransmor.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'SOTRAMAGDALENA',
                username: 'sotramagdalena',
                whatsapp: '987988001',
                email: 'contact@sotramagdalena.com',
                website: 'https://sotramagdalena.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'COTRASANGIL',
                username: 'cotrasangil',
                whatsapp: '987988002',
                email: 'contact@cotrasangil.com',
                website: 'https://cotrasangil.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'COTRASARAVITA',
                username: 'cotrasaravita',
                whatsapp: '987988003',
                email: 'contact@cotrasaravita.com',
                website: 'https://cotrasaravita.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'COTRANSTAME',
                username: 'cotranstame',
                whatsapp: '987988004',
                email: 'contact@cotranstame.com',
                website: 'https://cotranstame.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'COTRANAL',
                username: 'cotranal',
                whatsapp: '987988005',
                email: 'contact@cotranal.com',
                website: 'https://cotranal.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'MOTILONES',
                username: 'motilones',
                whatsapp: '987988006',
                email: 'contact@motilones.com',
                website: 'https://motilones.com',
                registrationDate: new Date('2025-01-12'),
            },
            {
                name: 'COOPTMOTILON',
                username: 'cooptmotilon',
                whatsapp: '987988007',
                email: 'contact@cooptmotilon.com',
                website: 'https://cooptmotilon.com',
                registrationDate: new Date('2025-01-12'),
            },
        ];
        for (const operatorData of dataDemo) {
            const existingOperator = await this.operatorRepository.findOne({
                where: { email: operatorData.email },
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