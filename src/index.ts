import { Bot } from './domain/bot';
import 'dotenv/config';

let discordBot: Bot;

if (!process.env.BOT_TOKEN) {
    console.log('BOT_TOKEN not found!');
} else {
    discordBot = new Bot(process.env.BOT_TOKEN);
    discordBot.start();
}
