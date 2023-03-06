import { PrismaClient } from '@prisma/client';
import { RentryClient } from 'rentry-pastebin';
import { Paste } from 'rentry-pastebin/dist/module/Paste';
import { inject, singleton } from 'tsyringe';

@singleton()
export class Pastebin {
    private client: RentryClient;

    constructor(@inject('PrismaClient') private prisma: PrismaClient) {
        this.client = new RentryClient();
        this.client.createToken();
    }

    async createPaste(content: string, lifetime?: number): Promise<Paste | undefined> {
        // Stop executing function if token isn't generated yet.
        if (!this.client.getToken()) return;

        // Create a new paste with the provided content. Random editCode.
        const paste = await this.client.createPaste({ content });

        // Save the new generated paste id and editCode, plus lifetime to delete from database.
        await this.prisma.pastebin.create({
            data: {
                id: paste.url,
                editCode: paste.editCode,
                lifetime: lifetime ? Math.floor(lifetime) : -1
            }
        });

        return paste.paste;
    }

    async deletePaste(id: string): Promise<void> {
        // Stop executing function if token isn't generated yet.
        if (!this.client.getToken()) return;

        // Retrieve the first paste with the provided id, since id's are unique.
        const paste = await this.prisma.pastebin.findFirst({
            where: {
                id: id
            }
        });

        // Stop executing function if there is no paste found.
        if (!paste) return;

        // Delete paste from the database.
        await this.prisma.pastebin.delete({
            where: {
                id: id,
                editCode: paste.editCode
            }
        });
    }
}
