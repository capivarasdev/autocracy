import { Config } from './config.interface';

export interface ConfigLoader {
    load(): Config;
    // updateParam(param: string, value: string): Promise<boolean>;
}
