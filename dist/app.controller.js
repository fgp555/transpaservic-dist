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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getHtml(res) {
        const resp = this.appService.build();
        const html = `
      <html>
        <head><title>Versión</title></head>
        <body style="text-align: center; color: #555;">
          <h1>Build Backend</h1>
          <h2>${new Date(resp.build_dist.stats_modify_time).toLocaleString('en-CA')}</h2>
          <h1>Build Frontend</h1>
          <h2>${new Date(resp.build_index.stats_modify_time).toLocaleString('en-CA')}</h2>
          <h1>Current Time</h1>
          <h2>${new Date().toLocaleString('en-CA')}</h2>                    
          <h1>ENV</h1>
          <h2>${process.env.NODE_ENV}</h2>
          <h2>${process.env.SYNCHRONIZE}</h2>
          <h2>${process.env.DROPSCHEMA}</h2>
          <h2>${process.env.USE_SEEDER}</h2>
          <h2>${process.env.DEVELOPMENT_MODE}</h2>

        </body>
      </html>
    `;
        res.type('html').send(html);
    }
    build(res) {
        return this.appService.build();
    }
    getVersionBackend(res) {
        const version = '2025.5';
        return { version };
    }
    getVersionMobile() {
        const version = '2025.4.4.43';
        return { version };
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getHtml", null);
__decorate([
    (0, common_1.Get)('/build-backend'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "build", null);
__decorate([
    (0, common_1.Get)('/version-backend'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getVersionBackend", null);
__decorate([
    (0, common_1.Get)('/version-mobile'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "getVersionMobile", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map