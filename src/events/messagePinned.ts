import { Discord, On } from "@decorators";
import { Message } from "discord.js";

@Discord()
export default class messagePinnedEvent {

    @On('messagePinned')
    async messagePinnedHandler(
        [message]: [Message]
    ) {
        console.log(`This message from ${message.author.tag} has been pinned : ${message.content}`);
    }
}