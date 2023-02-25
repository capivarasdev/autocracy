import fs from 'fs';
import { Config } from '../../domain/interfaces/config.interface';
import { ConfigLoader } from '../../domain/interfaces/configLoader.interface';
// import { replace } from 'replace-json-property';
import { join } from 'path';

export class ConfigJSONLoader implements ConfigLoader {
    private readonly configPath: string = join(
        __dirname,
        '../../../config/config.json'
    );

    public load(): Config {
        let config = {} as Config;
        const jsonString = fs.readFileSync(this.configPath, 'utf-8');
        config = JSON.parse(jsonString) as Config;
        return config;
    }
    // public updateParam(param: string, value: string): Promise<boolean> {
    //     return replace(this.configPath, param, value);
    // }
}
