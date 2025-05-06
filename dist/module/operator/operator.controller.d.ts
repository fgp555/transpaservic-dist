import { OperatorService } from './operator.service';
export declare class OperatorController {
    private readonly operatorService;
    constructor(operatorService: OperatorService);
    uploadSingle(file: Express.Multer.File, body: any): Promise<{
        message: string;
        dataCreate: import("./entities/operator.entity").OperatorEntity[];
    }>;
    findAll(page?: number, limit?: number, search?: string): Promise<{
        total: number;
        totalPages: number;
        results: import("./entities/operator.entity").OperatorEntity[];
    }>;
    findByName(name?: string): Promise<import("./entities/operator.entity").OperatorEntity[]>;
    findOne(id: string): Promise<import("./entities/operator.entity").OperatorEntity>;
    update(id: string, file: Express.Multer.File, body: any): Promise<{
        message: string;
        updatedOperator: import("./entities/operator.entity").OperatorEntity;
    }>;
    deleteMany(deleteOrdersDto: any): Promise<{
        message: string;
        deletedIds: number[];
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
