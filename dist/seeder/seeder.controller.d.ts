import { MailSeederService } from 'src/module/mail/seed/mail.seeder';
import { OperatorSeederService } from 'src/module/operator/seed/operator.seeder';
import { OrderSeederService } from 'src/module/order/seed/order.seeder';
import { SettingSeed } from 'src/module/setting/seed/setting.seed';
import { WablasSeeder } from 'src/module/wablas/seed/wablas.seeder';
import { SeederService } from './seeder.service';
import { UserSeederService } from 'src/module/user/seed/user.seeder';
export declare class SeederController {
    private readonly operatorSeederService;
    private readonly userSeederService;
    private readonly mailSeederService;
    private readonly orderSeederService;
    private readonly wablasSeederService;
    private readonly settingSeedService;
    private readonly seederService;
    constructor(operatorSeederService: OperatorSeederService, userSeederService: UserSeederService, mailSeederService: MailSeederService, orderSeederService: OrderSeederService, wablasSeederService: WablasSeeder, settingSeedService: SettingSeed, seederService: SeederService);
    allSeeder(): Promise<{
        operador: void;
        user: void;
        mail: string;
        order: any;
        wablas: string;
        setting: string;
    }>;
    operatorSeeder(): Promise<string>;
    userSeeder(): Promise<string>;
    mailSeeder(): Promise<string>;
    orderSeeder(): Promise<string>;
    wablasSeeder(): Promise<string>;
    settingSeed(): Promise<string>;
}
