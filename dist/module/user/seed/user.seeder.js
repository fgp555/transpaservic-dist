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
const bcrypt = require("bcrypt");
const user_service_1 = require("../user.service");
let UserSeederService = class UserSeederService {
    constructor(userService) {
        this.userService = userService;
    }
    async seed() {
        const User = await this.userService.findAllSuper();
        if (User.length === 0) {
            await this.seedUser();
        }
        else {
            const message = 'Users already exist';
            console.info(message);
            return message;
        }
    }
    async seedUser() {
        const ADMINPASS = process.env.ADMINPASS;
        const hashedPass = (password) => bcrypt.hash(password, 10);
        const users = [
            {
                id: '54695949-687c-45f5-b7df-4a08d810f0ee',
                firstName: 'SUPERADMIN',
                email: 'desarrollotranspaservic@gmail.com',
                password: await hashedPass(ADMINPASS + 'super'),
                role: 'superadmin',
                sendMail: false,
                image: 'https://i.postimg.cc/Zn1WqNzG/Transpa-Servic-Logo.webp',
                operator: { id: 9 },
                isVisible: false,
            },
            {
                id: '3385ac2a-79f3-4f80-99b0-ca99f153619b',
                firstName: 'TRANSPASERVIC',
                email: 'admin@transpaservic.com.co',
                password: await hashedPass(ADMINPASS),
                role: 'admin',
                sendMail: false,
                image: 'https://i.postimg.cc/05Kfp6bt/icono.webp',
            },
        ];
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