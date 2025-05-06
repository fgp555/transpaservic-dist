import { Repository } from 'typeorm';
import { SettingEntity } from './entities/setting.entity';
export declare class SettingsService {
    private settingsRepository;
    constructor(settingsRepository: Repository<SettingEntity>);
    getSettingAll(): Promise<SettingEntity[]>;
    findOne(key: string): Promise<SettingEntity | null>;
    getSettingKey(key: string): Promise<string | null>;
    setSetting(key: string, type: string, value: any): Promise<void>;
    updateSetting(key: string, value: any): Promise<void>;
    deleteSetting(key: string): Promise<void>;
}
