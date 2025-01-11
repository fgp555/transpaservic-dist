import { Repository } from 'typeorm';
import { MunicipalityEntity } from '../entities/municipality.entity';
export declare class MunicipalitySeederService {
    private readonly municipalityRepository;
    constructor(municipalityRepository: Repository<MunicipalityEntity>);
    seed(): Promise<void>;
}
