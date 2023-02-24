import fs from 'fs';
import { join } from 'path';

import { Bot } from '../bot';
import { Command } from '@interfaces/command.interface';
import ServiceLoader from '@interfaces/serviceLoader.interface';
import { COMMANDS_FOLDER_PATH } from 'src/contants';

class CommandsLoader implements ServiceLoader {
    public readonly dirname: string;
    public readonly target: string = COMMANDS_FOLDER_PATH;
    public filesLoaded = 0;

    constructor(dirname: string) {
        this.dirname = dirname;
    }
    public load(bot: Bot) {
        const directory: string = join(this.dirname, this.target);
        const commandsFiles: string[] = fs
            .readdirSync(directory)
            .filter((file) => file.endsWith('.ts'));
        for (const file of commandsFiles) {
            const command: Command = require(`${directory}/${file}`);
            bot.commands.set(command.name, command);
        }
    }
}
export default CommandsLoader;
