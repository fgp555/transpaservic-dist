import { WablasService } from './wablas.service';
import { CreateWablaDto } from './dto/create-wabla.dto';
import { UpdateWablaDto } from './dto/update-wabla.dto';
export declare class WablasController {
    private readonly wablasService;
    constructor(wablasService: WablasService);
    sendWhatsapp(body: any): Promise<{
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
    create(createWablaDto: CreateWablaDto): Promise<CreateWablaDto & import("./entities/wabla.entity").WablaEntity>;
    findAll(): Promise<import("./entities/wabla.entity").WablaEntity[]>;
    findOne(id: string): Promise<import("./entities/wabla.entity").WablaEntity>;
    update(id: string, updateWablaDto: UpdateWablaDto): Promise<import("./entities/wabla.entity").WablaEntity>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
