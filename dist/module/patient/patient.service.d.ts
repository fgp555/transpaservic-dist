import { PatientEntity } from './entities/patient.entity';
import { Repository } from 'typeorm';
import { TravelDatesEntity } from './entities/travelDates.entity';
export declare class PatientService {
    private readonly patientRepository;
    private readonly travelDatesRepository;
    constructor(patientRepository: Repository<PatientEntity>, travelDatesRepository: Repository<TravelDatesEntity>);
    create(createTempDto: any): Promise<any>;
    findAll(): Promise<PatientEntity[]>;
    findOneById(id: number): Promise<PatientEntity>;
    update(id: number, updateTempDto: any): Promise<import("typeorm").UpdateResult>;
    registerTravel(id: number, updateTempDto: any): Promise<PatientEntity>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
