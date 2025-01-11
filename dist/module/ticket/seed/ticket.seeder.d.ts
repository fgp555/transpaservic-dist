import { Repository } from 'typeorm';
import { TicketEntity } from 'src/module/ticket/entities/ticket.entity';
export declare class TicketSeederService {
    private readonly ticketRepository;
    constructor(ticketRepository: Repository<TicketEntity>);
    seed(): Promise<void>;
}
