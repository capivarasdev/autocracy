import fs from 'fs';
import { join } from 'path';
import ServiceLoader from '../../domain/interfaces/serviceLoader.interface';

import { EVENTS_FOLDER_PATH } from '../../constants';
import { Bot } from '../bot';

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
            .filter((file) => file.endsWith('.ts') || file.endsWith('.js'));
        for (const file of eventFiles) {
            const event = require(`${directory}/${file}`);
            bot.events.set(event.name, event);
            bot.on(event.trigger, event.execute.bind(null, bot));
        }
    }
}
export default EventsLoader;
