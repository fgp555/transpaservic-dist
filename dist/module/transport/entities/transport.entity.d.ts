import { TicketEntity } from 'src/module/ticket/entities/ticket.entity';
import { UserEntity } from 'src/module/user/entities/user.entity';
export declare class TransportEntity {
    id: number;
    name: string;
    username: string;
    whatsapp: string;
    email: string;
    website: string;
    image: string;
    registrationDate: Date;
    tickets: TicketEntity;
    users: UserEntity;
}
