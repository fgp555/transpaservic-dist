import { InfoService } from './info.service';
import { Request } from 'express';
export declare class InfoController {
    private readonly infoService;
    constructor(infoService: InfoService);
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
        cpuInfo: import("os").CpuInfo[];
        networkInterfaces: NodeJS.Dict<import("os").NetworkInterfaceInfo[]>;
        osType: string;
        osRelease: string;
        osTotalMemory: number;
        osFreeMemory: number;
        os_platform: NodeJS.Platform;
        os_release: string;
        os_arch: string;
        os_cpus: number;
        os_uptime: number;
        os_networkInterfaces: NodeJS.Dict<import("os").NetworkInterfaceInfo[]>;
    }>;
    getAllEndpoints(): any[];
    getServerAndDatabaseTime(): Promise<{
        serverTime: Date;
        databaseTime: any;
    }>;
    getPackageInfo(): any;
    getServerDomain(request: Request): {
        domain: string;
        protocol: string;
        host: string;
        subdomain: string;
        originalUrl: string;
        baseUrl: string;
        params: import("express-serve-static-core").ParamsDictionary;
        query: import("qs").ParsedQs;
        path: string;
        method: string;
        headers: import("http").IncomingHttpHeaders;
        body: any;
        route: any;
    };
    getCookies(request: Request): {
        cookies: {
            [key: string]: string;
        };
    };
    private parseCookies;
    createEnv(envData: string): Promise<string | {
        message: string;
        error: any;
    }>;
    getEnvFile(): Promise<string>;
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
