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
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const patient_entity_1 = require("./entities/patient.entity");
const typeorm_2 = require("typeorm");
const travelDates_entity_1 = require("./entities/travelDates.entity");
let PatientService = class PatientService {
    constructor(patientRepository, travelDatesRepository) {
        this.patientRepository = patientRepository;
        this.travelDatesRepository = travelDatesRepository;
    }
    async create(createTempDto) {
        return await this.patientRepository.save(createTempDto);
    }
    async findAll() {
        return this.patientRepository.find();
    }
    async findOneById(id) {
        return await this.patientRepository.findOne({ where: { id } });
    }
    async findOneByIdCard(idCard) {
        return await this.patientRepository.findOne({ where: { idCard: idCard } });
    }
    async update(id, updateTempDto) {
        return await this.patientRepository.update(id, updateTempDto);
    }
    async registerTravel(id, updateTempDto) {
        const patient = await this.patientRepository.findOne({ where: { id } });
        if (!patient)
            throw new Error('Patient not found');
        const travelDates = updateTempDto.travelDates.map((date) => {
            const travelDate = new travelDates_entity_1.TravelDatesEntity();
            travelDate.travelDate = new Date(date);
            travelDate.patient = patient;
            return travelDate;
        });
        await this.travelDatesRepository.save(travelDates);
        const updatedPatient = await this.patientRepository.findOne({
            where: { id },
            relations: ['travelDates'],
        });
        return updatedPatient;
    }
    async remove(id) {
        return await this.patientRepository.delete(id);
    }
};
exports.PatientService = PatientService;
exports.PatientService = PatientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(patient_entity_1.PatientEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(travelDates_entity_1.TravelDatesEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PatientService);
//# sourceMappingURL=patient.service.js.map