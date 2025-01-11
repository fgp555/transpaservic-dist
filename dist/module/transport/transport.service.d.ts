import { Repository } from 'typeorm';
import { UpdateTransportDto } from './dto/update-transport.dto';
import { TransportEntity } from './entities/transport.entity';
import { TicketEntity } from '../ticket/entities/ticket.entity';
export declare class TransportService {
    private transportRepository;
    private ticketRepository;
    constructor(transportRepository: Repository<TransportEntity>, ticketRepository: Repository<TicketEntity>);
    create(createTransportDto: any): Promise<TransportEntity[]>;
    findAll(): Promise<TransportEntity[]>;
    findByName(name: string): Promise<TransportEntity[]>;
    findOne(id: number): Promise<TransportEntity>;
    update(id: number, updateTransportDto: UpdateTransportDto): Promise<TransportEntity>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
