import { ArgsOf, Client, Discord, On } from 'discordx';

@Discord()
export default class MessageCreateEvent {
    @On({ event: 'messageCreate' })
    async onMessageCreate([message]: ArgsOf<'messageCreate'>, client: Client) {
        await client.executeCommand(message);
    }
}
