import { Repository } from 'typeorm';
import { TravelDatesEntity } from './entities/travelDates.entity';
export declare class TravelDatesService {
    private readonly travelDatesRepository;
    constructor(travelDatesRepository: Repository<TravelDatesEntity>);
    findAll(): Promise<TravelDatesEntity[]>;
}
