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
exports.WablasService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const wabla_entity_1 = require("./entities/wabla.entity");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const setting_service_1 = require("../setting/setting.service");
let WablasService = class WablasService {
    constructor(wablaRepository, settingsService) {
        this.wablaRepository = wablaRepository;
        this.settingsService = settingsService;
    }
    async sendMessageWhatsapp(param) {
        console.log('param', param);
        return param;
    }
    async sendWhatsapp(sendWhatsappObject) {
        const wablaId = 1;
        const res = await this.wablaRepository.findOne({ where: { id: wablaId } });
        if (!res) {
            throw new common_1.HttpException(`No se encontró el registro con ID ${wablaId}.`, common_1.HttpStatus.NOT_FOUND);
        }
        const newDate = new Date().toLocaleString('es-CO', {
            dateStyle: 'long',
            timeStyle: 'medium',
        });
        const timeOnly = new Date().toLocaleString('es-CO', {
            timeStyle: 'medium',
        });
        function agregarPrefijo(numero) {
            const numStr = numero.toString();
            if (numStr.length === 10) {
                return '57' + numStr;
            }
            return numStr;
        }
        function obtenerPrimerNombre(nombreCompleto) {
            const primerNombre = nombreCompleto.split(' ')[0];
            return primerNombre;
        }
        function capitalizar(str) {
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        }
        const { userPhone, phoneOperator, websiteOperator, nameOperator, patientName, } = sendWhatsappObject;
        const phoneDest = agregarPrefijo(String(userPhone ?? '')
            .split(' / ')[0]
            .trim());
        const firstName = obtenerPrimerNombre(patientName);
        const nameCapitalOperator = capitalizar(nameOperator);
        let messageTemplate = await this.settingsService.getSetting('whatsapp_message_template');
        if (!messageTemplate) {
            throw new common_1.HttpException('No se encontró la plantilla de mensaje en Settings.', common_1.HttpStatus.NOT_FOUND);
        }
        const messageFromDatabase = messageTemplate
            .replace('{{firstName}}', firstName)
            .replace('{{phoneOperator}}', phoneOperator ?? '')
            .replace('{{nameOperator}}', nameCapitalOperator)
            .replace('{{websiteOperator}}', websiteOperator ?? '')
            .replace('{{newDate}}', newDate);
        const source = 'nestjs';
        const message = `%0A%0A *Estimado Usuario ${firstName}*
%0A%0A Nos complace informarle que sus tiquetes de viaje han sido emitidos.
%0A%0A Para mayor información, puede comunicarse con el operador a través de los siguientes canales:
%0A%0A 📞 PBX: ${phoneOperator ?? ''}
%0A 🎟️ Taquillas en la terminal de operador _${nameCapitalOperator}_
%0A 🌐 Sitio web: ${websiteOperator ?? ''}
%0A%0A ¡Le deseamos un excelente viaje!
%0A%0A 📅 ` + newDate;
        const fullURL = `${res.domain}/api/send-message?source=${source}&phone=${phoneDest}&message=${messageFromDatabase}&token=${res.apiKeyToken}.${res.secretKey}`;
        try {
            const response = await fetch(fullURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Cuerpo del error:', errorText);
                throw new common_1.HttpException(`Error en la API remota: Código ${response.status} - ${response.statusText}. Detalles: ${errorText}`, common_1.HttpStatus.BAD_GATEWAY);
            }
            const data = await response.json();
            console.log('Respuesta de la API remota:', data);
            return { ...res, apiResponse: data };
        }
        catch (error) {
            console.error('Error en la solicitud:', error);
            throw new common_1.HttpException(`Ocurrió un error al intentar conectar con el servicio remoto: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async test(wablaId) {
        const res = await this.wablaRepository.findOne({ where: { id: +wablaId } });
        if (!res) {
            throw new common_1.HttpException(`No se encontró el registro con ID ${wablaId}.`, common_1.HttpStatus.NOT_FOUND);
        }
        const phoneDest = '51918221790';
        const source = 'nestjs';
        const message = `*Estimado Usuario:*
%0A%0A Nos complace informarle que sus tiquetes de viaje han sido emitidos.
%0A%0A Para mayor información, puede comunicarse con el operador a través de los siguientes canales:
%0A%0A 📞 PBX: +573339990999
%0A 🎟️ Taquillas en la terminal de operador
%0A 🌐 Sitio web: https://copetran.com
%0A%0A ¡Le deseamos un excelente viaje!
%0A%0A 📅 ` +
            new Date().toLocaleString('es-CO', {
                dateStyle: 'long',
                timeStyle: 'short',
            });
        const fullURL = `${res.domain}/api/send-message?source=${source}&phone=${phoneDest}&message=${message}&token=${res.apiKeyToken}.${res.secretKey}`;
        try {
            const response = await fetch(fullURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Cuerpo del error:', errorText);
                throw new common_1.HttpException(`Error en la API remota: Código ${response.status} - ${response.statusText}. Detalles: ${errorText}`, common_1.HttpStatus.BAD_GATEWAY);
            }
            const data = await response.json();
            console.log('Respuesta de la API remota:', data);
            return { ...res, apiResponse: data };
        }
        catch (error) {
            console.error('Error en la solicitud:', error);
            throw new common_1.HttpException(`Ocurrió un error al intentar conectar con el servicio remoto: ${error.message}`, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    create(createWablaDto) {
        return this.wablaRepository.save(createWablaDto);
    }
    findAll() {
        return this.wablaRepository.find();
    }
    findOne(id) {
        return this.wablaRepository.findOne({ where: { id } });
    }
    update(id, updateWablaDto) {
        this.wablaRepository.update(id, updateWablaDto);
        const res = this.wablaRepository.findOne({ where: { id } });
        return res;
    }
    remove(id) {
        return this.wablaRepository.delete(id);
    }
};
exports.WablasService = WablasService;
exports.WablasService = WablasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(wabla_entity_1.WablaEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        setting_service_1.SettingsService])
], WablasService);
//# sourceMappingURL=wablas.service.js.map