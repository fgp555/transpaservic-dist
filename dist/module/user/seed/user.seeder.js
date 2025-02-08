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
        const hashedPasswordAdmin = await bcrypt.hash(process.env.ADMINPASS, 10);
        const hashedPasswordUser = await bcrypt.hash('copetran123456', 10);
        const hashedPasswordSuper = await bcrypt.hash(process.env.ADMINPASS + 'super', 10);
        const users = [
            {
                id: '3385ac2a-79f3-4f80-99b0-ca99f153619b',
                firstName: 'Transpaservic',
                email: 'admin@transpaservic.com.co',
                password: hashedPasswordAdmin,
                confirmPassword: hashedPasswordAdmin,
                role: 'admin',
                sendMail: false,
                image: 'https://i.postimg.cc/05Kfp6bt/icono.webp',
            },
            {
                id: 'f7b4a3c9-4e1f-4b6d-8a9a-8a0c8c0c8c0c',
                firstName: 'Copetran',
                whatsapp: '+51277889900',
                email: 'copetran@transpaservic.com.co',
                password: hashedPasswordUser,
                confirmPassword: hashedPasswordUser,
                role: 'user',
                sendMail: false,
                operator: { id: 1 },
            },
            {
                id: '54695949-687c-45f5-b7df-4a08d810f0ee',
                firstName: 'Super Admin',
                email: 'desarrollotranspaservic@gmail.com',
                password: hashedPasswordSuper,
                confirmPassword: hashedPasswordSuper,
                role: 'superadmin',
                sendMail: false,
                image: 'https://i.postimg.cc/Zn1WqNzG/Transpa-Servic-Logo.webp',
                operator: { id: 1 },
            },
            {
                id: 'aa050617-c7ca-45f0-a64d-9192931a33e3',
                firstName: 'User Collaborator',
                email: 'collaborator@transpaservic.com.co',
                password: hashedPasswordAdmin,
                confirmPassword: hashedPasswordAdmin,
                role: 'collaborator',
                sendMail: false,
                operator: null,
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