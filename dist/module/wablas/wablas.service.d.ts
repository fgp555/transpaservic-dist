import { CreateWablaDto } from './dto/create-wabla.dto';
import { UpdateWablaDto } from './dto/update-wabla.dto';
import { WablaEntity } from './entities/wabla.entity';
import { Repository } from 'typeorm';
export declare class WablasService {
    private readonly wablaRepository;
    constructor(wablaRepository: Repository<WablaEntity>);
    sendMessageWhatsapp(param: any): Promise<any>;
    test(wablaId: string): Promise<{
        apiResponse: any;
        id: number;
        deviceId: string;
        deviceName: string;
        whatsappNumber: string;
        domain: string;
        apiKeyToken: string;
        secretKey: string;
        user: import("../user/entities/user.entity").UserEntity;
    }>;
    create(createWablaDto: CreateWablaDto): Promise<CreateWablaDto & WablaEntity>;
    findAll(): Promise<WablaEntity[]>;
    findOne(id: number): Promise<WablaEntity>;
    update(id: number, updateWablaDto: UpdateWablaDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
