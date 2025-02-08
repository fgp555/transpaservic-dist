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
exports.OrderSeederService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("../entities/order.entity");
const demoData = require("./orderData.json");
let OrderSeederService = class OrderSeederService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
        console.log(' OrderSeederService Starting seed...');
    }
    async seed() {
        for (const data of demoData) {
            const orderData = {
                ...data,
                status: data.status,
                orderHistory: [
                    {
                        modifiedByUser: {
                            id: '3385ac2a-79f3-4f80-99b0-ca99f153619b',
                        },
                    },
                ],
            };
            const order = this.orderRepository.create(orderData);
            const exists = await this.orderRepository.findOne({
                where: { operatorContract: data.operatorContract },
            });
            if (!exists) {
                await this.orderRepository.save(order);
                console.log(`Order creado con operatorContract: ${data.operatorContract}`);
            }
            else {
                console.log(`Order ya existe con operatorContract: ${data.operatorContract}`);
            }
        }
        console.log('OrderSeederService ejecutado correctamente');
    }
};
exports.OrderSeederService = OrderSeederService;
exports.OrderSeederService = OrderSeederService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderSeederService);
//# sourceMappingURL=order.seeder.js.map