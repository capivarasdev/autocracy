import { Execute } from "../../domain/interfaces/event.interface";
import { ConsoleLogger } from "../../domain/loggers/console.logger";

export const execute: Execute = async (bot) => {
    const logger = new ConsoleLogger();
    logger.success(`${bot.user?.tag} logged in!`);
};
export const name = 'ready';
export const trigger = 'ready';
export const description = 'notify that bot is logged in';
