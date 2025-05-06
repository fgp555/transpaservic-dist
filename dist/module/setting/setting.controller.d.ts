import { SettingsService } from './setting.service';
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    getSettingAll(): Promise<import("./entities/setting.entity").SettingEntity[]>;
    findOne(key: string): Promise<import("./entities/setting.entity").SettingEntity>;
    getSettingKey(key: string): Promise<{
        value: string;
    }>;
    setSetting(body: {
        key: string;
        type: string;
        value: string;
    }): Promise<{
        message: string;
    }>;
    updateSetting(key: string, body: {
        value: any;
    }): Promise<{
        message: string;
    }>;
    deleteSetting(key: string): Promise<{
        message: string;
    }>;
}
