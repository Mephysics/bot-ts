import { AkairoClient, CommandHandler, ListenerHandler } from "discord-akairo";
import { Intents } from "discord.js";
import { User, Message } from "discord.js";
import { promises } from "dns";
import { join } from "path";
import { prefix, owners } from "../Config";

declare module "discord-akairo" {
    interface AkairoClient {
        commandHandler: CommandHandler;
        listenerHandler: ListenerHandler;
    }
}

interface BotOptions {
    token?: string;
    owners?: string | string[];
}

export default class BotClient extends AkairoClient {
    public config: BotOptions;
    public listenerHandler: ListenerHandler = new ListenerHandler(this, {
        directory: join(__dirname, "..", "listeners")
    });

    public commandHandler: CommandHandler = new CommandHandler(this, {
        directory: join(__dirname, "..", "commands"),
        prefix: prefix,
        allowMention: true,
        handleEdits: true,
        commandUtil: true,
        commandUtilLifetime: 3e5,
        defaultCooldown: 6e4,
        argumentDefaults: {
            prompt: {
                modifyStart: (_: Message, str: string): string => `${str}\n\nType \`cancel\` untuk membatalkan command`,
                modifyRetry: (_: Message, str: string): string => `${str}\n\nType \`cancel\` untuk membatalkan command`,
                timeout: "TIMEOUT !!",
                ended: "ENDED !!",
                cancel: "Command telah dicancel",
                retries: 2,
                time: 3e4
            },
            otherwise: ""
        },
        ignorePermissions: owners
    });

    public constructor(config: BotOptions) {

        super({
            ownerID: config.owners
        });

        this.config = config;
    }
    
    private async _init(): Promise<void> {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process
        });
        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }

    public async start(): Promise<string> {
        await this._init();
        return this.login(this.config.token);
    }
}