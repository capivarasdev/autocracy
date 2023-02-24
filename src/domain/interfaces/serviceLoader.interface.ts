import { Bot } from '../bot';

interface ServiceLoader {
    readonly dirname: string;
    readonly target: string;
    filesLoaded: number;
    load(bot: Bot): void;
}
export default ServiceLoader;
