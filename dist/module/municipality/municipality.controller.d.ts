import { MunicipalityService } from './municipality.service';
import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
export declare class MunicipalityController {
    private readonly municipalityService;
    constructor(municipalityService: MunicipalityService);
    create(createMunicipalityDto: CreateMunicipalityDto): Promise<import("./entities/municipality.entity").MunicipalityEntity>;
    findAll(): Promise<import("./entities/municipality.entity").MunicipalityEntity[]>;
    findOne(id: string): Promise<import("./entities/municipality.entity").MunicipalityEntity>;
    update(id: string, updateMunicipalityDto: UpdateMunicipalityDto): Promise<import("./entities/municipality.entity").MunicipalityEntity>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
