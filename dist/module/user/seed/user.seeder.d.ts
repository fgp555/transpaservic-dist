import { UserService } from 'src/module/user/user.service';
export declare class UserSeederService {
    private readonly userService;
    constructor(userService: UserService);
    seed(): Promise<string>;
    seedUser(): Promise<void>;
}
