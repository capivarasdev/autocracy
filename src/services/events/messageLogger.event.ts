import { Message } from 'discord.js';
import { Execute } from '@domain/interfaces/event.interface';

export const name = 'messageLogger';
export const trigger = 'messageCreate';
export const description = 'Logs on console all the messages the bot receive';

export const execute: Execute = async (_, message: Message) => {
    console.log(
        `\x1b[33m${message.author.username}\x1b[0m at\x1b[36m #${!message.channel.isDMBased()
            ? `[${message.channel.guild.name}]/${message.channel.name}`
            : 'DirectMessage'
        } \x1b[0m: ${message.content} \n\x1b[36m| > \x1b[31m MessageID: \x1b[32m ${message.id
        }\x1b[0m`
    );
};
