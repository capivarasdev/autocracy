import { Message, TextChannel } from 'discord.js';
import { Bot } from '../../domain/bot';
import { Execute } from '../../domain/interfaces/command.interface';

export const name = 'ping';
export const description = 'This is a description';
export const category = 'None';
export const execute: Execute = async (_: Bot, message: Message, args?: string[]) => {

    if (!message.channel.isTextBased()) return;

    const response = await (message.channel as TextChannel).send(`${message.author} pong🏓!`);
    return response.edit({
        content: `${message.author} pong 🏓! ${(response.createdTimestamp - message.createdTimestamp) / 2}ms`,
    });
};
