import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
export declare class DeviceController {
    private readonly deviceService;
    constructor(deviceService: DeviceService);
    register(createDeviceDto: CreateDeviceDto): Promise<any>;
    findAll(): Promise<import("./entities/device.entity").DeviceEntity[]>;
}
