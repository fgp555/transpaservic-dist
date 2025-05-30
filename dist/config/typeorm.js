"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conectionSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
(0, dotenv_1.config)({ path: '.env' });
const DB_PASSWORD = process.env.DB_TYPE === 'mysql'
    ? process.env.DB_PASSWORD || ''
    : process.env.DB_PASSWORD;
console.info('DB_TYPE: ', process.env.DB_TYPE);
console.info('DROPSCHEMA: ', process.env.DROPSCHEMA);
console.info('SYNCHRONIZE: ', process.env.SYNCHRONIZE);
console.log('DEVELOPMENT_MODE', process.env.DEVELOPMENT_MODE);
console.info('DB_DATABASE: ', process.env.DB_DATABASE);
console.info('WHATSAPP_OPERATOR: ', process.env.WHATSAPP_OPERATOR);
const typeOrmConfig = {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || DB_PASSWORD,
    database: process.env.DB_DATABASE || 'postgres',
    synchronize: process.env.SYNCHRONIZE === 'true',
    dropSchema: process.env.DROPSCHEMA === 'true',
    logging: ['error'],
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*{.ts,.js}'],
    ssl: process.env.DB_SSL === 'true'
        ? { rejectUnauthorized: false }
        : undefined,
};
exports.default = (0, config_1.registerAs)('typeorm', () => typeOrmConfig);
exports.conectionSource = new typeorm_1.DataSource(typeOrmConfig);
//# sourceMappingURL=typeorm.js.map