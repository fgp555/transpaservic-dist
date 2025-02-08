import { Repository } from 'typeorm';
import { SettingEntity } from './entities/setting.entity';
export declare class SettingsService {
    private settingsRepository;
    constructor(settingsRepository: Repository<SettingEntity>);
    getSettingAll(): Promise<SettingEntity[]>;
    getSetting(key: string): Promise<string | null>;
    setSetting(key: string, value: string): Promise<void>;
    updateSetting(key: string, value: string): Promise<void>;
    deleteSetting(key: string): Promise<void>;
}
