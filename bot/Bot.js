import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import Discord, { Collection, GatewayIntentBits } from "discord.js";

class Bot {
  client;
  activeConnections = new Collection();

  constructor() {
    this.client = new Discord.Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
      ],
    });

    this.registerEventListeners();
    this.registerSlashCommands();
  }

  getDirName = () => dirname(fileURLToPath(import.meta.url));

  async registerSlashCommands() {
    this.client.commands = new Collection();

    const __dirname = this.getDirName();
    const commandsPath = path.join(__dirname, "../commands");
    const commandFiles = fs.readdirSync(commandsPath);

    for (const commandFile of commandFiles) {
      const filePath = path.join(commandsPath, commandFile);
      const { default: command } = await import(filePath);

      this.client.commands.set(command.data.name, command);
    }
  }

  async registerEventListeners() {
    const __dirname = this.getDirName();
    const eventsPath = path.join(__dirname, "../events");
    const eventFiles = fs.readdirSync(eventsPath);

    for (const eventFile of eventFiles) {
      const filePath = path.join(eventsPath, eventFile);
      const { default: event } = await import(filePath);

      event.once
        ? this.client.once(event.name, (...args) => event.execute(...args))
        : this.client.on(event.name, (...args) => event.execute(...args));
    }
  }

  login() {
    this.client.login(process.env.DISCORD_TOKEN);
  }

  setActiveConnection(guildId, connection) {
    this.activeConnections.set(guildId, connection);
  }

  hasActiveConnection(guildId) {
    return this.activeConnections.has(guildId);
  }

  destroyActiveConnection(guildId) {
    if (this.hasActiveConnection(guildId)) {
      this.activeConnections.get(guildId).destroy();
      this.activeConnections.delete(guildId);
    }
  }
}

export const bot = new Bot();
