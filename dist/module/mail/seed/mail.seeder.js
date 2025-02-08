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
exports.MailSeederService = void 0;
const common_1 = require("@nestjs/common");
const mail_template_service_1 = require("../mail-template.service");
let MailSeederService = class MailSeederService {
    constructor(emailTemplatesService) {
        this.emailTemplatesService = emailTemplatesService;
    }
    async onModuleInit() { }
    async seed() {
        console.log('Running mail seeder...');
        const templates = [
            {
                templateName: 'Registro de Usuario',
                subject: '¡Bienvenido!',
                text: '¡Gracias por registrarte!',
                htmlContent: '<h1>¡Hola {{name}}!</h1>' +
                    '<p>Gracias por unirte a nuestro equipo. Nos alegra tenerte con nosotros.</p>' +
                    '<p>A continuación, te compartimos tus credenciales de acceso:</p>' +
                    '<p><strong>Correo electrónico:</strong> {{email}}</p>' +
                    '<p><strong>Contraseña:</strong> {{password}}</p>' +
                    '<p>Te recomendamos cambiar tu contraseña después de iniciar sesión.</p>' +
                    '<p>Si tienes alguna consulta o necesitas ayuda, no dudes en contactarnos. Estamos aquí para ayudarte.</p>' +
                    '<p>¡Bienvenido!</p>' +
                    '<p>Atentamente,</p>' +
                    '<p>El equipo de soporte</p>',
            },
        ];
        for (const template of templates) {
            await this.emailTemplatesService.createTemplate(template);
        }
    }
};
exports.MailSeederService = MailSeederService;
exports.MailSeederService = MailSeederService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mail_template_service_1.MailTemplatesService])
], MailSeederService);
//# sourceMappingURL=mail.seeder.js.map