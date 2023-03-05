import { ArgsOf, Client, Discord, On } from 'discordx';
import { CommandInteraction } from 'discord.js';

@Discord()
export default class InteractionCreateEvent {
    @On({ event: 'interactionCreate' })
    async onInteractionCreate([interaction]: ArgsOf<'interactionCreate'>, client: Client) {
        if (interaction instanceof CommandInteraction) await interaction.deferReply();

        client.executeInteraction(interaction);
    }
}
