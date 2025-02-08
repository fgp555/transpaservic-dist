import { OrderSeederService } from 'src/module/order/seed/order.seeder';
import { OperatorSeederService } from 'src/module/operator/seed/operator.seeder';
import { UserSeederService } from 'src/module/user/seed/user.seeder';
import { WablasSeeder } from 'src/module/wablas/seed/wablas.seeder';
import { SettingSeed } from 'src/module/setting/seed/setting.seed';
import { MailSeederService } from 'src/module/mail/seed/mail.seeder';
export declare class SeederModule {
    private readonly operatorSeederService;
    private readonly userSeederService;
    private readonly mailSeederService;
    private readonly orderSeederService;
    private readonly wablasSeeder;
    private readonly settingSeed;
    constructor(operatorSeederService: OperatorSeederService, userSeederService: UserSeederService, mailSeederService: MailSeederService, orderSeederService: OrderSeederService, wablasSeeder: WablasSeeder, settingSeed: SettingSeed);
    private seed;
}
