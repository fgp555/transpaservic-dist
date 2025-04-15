import { TravelDatesService } from './travel.service';
export declare class TravelDatesController {
    private readonly travelDatesService;
    constructor(travelDatesService: TravelDatesService);
    findAll(): Promise<import("./entities/travelDates.entity").TravelDatesEntity[]>;
}
