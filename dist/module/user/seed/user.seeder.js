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
        const hashedPassTester = await bcrypt.hash('P45sW0rD_Tester', 10);
        const users = [
            {
                id: '3385ac2a-79f3-4f80-99b0-ca99f153619b',
                firstName: 'Transpaservic',
                email: 'admin@transpaservic.com.co',
                password: hashedPassAdmin,
                confirmPassword: hashedPassAdmin,
                role: 'admin',
                sendMail: false,
                image: 'https://i.postimg.cc/05Kfp6bt/icono.webp',
                operator: { id: 2 },
            },
            {
                id: 'f7b4a3c9-4e1f-4b6d-8a9a-8a0c8c0c8c0c',
                firstName: 'Copetran',
                whatsapp: '+51277889900',
                email: 'copetran@transpaservic.com.co',
                password: hashedPassUser,
                confirmPassword: hashedPassUser,
                role: 'user',
                sendMail: false,
                operator: { id: 1 },
            },
            {
                id: '54695949-687c-45f5-b7df-4a08d810f0ee',
                firstName: 'Super Admin',
                email: 'desarrollotranspaservic@gmail.com',
                password: hashedPassSuper,
                confirmPassword: hashedPassSuper,
                role: 'superadmin',
                sendMail: false,
                image: 'https://i.postimg.cc/Zn1WqNzG/Transpa-Servic-Logo.webp',
                operator: { id: 1 },
                isVisible: false,
            },
        ];
        if (process.env.IS_DEVELOPER === 'true') {
            users.push({
                id: 'aa050617-c7ca-45f0-a64d-9192931a33e0',
                firstName: 'User tester',
                email: 'tester@systered.com',
                password: hashedPassTester,
                confirmPassword: hashedPassTester,
                role: 'user',
                sendMail: false,
                operator: { id: 1 },
                isVisible: true,
            }, {
                id: 'aa050617-c7ca-45f0-a64d-9192931a33e5',
                firstName: 'Admin Tester',
                email: 'tester@systered.co',
                password: hashedPassTester,
                confirmPassword: hashedPassTester,
                role: 'admin',
                sendMail: false,
                operator: { id: 2 },
                isVisible: true,
            }, {
                id: '3385ac2a-79f3-4f80-99b0-ca99f153619c',
                firstName: 'Transpaservic',
                email: 'admin@transpaservic.com.com',
                password: hashedPassAdmin,
                confirmPassword: hashedPassAdmin,
                role: 'admin',
                sendMail: false,
                image: 'https://i.postimg.cc/05Kfp6bt/icono.webp',
                operator: { id: 1 },
            });
        }
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