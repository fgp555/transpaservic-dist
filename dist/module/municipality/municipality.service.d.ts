import { CreateMunicipalityDto } from './dto/create-municipality.dto';
import { UpdateMunicipalityDto } from './dto/update-municipality.dto';
import { MunicipalityEntity } from './entities/municipality.entity';
import { Repository } from 'typeorm';
export declare class MunicipalityService {
    private readonly municipalityRepository;
    constructor(municipalityRepository: Repository<MunicipalityEntity>);
    create(createMunicipalityDto: CreateMunicipalityDto): Promise<MunicipalityEntity>;
    findAll(): Promise<MunicipalityEntity[]>;
    findOne(id: number): Promise<MunicipalityEntity>;
    update(id: number, updateMunicipalityDto: UpdateMunicipalityDto): Promise<MunicipalityEntity>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
