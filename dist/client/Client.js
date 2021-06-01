"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_akairo_1 = require("discord-akairo");
const path_1 = require("path");
const Config_1 = require("../Config");
class BotClient extends discord_akairo_1.AkairoClient {
    constructor(config) {
        super({
            ownerID: config.owners
        });
        this.listenerHandler = new discord_akairo_1.ListenerHandler(this, {
            directory: path_1.join(__dirname, "..", "listeners")
        });
        this.commandHandler = new discord_akairo_1.CommandHandler(this, {
            directory: path_1.join(__dirname, "..", "commands"),
            prefix: Config_1.prefix,
            allowMention: true,
            handleEdits: true,
            commandUtil: true,
            commandUtilLifetime: 3e5,
            defaultCooldown: 6e4,
            argumentDefaults: {
                prompt: {
                    modifyStart: (_, str) => `${str}\n\nType \`cancel\` untuk membatalkan command`,
                    modifyRetry: (_, str) => `${str}\n\nType \`cancel\` untuk membatalkan command`,
                    timeout: "TIMEOUT !!",
                    ended: "ENDED !!",
                    cancel: "Command telah dicancel",
                    retries: 2,
                    time: 3e4
                },
                otherwise: ""
            },
            ignorePermissions: Config_1.owners
        });
        this.config = config;
    }
    async _init() {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.listenerHandler.setEmitters({
            commandHandler: this.commandHandler,
            listenerHandler: this.listenerHandler,
            process
        });
        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
    }
    async start() {
        await this._init();
        return this.login(this.config.token);
    }
}
exports.default = BotClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NsaWVudC9DbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBK0U7QUFJL0UsK0JBQTRCO0FBQzVCLHNDQUEyQztBQWMzQyxNQUFxQixTQUFVLFNBQVEsNkJBQVk7SUE2Qi9DLFlBQW1CLE1BQWtCO1FBRWpDLEtBQUssQ0FBQztZQUNGLE9BQU8sRUFBRSxNQUFNLENBQUMsTUFBTTtTQUN6QixDQUFDLENBQUM7UUEvQkEsb0JBQWUsR0FBb0IsSUFBSSxnQ0FBZSxDQUFDLElBQUksRUFBRTtZQUNoRSxTQUFTLEVBQUUsV0FBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDO1NBQ2hELENBQUMsQ0FBQztRQUVJLG1CQUFjLEdBQW1CLElBQUksK0JBQWMsQ0FBQyxJQUFJLEVBQUU7WUFDN0QsU0FBUyxFQUFFLFdBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQztZQUM1QyxNQUFNLEVBQUUsZUFBTTtZQUNkLFlBQVksRUFBRSxJQUFJO1lBQ2xCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLG1CQUFtQixFQUFFLEdBQUc7WUFDeEIsZUFBZSxFQUFFLEdBQUc7WUFDcEIsZ0JBQWdCLEVBQUU7Z0JBQ2QsTUFBTSxFQUFFO29CQUNKLFdBQVcsRUFBRSxDQUFDLENBQVUsRUFBRSxHQUFXLEVBQVUsRUFBRSxDQUFDLEdBQUcsR0FBRywrQ0FBK0M7b0JBQ3ZHLFdBQVcsRUFBRSxDQUFDLENBQVUsRUFBRSxHQUFXLEVBQVUsRUFBRSxDQUFDLEdBQUcsR0FBRywrQ0FBK0M7b0JBQ3ZHLE9BQU8sRUFBRSxZQUFZO29CQUNyQixLQUFLLEVBQUUsVUFBVTtvQkFDakIsTUFBTSxFQUFFLHdCQUF3QjtvQkFDaEMsT0FBTyxFQUFFLENBQUM7b0JBQ1YsSUFBSSxFQUFFLEdBQUc7aUJBQ1o7Z0JBQ0QsU0FBUyxFQUFFLEVBQUU7YUFDaEI7WUFDRCxpQkFBaUIsRUFBRSxlQUFNO1NBQzVCLENBQUMsQ0FBQztRQVFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ3pCLENBQUM7SUFFTyxLQUFLLENBQUMsS0FBSztRQUNmLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDO1lBQzdCLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYztZQUNuQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsT0FBTztTQUNWLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRU0sS0FBSyxDQUFDLEtBQUs7UUFDZCxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQ0o7QUFyREQsNEJBcURDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWthaXJvQ2xpZW50LCBDb21tYW5kSGFuZGxlciwgTGlzdGVuZXJIYW5kbGVyIH0gZnJvbSBcImRpc2NvcmQtYWthaXJvXCI7XHJcbmltcG9ydCB7IEludGVudHMgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5pbXBvcnQgeyBVc2VyLCBNZXNzYWdlIH0gZnJvbSBcImRpc2NvcmQuanNcIjtcclxuaW1wb3J0IHsgcHJvbWlzZXMgfSBmcm9tIFwiZG5zXCI7XHJcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgeyBwcmVmaXgsIG93bmVycyB9IGZyb20gXCIuLi9Db25maWdcIjtcclxuXHJcbmRlY2xhcmUgbW9kdWxlIFwiZGlzY29yZC1ha2Fpcm9cIiB7XHJcbiAgICBpbnRlcmZhY2UgQWthaXJvQ2xpZW50IHtcclxuICAgICAgICBjb21tYW5kSGFuZGxlcjogQ29tbWFuZEhhbmRsZXI7XHJcbiAgICAgICAgbGlzdGVuZXJIYW5kbGVyOiBMaXN0ZW5lckhhbmRsZXI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmludGVyZmFjZSBCb3RPcHRpb25zIHtcclxuICAgIHRva2VuPzogc3RyaW5nO1xyXG4gICAgb3duZXJzPzogc3RyaW5nIHwgc3RyaW5nW107XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvdENsaWVudCBleHRlbmRzIEFrYWlyb0NsaWVudCB7XHJcbiAgICBwdWJsaWMgY29uZmlnOiBCb3RPcHRpb25zO1xyXG4gICAgcHVibGljIGxpc3RlbmVySGFuZGxlcjogTGlzdGVuZXJIYW5kbGVyID0gbmV3IExpc3RlbmVySGFuZGxlcih0aGlzLCB7XHJcbiAgICAgICAgZGlyZWN0b3J5OiBqb2luKF9fZGlybmFtZSwgXCIuLlwiLCBcImxpc3RlbmVyc1wiKVxyXG4gICAgfSk7XHJcblxyXG4gICAgcHVibGljIGNvbW1hbmRIYW5kbGVyOiBDb21tYW5kSGFuZGxlciA9IG5ldyBDb21tYW5kSGFuZGxlcih0aGlzLCB7XHJcbiAgICAgICAgZGlyZWN0b3J5OiBqb2luKF9fZGlybmFtZSwgXCIuLlwiLCBcImNvbW1hbmRzXCIpLFxyXG4gICAgICAgIHByZWZpeDogcHJlZml4LFxyXG4gICAgICAgIGFsbG93TWVudGlvbjogdHJ1ZSxcclxuICAgICAgICBoYW5kbGVFZGl0czogdHJ1ZSxcclxuICAgICAgICBjb21tYW5kVXRpbDogdHJ1ZSxcclxuICAgICAgICBjb21tYW5kVXRpbExpZmV0aW1lOiAzZTUsXHJcbiAgICAgICAgZGVmYXVsdENvb2xkb3duOiA2ZTQsXHJcbiAgICAgICAgYXJndW1lbnREZWZhdWx0czoge1xyXG4gICAgICAgICAgICBwcm9tcHQ6IHtcclxuICAgICAgICAgICAgICAgIG1vZGlmeVN0YXJ0OiAoXzogTWVzc2FnZSwgc3RyOiBzdHJpbmcpOiBzdHJpbmcgPT4gYCR7c3RyfVxcblxcblR5cGUgXFxgY2FuY2VsXFxgIHVudHVrIG1lbWJhdGFsa2FuIGNvbW1hbmRgLFxyXG4gICAgICAgICAgICAgICAgbW9kaWZ5UmV0cnk6IChfOiBNZXNzYWdlLCBzdHI6IHN0cmluZyk6IHN0cmluZyA9PiBgJHtzdHJ9XFxuXFxuVHlwZSBcXGBjYW5jZWxcXGAgdW50dWsgbWVtYmF0YWxrYW4gY29tbWFuZGAsXHJcbiAgICAgICAgICAgICAgICB0aW1lb3V0OiBcIlRJTUVPVVQgISFcIixcclxuICAgICAgICAgICAgICAgIGVuZGVkOiBcIkVOREVEICEhXCIsXHJcbiAgICAgICAgICAgICAgICBjYW5jZWw6IFwiQ29tbWFuZCB0ZWxhaCBkaWNhbmNlbFwiLFxyXG4gICAgICAgICAgICAgICAgcmV0cmllczogMixcclxuICAgICAgICAgICAgICAgIHRpbWU6IDNlNFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvdGhlcndpc2U6IFwiXCJcclxuICAgICAgICB9LFxyXG4gICAgICAgIGlnbm9yZVBlcm1pc3Npb25zOiBvd25lcnNcclxuICAgIH0pO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb25maWc6IEJvdE9wdGlvbnMpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICBvd25lcklEOiBjb25maWcub3duZXJzXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuY29uZmlnID0gY29uZmlnO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBwcml2YXRlIGFzeW5jIF9pbml0KCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIHRoaXMuY29tbWFuZEhhbmRsZXIudXNlTGlzdGVuZXJIYW5kbGVyKHRoaXMubGlzdGVuZXJIYW5kbGVyKTtcclxuICAgICAgICB0aGlzLmxpc3RlbmVySGFuZGxlci5zZXRFbWl0dGVycyh7XHJcbiAgICAgICAgICAgIGNvbW1hbmRIYW5kbGVyOiB0aGlzLmNvbW1hbmRIYW5kbGVyLFxyXG4gICAgICAgICAgICBsaXN0ZW5lckhhbmRsZXI6IHRoaXMubGlzdGVuZXJIYW5kbGVyLFxyXG4gICAgICAgICAgICBwcm9jZXNzXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5jb21tYW5kSGFuZGxlci5sb2FkQWxsKCk7XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lckhhbmRsZXIubG9hZEFsbCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhc3luYyBzdGFydCgpOiBQcm9taXNlPHN0cmluZz4ge1xyXG4gICAgICAgIGF3YWl0IHRoaXMuX2luaXQoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5sb2dpbih0aGlzLmNvbmZpZy50b2tlbik7XHJcbiAgICB9XHJcbn0iXX0=