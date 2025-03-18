import { UpdateDeviceDto } from './dto/update-device.dto';
import { DeviceEntity } from './entities/device.entity';
import { Repository } from 'typeorm';
export declare class DeviceService {
    private deviceRepository;
    constructor(deviceRepository: Repository<DeviceEntity>);
    create(createDeviceDto: any): Promise<any>;
    findAll(): Promise<DeviceEntity[]>;
    findOne(id: number): string;
    update(id: number, updateDeviceDto: UpdateDeviceDto): string;
    remove(id: number): string;
}
