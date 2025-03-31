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
exports.UserSeederService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user.service");
const bcrypt = require("bcrypt");
let UserSeederService = class UserSeederService {
    constructor(userService) {
        this.userService = userService;
    }
    async seed() {
        const ADMINPASS = process.env.ADMINPASS;
        const hashedPassAdmin = await bcrypt.hash(ADMINPASS, 10);
        const hashedPassUser = await bcrypt.hash('copetran123456', 10);
        const hashedPassSuper = await bcrypt.hash(ADMINPASS + 'super', 10);
        const hashedPassFelipe = await bcrypt.hash('felipe@systered.com', 10);
        const users = [
            {
                id: '54695949-687c-45f5-b7df-4a08d810f0ee',
                firstName: 'SUPERADMIN',
                email: 'desarrollotranspaservic@gmail.com',
                password: hashedPassSuper,
                confirmPassword: hashedPassSuper,
                role: 'superadmin',
                sendMail: false,
                image: 'https://i.postimg.cc/Zn1WqNzG/Transpa-Servic-Logo.webp',
                operator: { id: 1 },
                isVisible: false,
            },
            {
                id: '3385ac2a-79f3-4f80-99b0-ca99f153619b',
                firstName: 'TRANSPASERVIC',
                email: 'admin@transpaservic.com.co',
                password: hashedPassAdmin,
                confirmPassword: hashedPassAdmin,
                role: 'admin',
                sendMail: false,
                image: 'https://i.postimg.cc/05Kfp6bt/icono.webp',
                operator: { id: 2 },
            },
            { firstName: 'BALLEGOM', email: 'ballegom@transpaservic.com.co', operator: { id: 1 }, password: await bcrypt.hash('ballegom' + '1234', 10) },
            { firstName: 'CATATUMBO', email: 'catatumbo@transpaservic.com.co', operator: { id: 2 }, password: await bcrypt.hash('catatumbo' + '1234', 10) },
            { firstName: 'CONCORDE', email: 'concorde@transpaservic.com.co', operator: { id: 3 }, password: await bcrypt.hash('concorde' + '1234', 10) },
            { firstName: 'COOPTMOTILON', email: 'cooptmotilon@transpaservic.com.co', operator: { id: 4 }, password: await bcrypt.hash('cooptmotilon' + '1234', 10) },
            { firstName: 'COOTRANSAR', email: 'cootransar@transpaservic.com.co', operator: { id: 5 }, password: await bcrypt.hash('cootransar' + '1234', 10) },
            { firstName: 'COOTRANSMAGDALENA', email: 'cootransmagdalena@transpaservic.com.co', operator: { id: 6 }, password: await bcrypt.hash('cootransmagdalena' + '1234', 10) },
            { firstName: 'COOTRANSMOR', email: 'cootransmor@transpaservic.com.co', operator: { id: 7 }, password: await bcrypt.hash('cootransmor' + '1234', 10) },
            { firstName: 'COOTRANSTAME', email: 'cootranstame@transpaservic.com.co', operator: { id: 8 }, password: await bcrypt.hash('cootranstame' + '1234', 10) },
            { firstName: 'COOTRANSUNIDOS', email: 'cootransunidos@transpaservic.com.co', operator: { id: 9 }, password: await bcrypt.hash('cootransunidos' + '1234', 10) },
            { firstName: 'COOTRASANGIL', email: 'cootrasangil@transpaservic.com.co', operator: { id: 10 }, password: await bcrypt.hash('cootrasangil' + '1234', 10) },
            { firstName: 'COPETRAN', whatsapp: '+51277889900', email: 'copetran@transpaservic.com.co', password: await bcrypt.hash('copetran' + '1234', 10), role: 'user', sendMail: false, operator: { id: 11 }, },
            { firstName: 'COTAXI', email: 'cotaxi@transpaservic.com.co', operator: { id: 12 }, password: await bcrypt.hash('cotaxi' + '1234', 10) },
            { firstName: 'COTRANAL', email: 'cotranal@transpaservic.com.co', operator: { id: 13 }, password: await bcrypt.hash('cotranal' + '1234', 10) },
            { firstName: 'COTRANS', email: 'cotrans@transpaservic.com.co', operator: { id: 14 }, password: await bcrypt.hash('cotrans' + '1234', 10) },
            { firstName: 'COTRASARAVITA', email: 'cotrasaravita@transpaservic.com.co', operator: { id: 15 }, password: await bcrypt.hash('cotrasaravita' + '1234', 10) },
            { firstName: 'MOTILONES', email: 'motilones@transpaservic.com.co', operator: { id: 16 }, password: await bcrypt.hash('motilones' + '1234', 10) },
            { firstName: 'SOTRACOR', email: 'sotracor@transpaservic.com.co', operator: { id: 17 }, password: await bcrypt.hash('sotracor' + '1234', 10) },
            { firstName: 'SOTRAMAGDALENA', email: 'sotramagdalena@transpaservic.com.co', operator: { id: 18 }, password: await bcrypt.hash('sotramagdalena' + '1234', 10) },
            { firstName: 'TRAESCOR', email: 'traescor@transpaservic.com.co', operator: { id: 19 }, password: await bcrypt.hash('traescor' + '1234', 10) },
            { firstName: 'TRANSPORTES LUZ', email: 'transportesluz@transpaservic.com.co', operator: { id: 20 }, password: await bcrypt.hash('transportesluz' + '1234', 10) },
            { firstName: 'TRANSRICAURTE', email: 'transricaurte@transpaservic.com.co', operator: { id: 21 }, password: await bcrypt.hash('transricaurte' + '1234', 10) },
            { firstName: 'TRANSSANDER', email: 'transsander@transpaservic.com.co', operator: { id: 22 }, password: await bcrypt.hash('transsander' + '1234', 10) }
        ];
        if (process.env.IS_DEVELOPER === 'true') {
            console.info('process.env.USE_SEEDER', process.env.USE_SEEDER);
            users.push({
                id: 'f7b4a3c9-4e1f-4b6d-8a9a-8a0c8c0c8c0c',
                firstName: 'FELIPE',
                whatsapp: '+51277889900',
                email: 'felipe@systered.com',
                password: await bcrypt.hash('felipe@systered.com', 10),
                role: 'admin',
                sendMail: false,
                operator: { id: 9 },
            });
        }
        for (const user of users) {
            try {
                if (user.email) {
                    const existingUser = await this.userService.findByEmail(user.email);
                    if (existingUser) {
                        console.info(`User with email ${user.email} already exists.`);
                        continue;
                    }
                }
                await this.userService.create(user);
                console.info(`User ${user.firstName} created successfully.`);
            }
            catch (error) {
                console.error(`Failed to create user ${user.firstName}: ${error.message}`);
            }
        }
    }
};
exports.UserSeederService = UserSeederService;
exports.UserSeederService = UserSeederService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserSeederService);
//# sourceMappingURL=user.seeder.js.map