import { WablasService } from '../wablas.service';
export declare class WablasSeeder {
    private readonly wablasService;
    constructor(wablasService: WablasService);
    seed(): Promise<void>;
}
