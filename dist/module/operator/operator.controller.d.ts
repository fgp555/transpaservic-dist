import { OperatorService } from './operator.service';
import { CreateOperatorDto } from './dto/create-operator.dto';
import { UpdateOperatorDto } from './dto/update-operator.dto';
export declare class OperatorController {
    private readonly operatorService;
    constructor(operatorService: OperatorService);
    create(createOperatorDto: CreateOperatorDto): Promise<import("./entities/operator.entity").OperatorEntity[]>;
    findAll(page?: number, limit?: number, search?: string): Promise<{
        results: import("./entities/operator.entity").OperatorEntity[];
        total: number;
        totalPages: number;
    }>;
    findByName(name: string): Promise<import("./entities/operator.entity").OperatorEntity[]>;
    findOne(id: string): Promise<import("./entities/operator.entity").OperatorEntity>;
    update(id: string, updateOperatorDto: UpdateOperatorDto): Promise<import("./entities/operator.entity").OperatorEntity>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
