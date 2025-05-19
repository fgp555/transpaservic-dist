import { PatientService } from './patient.service';
export declare class PatientController {
    private readonly patientService;
    constructor(patientService: PatientService);
    create(createTempDto: any, files: Express.Multer.File[]): Promise<any>;
    findAll(): Promise<import("./entities/patient.entity").PatientEntity[]>;
    checkImgExist(): Promise<void>;
    findOneById(id: string): Promise<import("./entities/patient.entity").PatientEntity>;
    findOneByDNI(dni: string): void;
    update(id: string, updateTempDto: any): Promise<import("typeorm").UpdateResult>;
    registerTravel(id: number, updateTempDto: any): Promise<import("./entities/patient.entity").PatientEntity>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
