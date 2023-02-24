import fs from 'fs';
import { join } from 'path';

import { Bot } from '../bot';
import { EVENTS_FOLDER_PATH } from 'src/contants';
import ServiceLoader from '@interfaces/serviceLoader.interface';

class EventsLoader implements ServiceLoader {
    public readonly dirname: string;
    public readonly target: string = EVENTS_FOLDER_PATH;
    public filesLoaded = 0;

    constructor(dirname: string) {
        this.dirname = dirname;
    }
    public load(bot: Bot) {
        const directory: string = join(this.dirname, this.target);
        const eventFiles: string[] = fs
            .readdirSync(directory)
            .filter((file) => file.endsWith('.ts'));
        for (const file of eventFiles) {
            const event = require(`${directory}/${file}`);
            bot.events.set(event.name, event);
            bot.on(event.trigger, event.execute.bind(null, bot));
        }
    }
}
export default EventsLoader;
