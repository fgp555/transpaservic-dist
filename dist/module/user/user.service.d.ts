import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
export declare class UserService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findByEmail(email: string): Promise<UserEntity | null>;
    findOneEmail(email: string): Promise<UserEntity>;
    findOne(id: string): Promise<UserEntity>;
    findByIdforSeeder(userId: number): Promise<UserEntity | null>;
    findByRole(role: 'admin' | 'user' | 'professional', orderBy: string, order: 'ASC' | 'DESC', limit?: number): Promise<UserEntity[]>;
    update(id: string, body: any): Promise<UserEntity>;
    remove(id: string): Promise<UserEntity>;
}
