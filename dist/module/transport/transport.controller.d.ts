import { TransportService } from './transport.service';
import { CreateTransportDto } from './dto/create-transport.dto';
import { UpdateTransportDto } from './dto/update-transport.dto';
export declare class TransportController {
    private readonly transportService;
    constructor(transportService: TransportService);
    create(createTransportDto: CreateTransportDto): Promise<import("./entities/transport.entity").TransportEntity[]>;
    findAll(): Promise<import("./entities/transport.entity").TransportEntity[]>;
    findByName(name: string): Promise<import("./entities/transport.entity").TransportEntity[]>;
    findOne(id: string): Promise<import("./entities/transport.entity").TransportEntity>;
    update(id: string, updateTransportDto: UpdateTransportDto): Promise<import("./entities/transport.entity").TransportEntity>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
