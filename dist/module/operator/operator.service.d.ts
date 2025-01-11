import { Repository } from 'typeorm';
import { UpdateOperatorDto } from './dto/update-operator.dto';
import { OperatorEntity } from './entities/operator.entity';
import { OrderEntity } from '../order/entities/order.entity';
export declare class OperatorService {
    private operatorRepository;
    private orderRepository;
    constructor(operatorRepository: Repository<OperatorEntity>, orderRepository: Repository<OrderEntity>);
    create(createOperatorDto: any): Promise<OperatorEntity[]>;
    findAll(filters: {
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        results: OperatorEntity[];
        total: number;
        totalPages: number;
    }>;
    findByName(name: string): Promise<OperatorEntity[]>;
    findOne(id: number): Promise<OperatorEntity>;
    update(id: number, updateOperatorDto: UpdateOperatorDto): Promise<OperatorEntity>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
