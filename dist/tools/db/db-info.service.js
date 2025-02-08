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
exports.DBInfoService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("../../config/typeorm");
let DBInfoService = class DBInfoService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getDBInfo() {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        let version = 'Unknown';
        let characterSet = 'Unknown';
        let storageEngine = 'Unknown';
        let uptime = 'Unknown';
        let activeConnections = 0;
        let databaseSize = 'Unknown';
        let timeZone = 'Unknown';
        try {
            const versionResult = await queryRunner.query(`SELECT VERSION() AS version;`);
            version = versionResult[0]?.version || 'Unknown';
            const charsetResult = await queryRunner.query(`
        SELECT DEFAULT_CHARACTER_SET_NAME AS characterSet
        FROM information_schema.SCHEMATA
        WHERE schema_name = DATABASE();
      `);
            characterSet = charsetResult[0]?.characterSet || 'Unknown';
            const engineResult = await queryRunner.query(`
        SELECT ENGINE 
        FROM information_schema.TABLES 
        WHERE TABLE_SCHEMA = DATABASE() 
        LIMIT 1;
      `);
            storageEngine = engineResult[0]?.ENGINE || 'Unknown';
            const uptimeResult = await queryRunner.query(`SHOW GLOBAL STATUS LIKE 'Uptime';`);
            uptime = uptimeResult[0]?.Value || 'Unknown';
            const connectionsResult = await queryRunner.query(`SHOW STATUS LIKE 'Threads_connected';`);
            activeConnections = connectionsResult[0]?.Value || 0;
            const sizeResult = await queryRunner.query(`
        SELECT ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS sizeMB
        FROM information_schema.TABLES
        WHERE table_schema = DATABASE();
      `);
            databaseSize = sizeResult[0]?.sizeMB
                ? `${sizeResult[0].sizeMB} MB`
                : 'Unknown';
            const timeZoneResult = await queryRunner.query(`SELECT @@global.time_zone AS timeZone;`);
            timeZone = timeZoneResult[0]?.timeZone || 'SYSTEM';
        }
        catch (error) {
            console.error('Error fetching database info:', error);
        }
        finally {
            await queryRunner.release();
        }
        return {
            version,
            characterSet,
            storageEngine,
            uptime: `${uptime} seconds`,
            activeConnections,
            databaseSize,
            timeZone,
        };
    }
    infoConfig() {
        const dbConfig = this.dataSource.options;
        const withoutPassword = {
            ...dbConfig,
            password: '********',
        };
        return withoutPassword;
    }
    getEntities() {
        return this.dataSource.entityMetadatas.map((entity) => ({
            name: entity.name,
            tableName: entity.tableName,
            columns: entity.columns.map((column) => ({
                name: column.propertyName,
                type: column.type,
                isPrimary: column.isPrimary,
                isNullable: column.isNullable,
            })),
        }));
    }
    async stats() {
        const entities = this.dataSource.entityMetadatas;
        const stats = {};
        for (const entity of entities) {
            const repository = this.dataSource.getRepository(entity.name);
            const count = await repository.count();
            stats[entity.name] = count;
        }
        return stats;
    }
    async dropSynchronize() {
        await this.dataSource.dropDatabase();
        console.log('Database schema dropped successfully');
        await this.dataSource.synchronize();
        console.log('Database schema synchronized successfully');
        return 'Database reset successfully';
    }
    async dropSchema() {
        await this.dataSource.dropDatabase();
        console.log('Database schema dropped successfully');
        return 'dropDatabase successfully';
    }
    async synchronize() {
        await this.dataSource.synchronize();
        console.log('Database schema synchronized successfully');
        return 'synchronize successfully';
    }
    async runMigrations() {
        const dataSource = await typeorm_2.conectionSource.initialize();
        try {
            const result = await dataSource.runMigrations();
            return {
                message: 'Migraciones ejecutadas con éxito',
                details: result,
            };
        }
        catch (error) {
            throw new Error(`Error ejecutando migraciones: ${error.message}`);
        }
        finally {
            await dataSource.destroy();
        }
    }
    async getQueryLogs() {
        return this.dataSource.queryResultCache?.['queries'] || [];
    }
    async pingDatabase() {
        try {
            await this.dataSource.query('SELECT 1');
            return { status: 'Database is online' };
        }
        catch (error) {
            return { status: 'Database is offline', error: error.message };
        }
    }
    async showMigrations() {
        const migrations = await this.dataSource.showMigrations();
        return { appliedMigrations: migrations };
    }
};
exports.DBInfoService = DBInfoService;
exports.DBInfoService = DBInfoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], DBInfoService);
//# sourceMappingURL=db-info.service.js.map