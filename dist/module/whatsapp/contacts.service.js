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
exports.WaContactsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contacts_entity_1 = require("./entities/contacts.entity");
const typeorm_2 = require("typeorm");
let WaContactsService = class WaContactsService {
    constructor(contactsRepository) {
        this.contactsRepository = contactsRepository;
    }
    async updateOrCreate({ userName, contactPhone, contactName, lastMessageContent, lastMessageTimestamp, lastMessageStatus, increaseUnread = false, }) {
        let conversation = await this.contactsRepository.findOneBy({
            contactPhone,
        });
        if (!conversation) {
            conversation = this.contactsRepository.create({
                userName: userName || null,
                contactPhone,
                contactName: contactName || null,
                lastMessageContent,
                lastMessageTimestamp,
                lastMessageStatus,
                unreadCount: increaseUnread ? 1 : 0,
            });
        }
        else {
            conversation.lastMessageContent = lastMessageContent;
            conversation.lastMessageTimestamp = lastMessageTimestamp;
            conversation.lastMessageStatus = lastMessageStatus;
            if (contactName) {
                conversation.contactName = contactName;
            }
            if (userName) {
                conversation.userName = userName;
            }
            if (increaseUnread) {
                conversation.unreadCount += 1;
            }
        }
        return this.contactsRepository.save(conversation);
    }
    async markAsRead(userName, contactPhone) {
        const conversation = await this.contactsRepository.findOneBy({
            userName,
            contactPhone,
        });
        if (conversation) {
            conversation.unreadCount = 0;
            await this.contactsRepository.save(conversation);
        }
    }
    async findAll({ contactPhone, lastMessageStatus, from, to, page = 1, limit = 20, }) {
        const where = {};
        if (contactPhone) {
            where.contactPhone = contactPhone;
        }
        if (lastMessageStatus) {
            where.lastMessageStatus = lastMessageStatus;
        }
        if (from && to) {
            const fromTimestamp = new Date(from).getTime();
            const toTimestamp = new Date(to).getTime();
            where.lastMessageTimestamp = (0, typeorm_2.Between)(fromTimestamp, toTimestamp);
        }
        else if (from) {
            where.lastMessageTimestamp = (0, typeorm_2.MoreThanOrEqual)(new Date(from).getTime());
        }
        else if (to) {
            where.lastMessageTimestamp = (0, typeorm_2.LessThanOrEqual)(new Date(to).getTime());
        }
        const [results, total] = await this.contactsRepository.findAndCount({
            where,
            order: { lastMessageTimestamp: 'DESC' },
            skip: (page - 1) * limit,
            take: limit,
        });
        const totalPages = Math.ceil(total / limit);
        return {
            total,
            page,
            limit,
            totalPages,
            results,
        };
    }
    async findByContactPhone(phone) {
        const conversation = await this.contactsRepository.findOneBy({
            contactPhone: phone,
        });
        if (!conversation) {
            throw new common_1.NotFoundException(`No se encontró una conversación con el número: ${phone}`);
        }
        return conversation;
    }
    async save(conversation) {
        return this.contactsRepository.save(conversation);
    }
};
exports.WaContactsService = WaContactsService;
exports.WaContactsService = WaContactsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(contacts_entity_1.WaContactsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WaContactsService);
//# sourceMappingURL=contacts.service.js.map