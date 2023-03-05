import { Client, Discord, Once } from 'discordx';

@Discord()
export default class ReadyEvent {
    @Once({ event: 'ready' })
    async onReady([client]: [Client]) {
        await client.initApplicationCommands();

        const botName = client.user?.tag;
        console.log(`Bot "${botName}" connected!`);
    }
}
