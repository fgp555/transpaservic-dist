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
exports.WablasReportService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const wablas_service_1 = require("./wablas.service");
const wabla_report_entity_1 = require("./entities/wabla-report.entity");
let WablasReportService = class WablasReportService {
    constructor(wablasReportRepository, wablasService) {
        this.wablasReportRepository = wablasReportRepository;
        this.wablasService = wablasService;
    }
    async fetchAndSaveData() {
        const findWablas = await this.wablasService.findOne(1);
        const API_URL = `${findWablas.domain}/api/report/message`;
        const authorization = `${findWablas.apiKeyToken}.${findWablas.secretKey}`;
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: { Authorization: authorization },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            const messages = [];
            for (const msg of data.message) {
                const existingMessage = await this.wablasReportRepository.findOne({
                    where: { id: msg.id },
                });
                if (existingMessage) {
                    existingMessage.status = msg.status;
                    (existingMessage.updatedAt = new Date(new Date(msg.date.updated_at).getTime() - 12 * 60 * 60 * 1000)),
                        await this.wablasReportRepository.save(existingMessage);
                }
                else {
                    const newMessage = this.wablasReportRepository.create({
                        id: msg.id,
                        deviceID: msg.deviceID,
                        fromPhone: msg.phone.from,
                        toPhone: msg.phone.to,
                        category: msg.category,
                        text: msg.text,
                        URL_file: msg.URL_file,
                        status: msg.status,
                        type: msg.type,
                        source: msg.source,
                        createdAtOfWablas: new Date(msg.date.created_at),
                        createdAt: new Date(new Date(msg.date.created_at).getTime() - 12 * 60 * 60 * 1000),
                        updatedAt: new Date(msg.date.updated_at),
                    });
                    await this.wablasReportRepository.save(newMessage);
                }
            }
            return messages;
        }
        catch (error) {
            throw new Error(`Error fetching message report: ${error.message}`);
        }
    }
    async getById(id) {
        return this.wablasReportRepository.findOneBy({ id });
    }
    async findAllByFilters(filters) {
        const query = this.wablasReportRepository.createQueryBuilder('report');
        if (filters.status) {
            query.andWhere('report.status = :status', { status: filters.status });
        }
        if (filters.deviceID) {
            query.andWhere('report.deviceID = :deviceID', {
                deviceID: filters.deviceID,
            });
        }
        if (filters.search) {
            query.andWhere('(report.text LIKE :search OR report.toPhone LIKE :search)', {
                search: `%${filters.search}%`,
            });
        }
        if (filters.dateFrom) {
            query.andWhere('report.createdAt >= :dateFrom', {
                dateFrom: filters.dateFrom,
            });
        }
        if (filters.dateTo) {
            query.andWhere('report.createdAt <= :dateTo', { dateTo: filters.dateTo });
        }
        query.orderBy('report.createdAt', 'DESC');
        const total = await query.getCount();
        const reports = await query
            .skip((filters.page - 1) * filters.limit)
            .take(filters.limit)
            .getMany();
        return {
            total,
            page: filters.page,
            limit: filters.limit,
            totalPages: Math.ceil(total / filters.limit),
            results: reports,
        };
    }
};
exports.WablasReportService = WablasReportService;
exports.WablasReportService = WablasReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wabla_report_entity_1.WablasReportEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        wablas_service_1.WablasService])
], WablasReportService);
//# sourceMappingURL=wablas-report.service.js.map