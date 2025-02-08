import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<UserEntity>;
    findAll(operator?: number, page?: number, limit?: number, search?: string, role?: string): Promise<{
        results: UserEntity[];
        total: number;
        totalPages: number;
    }>;
    findByEmail(email: string): Promise<UserEntity>;
    findByRole(role?: 'admin' | 'user' | 'professional', orderBy?: string, order?: 'ASC' | 'DESC', limit?: number): Promise<UserEntity[]>;
    findOne(id: string): Promise<UserEntity>;
    remove(id: string): Promise<UserEntity>;
}
