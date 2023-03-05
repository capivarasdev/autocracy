import { GatewayIntentBits, Partials } from "discord.js";

export const clientConfig = {
    botGuilds: undefined,

    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ],

    partials: [
        Partials.Channel
    ],

    silent: false,

    simpleCommand: {
        prefix: "!"
    }
};