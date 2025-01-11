import { OrderSeederService } from 'src/module/order/seed/order.seeder';
import { OperatorSeederService } from 'src/module/operator/seed/operator.seeder';
import { UserSeederService } from 'src/module/user/seed/user.seeder';
import { WablasSeeder } from 'src/module/wablas/seed/wablas.seeder';
export declare class SeederModule {
    private readonly operatorSeederService;
    private readonly userSeederService;
    private readonly orderSeederService;
    private readonly wablasSeeder;
    constructor(operatorSeederService: OperatorSeederService, userSeederService: UserSeederService, orderSeederService: OrderSeederService, wablasSeeder: WablasSeeder);
    private seed;
}
