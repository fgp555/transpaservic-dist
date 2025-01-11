import { TicketSeederService } from 'src/module/ticket/seed/ticket.seeder';
import { TransportSeederService } from 'src/module/transport/seed/transport.seeder';
import { UserSeederService } from 'src/module/user/seed/user.seeder';
export declare class SeederModule {
    private readonly transportSeederService;
    private readonly userSeederService;
    private readonly ticketSeederService;
    constructor(transportSeederService: TransportSeederService, userSeederService: UserSeederService, ticketSeederService: TicketSeederService);
    private seed;
}
