import { Repository } from 'typeorm';
import { TransportEntity } from '../entities/transport.entity';
export declare class TransportSeederService {
    private readonly transportRepository;
    constructor(transportRepository: Repository<TransportEntity>);
    seed(): Promise<void>;
}
