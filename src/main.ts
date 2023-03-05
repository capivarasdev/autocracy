import 'dotenv/config';
import 'reflect-metadata';

import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { clientConfig } from './client';
import { Client, DIService, tsyringeDependencyRegistryEngine } from 'discordx';
import discordLogs from 'discord-logs';
import { importx } from '@discordx/importer';

async function run() {
    // Initiate the database client.
    container.register<PrismaClient>('PrismaClient', {
        useValue: new PrismaClient()
    });

    // Set tsyringe injector for discordx.
    DIService.engine = tsyringeDependencyRegistryEngine.setInjector(container);

    // Initiate the client.
    const client = new Client(clientConfig);

    // Load all new events added by discord-logs.
    discordLogs(client, { debug: false });

    // Register new discordx Client instance using tsyringe.
    container.registerInstance(Client, client);

    // Import all events and commands from their directories.
    await importx(__dirname + '/{events,commands}/**/*.{ts,js}');

    // Start the bot.
    const BOT_TOKEN = process.env.BOT_TOKEN || '';
    await client.login(BOT_TOKEN);
}

run();
