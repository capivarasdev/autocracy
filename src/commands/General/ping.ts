import { Client, Discord, Slash } from 'discordx';
import { Category } from '@discordx/utilities';
import type { CommandInteraction, Message } from 'discord.js';

@Discord()
@Category('General')
export default class PingCommand {
    @Slash({
        name: 'ping',
        description: 'A simple command that sends "Pong!" back!'
    })
    async pingCommand(interaction: CommandInteraction, client: Client) {
        const message = (await interaction.followUp({
            content: 'Pinging...',
            fetchReply: true
        })) as Message;

        const ping = message.createdTimestamp - interaction.createdTimestamp;
        const heartbeat = client.ws.ping;
        const content = `${interaction.member}, Pong! The message round-trip took ${ping}ms. The heartbeat ping is ${heartbeat}ms.`;
        await message.edit(content);
    }
}
