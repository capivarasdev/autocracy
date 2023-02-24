import { Message } from 'discord.js';
import { Bot } from '../bot';

export interface Execute {
    (client: Bot, message: Message, args?: string[]): Promise<Message<boolean> | undefined>;
}

export interface Command {
    name: string;
    description: string;
    category: string;
    execute: Execute;
}
