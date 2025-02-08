import { SettingsService } from '../setting.service';
export declare class SettingSeed {
    private readonly settingService;
    constructor(settingService: SettingsService);
    seed(): Promise<void>;
}
