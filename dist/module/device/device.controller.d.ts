import { DeviceService } from './device.service';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
export declare class DeviceController {
    private readonly deviceService;
    constructor(deviceService: DeviceService);
    create(createDeviceDto: CreateDeviceDto): Promise<any>;
    findAll(): Promise<import("./entities/device.entity").DeviceEntity[]>;
    findOne(id: string): string;
    update(id: string, updateDeviceDto: UpdateDeviceDto): string;
    remove(id: string): string;
}
