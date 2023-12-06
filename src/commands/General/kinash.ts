import { Category } from "@discordx/utilities";
import type { CommandInteraction, Message } from "discord.js";
import { Guild } from "discordx";

import { Discord, Slash } from "@decorators";

@Discord()
@Guild('929170974262313021')
@Category('General')
export default class KinashCommand {
    @Slash({
        name: 'kinash'
    })
    async kinash(
        interaction: CommandInteraction,
    ) {
        const message = (await interaction.followUp({
            content: "Escurecendo...",
            fetchReply: true
        })) as Message;

        await message.edit("https://tenor.com/view/mario-sonic-kiss-make-out-make-love-gif-17857994");
    }
}
