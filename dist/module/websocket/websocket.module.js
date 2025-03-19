"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WSModule = void 0;
const common_1 = require("@nestjs/common");
const websocket_controller_1 = require("./websocket.controller");
const websocket_gateway_1 = require("./websocket.gateway");
const websocket_service_1 = require("./websocket.service");
let WSModule = class WSModule {
};
exports.WSModule = WSModule;
exports.WSModule = WSModule = __decorate([
    (0, common_1.Module)({
        controllers: [websocket_controller_1.WSController],
        providers: [websocket_gateway_1.WSGateway, websocket_service_1.WSService],
    })
], WSModule);
//# sourceMappingURL=websocket.module.js.map