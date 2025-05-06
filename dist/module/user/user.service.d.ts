import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { OrderHistoryEntity } from '../order/entities/order-history.entity';
export declare class UserService {
    private readonly userRepository;
    private readonly orderHistoryRepository;
    constructor(userRepository: Repository<UserEntity>, orderHistoryRepository: Repository<OrderHistoryEntity>);
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    findAllSuper(): Promise<UserEntity[]>;
    findAll(filters: {
        operator?: number;
        page: number;
        limit: number;
        search: string;
        role?: string;
    }): Promise<{
        results: UserEntity[];
        total: number;
        totalPages: number;
    }>;
    findByEmail(email: string): Promise<UserEntity | null>;
    findOneEmail(email: string): Promise<UserEntity>;
    findOne(id: string): Promise<UserEntity>;
    findByIdforSeeder(userId: string): Promise<UserEntity | null>;
    findByRole(role: 'admin' | 'user' | 'professional', orderBy: string, order: 'ASC' | 'DESC', limit?: number): Promise<UserEntity[]>;
    update(id: string, body: any): Promise<UserEntity>;
    remove(id: string): Promise<UserEntity>;
    deleteMany(userIds: string[]): Promise<{
        message: string;
        deletedIds: string[];
    }>;
}
