import { DataSource } from 'typeorm';
import * as os from 'os';
import { HttpAdapterHost } from '@nestjs/core';
export declare class InfoService {
    private readonly dataSource;
    private readonly httpAdapterHost;
    constructor(dataSource: DataSource, httpAdapterHost: HttpAdapterHost);
    getSystemInfo(): Promise<{
        nodeVersion: string;
        platform: NodeJS.Platform;
        arch: NodeJS.Architecture;
        memoryUsage: NodeJS.MemoryUsage;
        uptime: number;
        environmentVariables: {
            DB_PASSWORD: string;
            TZ?: string;
        };
        cpuInfo: os.CpuInfo[];
        networkInterfaces: NodeJS.Dict<os.NetworkInterfaceInfo[]>;
        osType: string;
        osRelease: string;
        osTotalMemory: number;
        osFreeMemory: number;
        os_platform: NodeJS.Platform;
        os_release: string;
        os_arch: string;
        os_cpus: number;
        os_uptime: number;
        os_networkInterfaces: NodeJS.Dict<os.NetworkInterfaceInfo[]>;
    }>;
    getServerAndDatabaseTime(): Promise<{
        serverTime: Date;
        databaseTime: any;
    }>;
    getEntitiesInfo(): {
        entityName: string;
        tableName: string;
        columns: {
            columnName: string;
            type: import("typeorm").ColumnType;
            isPrimary: boolean;
            isNullable: boolean;
        }[];
        relations: {
            relationProperty: string;
            type: import("typeorm/metadata/types/RelationTypes").RelationType;
            targetEntity: string;
        }[];
    }[];
    getPackageInfo(): any;
    listAllEndpoints(): any[];
    readEnvFile(): Promise<string>;
    getPerformanceStats(): {
        freeMemory: number;
        totalMemory: number;
        cpuUsage: number[];
        uptime: number;
    };
    getLogs(): {
        message: string;
        logs?: undefined;
    } | {
        logs: string[];
        message?: undefined;
    };
    checkExternalService(): Promise<{
        status: number;
        message: string;
    } | {
        status: string;
        message: string;
    }>;
}
