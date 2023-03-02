import { Category } from "@discordx/utilities"
import type { CommandInteraction, Message } from "discord.js"
import { Client } from "discordx"

import { Discord, Slash } from "@decorators"

@Discord()
@Category('General')
export default class KinashCommand {
    @Slash({
        name: 'kinash'
    })
    async kinash(
        interaction: CommandInteraction,
        client: Client,
        { localize }: InteractionData
    ) {
        const message = (await interaction.followUp({
            content: "Escurecendo...",
            fetchReply: true
        })) as Message

        await message.edit("https://media.discordapp.net/attachments/1034597308563730543/1063676519492370502/1673670635186.gif")
    }
}
