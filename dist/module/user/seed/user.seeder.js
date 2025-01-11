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
        const hashedPassword = await bcrypt.hash('SecurePass@2023', 10);
        const hashedPasswordAdmin = await bcrypt.hash('*Transpa/*123', 10);
        const users = [
            {
                firstName: 'User',
                lastName: 'Admin',
                whatsapp: '999888777',
                username: 'username1',
                email: 'admin123@gmail.com',
                password: hashedPassword,
                confirmPassword: hashedPassword,
                role: 'admin',
                sendMail: false,
                sendWhatsApp: false,
                image: 'https://i.postimg.cc/05Kfp6bt/icono.webp',
                operator: { id: 1 },
            },
            {
                firstName: 'Juan',
                lastName: 'Lopez',
                whatsapp: '+51222333444',
                username: 'user_lionel',
                email: 'user123@gmail.com',
                password: hashedPassword,
                confirmPassword: hashedPassword,
                role: 'user',
                sendMail: false,
                sendWhatsApp: false,
                image: 'https://i.postimg.cc/05Kfp6bt/icono.webp',
                operator: { id: 2 },
            },
            {
                firstName: 'Maria',
                lastName: 'Gomez',
                whatsapp: '+51244566789',
                username: 'maria_g',
                email: 'cotaxi10@cotaxi.com',
                password: hashedPassword,
                confirmPassword: hashedPassword,
                role: 'user',
                sendMail: true,
                sendWhatsApp: false,
                image: 'https://i.postimg.cc/05Kfp6bt/icono.webp',
                operator: { id: 3 },
            },
            {
                firstName: 'Carlos',
                lastName: 'Martinez',
                whatsapp: '+51233445566',
                username: 'carlosm',
                email: 'copetran3@copetran.com',
                password: hashedPassword,
                confirmPassword: hashedPassword,
                role: 'user',
                sendMail: false,
                sendWhatsApp: true,
                image: 'https://i.postimg.cc/05Kfp6bt/icono.webp',
                operator: { id: 1 },
            },
            {
                firstName: 'Ana',
                lastName: 'Perez',
                whatsapp: '+51222334455',
                username: 'ana_perez',
                email: 'cootransunidos7@cootransunidos.com',
                password: hashedPassword,
                confirmPassword: hashedPassword,
                role: 'user',
                sendMail: false,
                sendWhatsApp: true,
                image: 'https://i.postimg.cc/05Kfp6bt/icono.webp',
                operator: { id: 2 },
            },
            {
                firstName: 'Luis',
                lastName: 'Ramirez',
                whatsapp: '+51233446677',
                username: 'luis_r',
                email: 'cotaxi6@cotaxi.com',
                password: hashedPassword,
                confirmPassword: hashedPassword,
                role: 'admin',
                sendMail: true,
                sendWhatsApp: true,
                image: 'https://i.postimg.cc/05Kfp6bt/icono.webp',
                operator: { id: 3 },
            },
            {
                firstName: 'Sofia',
                lastName: 'Lopez',
                whatsapp: '+51255667788',
                username: 'sofia_lopez',
                email: 'copetran4@copetran.com',
                password: hashedPassword,
                confirmPassword: hashedPassword,
                role: 'user',
                sendMail: false,
                sendWhatsApp: false,
                image: 'https://i.postimg.cc/05Kfp6bt/icono.webp',
                operator: { id: 1 },
            },
            {
                firstName: 'Pedro',
                lastName: 'Garcia',
                whatsapp: '+51266778899',
                username: 'pedro_g',
                email: 'cootransunidos3@cootransunidos.com',
                password: hashedPassword,
                confirmPassword: hashedPassword,
                role: 'user',
                sendMail: true,
                sendWhatsApp: false,
                image: 'https://i.postimg.cc/05Kfp6bt/icono.webp',
                operator: { id: 2 },
            },
            {
                firstName: 'Frank',
                lastName: 'GP',
                whatsapp: '+51288990011',
                username: 'frankgp',
                email: 'fgp555@gmail.com',
                password: hashedPassword,
                confirmPassword: hashedPassword,
                role: 'admin',
                sendMail: true,
                sendWhatsApp: true,
                image: 'https://i.postimg.cc/05Kfp6bt/icono.webp',
                operator: { id: 1 },
            },
            {
                firstName: 'Transpaservic',
                lastName: 'transpaservic',
                whatsapp: '+51277889900',
                username: 'transpaservic',
                email: 'admin@transpaservic.com.co',
                password: hashedPasswordAdmin,
                confirmPassword: hashedPasswordAdmin,
                role: 'admin',
                sendMail: false,
                sendWhatsApp: true,
                image: 'https://i.postimg.cc/05Kfp6bt/icono.webp',
                operator: { id: 3 },
            },
        ];
        for (const user of users) {
            try {
                if (user.email) {
                    const existingUser = await this.userService.findByEmail(user.email);
                    if (existingUser) {
                        console.log(`User with email ${user.email} already exists.`);
                        continue;
                    }
                }
                await this.userService.create(user);
                console.log(`User ${user.firstName} created successfully.`);
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