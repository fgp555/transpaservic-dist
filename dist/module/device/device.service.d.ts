import { DeviceEntity } from './entities/device.entity';
import { Repository } from 'typeorm';
export declare class DeviceService {
    private deviceRepository;
    constructor(deviceRepository: Repository<DeviceEntity>);
    register(createDeviceDto: any): Promise<any>;
    findAll(): Promise<DeviceEntity[]>;
}
