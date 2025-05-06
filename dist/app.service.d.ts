export declare class AppService {
    private getFormattedDate;
    build(): {
        build_dist: {
            stats_modify_time: Date;
            local?: undefined;
            utc?: undefined;
        } | {
            local: string;
            utc: string;
            stats_modify_time?: undefined;
        };
        build_index: {
            stats_modify_time: Date;
            local?: undefined;
            utc?: undefined;
        } | {
            local: string;
            utc: string;
            stats_modify_time?: undefined;
        };
    };
}
