import { Client, ClientOptions, Collection, IntentsBitField } from 'discord.js';
import { Command } from '@interfaces/command.interface';
import { Event } from '@interfaces/event.interface';
import { ConfigLoader } from '@interfaces/configLoader.interface';
import CommandsLoader from './loaders/commands.loader';
import EventsLoader from './loaders/events.loader';
import { Logger } from './loggers/logger';
import { ConfigJSONLoader } from './loaders/configJson.loader';
import { consoleLogger } from './loggers/console.logger';
import { Config } from '@interfaces/config.interface';

const botOptions: ClientOptions = {
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.MessageContent,

        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildMessageTyping,
        IntentsBitField.Flags.GuildEmojisAndStickers,

        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildInvites,
        // IntentsBitField.Flags.GuildBans,

        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.GuildVoiceStates,
        IntentsBitField.Flags.GuildWebhooks,

        IntentsBitField.Flags.DirectMessages,
        IntentsBitField.Flags.DirectMessageReactions,
        IntentsBitField.Flags.DirectMessageReactions,
    ],
    // partials: ['USER', 'CHANNEL', 'GUILD_MEMBER', 'REACTION', 'MESSAGE'],
};

class Bot extends Client {
    /**
     * Intents are what our bot can do, this template list all
     * the intents that discord api has, so remove what you're not using!
     *
     * Look at the discord api to see what can do every intent.
     * @see https://discord.com/developers/docs/topics/gateway#list-of-intents
     */

    /**
     * The client of our bot (Using Client class from discord.js)
     */
    public readonly unknown: string = 'Unkown-Bot';
    public config = {} as Config;
    private readonly configLoader: ConfigLoader = new ConfigJSONLoader();

    public readonly logger: Logger = new consoleLogger();

    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();

    private commandLoader: CommandsLoader = new CommandsLoader(__dirname);
    private eventLoader: EventsLoader = new EventsLoader(__dirname);

    /**
     * Public constructor of the bot,
     * - Require a bot token
     * - If options is not specified, bot will have all intents by default
     * @param token
     * @param options
     *
     * @see https://discord.com/developers/docs/intro
     */

    public constructor(token: string, options?: ClientOptions) {
        super(options != undefined ? options : botOptions);
        this.token = token;
        this.config = this.configLoader.load();
    }
    public start() {
        this.login(this.token ? this.token : '');
        this.load();
    }

    private load() {
        this.commandLoader.load(this);
        if (this.commands.size != 0)
            this.logger.success(`Loaded ${this.commands.size} commands!`);
        else this.logger.warning(`Loaded ${this.commands.size} commands!`);

        this.eventLoader.load(this);
        if (this.events.size != 0)
            this.logger.success(`Loaded ${this.events.size} events!`);
        else this.logger.warning(`Loaded ${this.events.size} events!`);
    }

    // public updateConfig(param: string, value: string): void {
    //     this.configLoader.updateParam(param, value);
    //     this.config = this.configLoader.load();
    // }
}
export { Bot };
