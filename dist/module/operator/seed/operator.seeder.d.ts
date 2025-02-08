import { Repository } from 'typeorm';
import { OperatorEntity } from '../entities/operator.entity';
export declare class OperatorSeederService {
    private readonly operatorRepository;
    constructor(operatorRepository: Repository<OperatorEntity>);
    seed(): Promise<void>;
}
