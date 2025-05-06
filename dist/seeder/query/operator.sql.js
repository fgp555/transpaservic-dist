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
exports.OperatorSeederServiceSQL = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let OperatorSeederServiceSQL = class OperatorSeederServiceSQL {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async seed() {
        await this.dataSource.query(`DELETE FROM operator`);
        await this.dataSource.query(`
INSERT INTO \`operator\` (\`id\`, \`name\`, \`whatsapp\`, \`email\`, \`website\`, \`image\`, \`registrationDate\`) VALUES
(1, 'BALLEGOM', NULL, NULL, NULL, 'https://i.postimg.cc/t4cwVf9m/ballegom.webp', '2025-05-08 18:51:29'),
(2, 'CATATUMBO', NULL, NULL, NULL, 'https://i.postimg.cc/KYgV7Nzc/catatumbo.webp', '2025-05-08 18:51:30'),
(3, 'CONCORDE', NULL, NULL, NULL, 'https://i.postimg.cc/pTbSsFhf/concorde.webp', '2025-05-08 18:51:32'),
(4, 'COOPTMOTILON', NULL, NULL, NULL, 'https://i.postimg.cc/tT3Mw4WL/cooptmotilon.webp', '2025-05-08 18:51:33'),
(5, 'COOTRANSAR', NULL, 'cootransar@transpaservic.com.co', NULL, NULL, '2025-05-08 18:51:34'),
(6, 'COOTRANSMAGDALENA', NULL, NULL, NULL, 'https://i.postimg.cc/1XyjQ1K4/cootransmagdalena.webp', '2025-05-08 18:51:35'),
(7, 'COOTRANSMOR', NULL, NULL, NULL, 'https://i.postimg.cc/3N9brfL1/cootransmor.webp', '2025-05-08 18:51:36'),
(8, 'COOTRANSTAME', NULL, 'cootranstame@transpaservic.com.co', NULL, NULL, '2025-05-08 18:51:38'),
(9, 'COOTRANSUNIDOS', NULL, NULL, NULL, 'https://i.postimg.cc/rFFPZcmP/cootransunidos.webp', '2025-05-08 18:51:39'),
(10, 'COOTRASANGIL', NULL, 'cootrasangil@transpaservic.com.co', NULL, NULL, '2025-05-08 18:51:40'),
(11, 'COPETRAN', '601 5 87 0000', 'servicioalcliente@copetran.com', 'https://www.copetran.com/', 'https://i.postimg.cc/DfcNcm2G/copetran.webp', '2025-05-08 18:51:41'),
(12, 'COTAXI', NULL, NULL, NULL, 'https://i.postimg.cc/138YPHD0/cotaxi.webp', '2025-05-08 18:51:42'),
(13, 'COTRANAL', NULL, NULL, NULL, 'https://i.postimg.cc/65j1DS45/cotranal.webp', '2025-05-08 18:51:43'),
(14, 'COTRANS', NULL, NULL, NULL, 'https://i.postimg.cc/nhNSLD1y/cotrans.webp', '2025-05-08 18:51:45'),
(15, 'COTRASARAVITA', NULL, NULL, NULL, 'https://i.postimg.cc/BbZMzcqK/cotrasaravita.webp', '2025-05-08 18:51:46'),
(16, 'MOTILONES', NULL, NULL, NULL, 'https://i.postimg.cc/j28ZYw5k/motilones.webp', '2025-05-08 18:51:47'),
(17, 'SOTRACOR', NULL, NULL, NULL, 'https://i.postimg.cc/kMwjbZcF/sotracor.webp', '2025-05-08 18:51:48'),
(18, 'SOTRAMAGDALENA', NULL, NULL, NULL, 'https://i.postimg.cc/J4npcqYw/sotramagdalena.webp', '2025-05-08 18:51:49'),
(19, 'TRAESCOR', NULL, NULL, NULL, NULL, '2025-05-08 18:51:51'),
(20, 'TRANSPORTES LUZ', NULL, NULL, NULL, NULL, '2025-05-08 18:51:52'),
(21, 'TRANSRICAURTE', NULL, NULL, NULL, 'https://i.postimg.cc/HshBSyFr/transricaurte.webp', '2025-05-08 18:51:53'),
(22, 'TRANSSANDER', NULL, NULL, NULL, 'https://i.postimg.cc/4xHwj3TB/transsander.webp', '2025-05-08 18:51:54'),
(23, 'COOTRACERO', '3134502322', 'cootracero1@transpaservic.com.co', NULL, 'https://i.postimg.cc/c4CcvJXk/cootracero.jpg', '2025-05-09 12:44:11');
    `);
        console.log('OperatorSeederServiceSQL: Datos insertados correctamente.');
    }
};
exports.OperatorSeederServiceSQL = OperatorSeederServiceSQL;
exports.OperatorSeederServiceSQL = OperatorSeederServiceSQL = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], OperatorSeederServiceSQL);
//# sourceMappingURL=operator.sql.js.map