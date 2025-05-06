import { MailSeederService } from 'src/module/mail/seed/mail.seeder';
import { OperatorSeederService } from 'src/module/operator/seed/operator.seeder';
import { OrderSeederService } from 'src/module/order/seed/order.seeder';
import { SettingSeed } from 'src/module/setting/seed/setting.seed';
import { WablasSeeder } from 'src/module/wablas/seed/wablas.seeder';
import { OnModuleInit } from '@nestjs/common';
import { UserSeederService } from 'src/module/user/seed/user.seeder';
import { OperatorSeederServiceSQL } from './query/operator.sql';
import { UsersSeederServiceSQL } from './query/users.sql';
export declare class SeederService implements OnModuleInit {
    private readonly operatorSeederService;
    private readonly userSeederService;
    private readonly mailSeederService;
    private readonly orderSeederService;
    private readonly wablasSeederService;
    private readonly settingSeedService;
    private readonly operatorSeederServiceSQL;
    private readonly userSeederServiceSQL;
    constructor(operatorSeederService: OperatorSeederService, userSeederService: UserSeederService, mailSeederService: MailSeederService, orderSeederService: OrderSeederService, wablasSeederService: WablasSeeder, settingSeedService: SettingSeed, operatorSeederServiceSQL: OperatorSeederServiceSQL, userSeederServiceSQL: UsersSeederServiceSQL);
    onModuleInit(): Promise<void>;
    allSeeder(): Promise<{
        operador: void;
        user: void;
        mail: string;
        order: any;
        wablas: string;
        setting: string;
    }>;
}
