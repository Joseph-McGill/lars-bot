import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { REST, Routes, Collection } from "discord.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const commandsPath = path.join(__dirname, "../commands");
const commandFiles = fs.readdirSync(commandsPath);

const commands = [];
const commandNameMap = new Collection();

for (const commandFile of commandFiles) {
  const filePath = path.join(commandsPath, commandFile);
  const { default: command } = await import(filePath);

  if ("data" in command && "execute" in command) {
    const commandName = command.data.name;
    if (commandNameMap.has(commandName)) {
      console.error(`The following commands have the same name, each command must have a unique name:
      ${commandNameMap.get(commandName)}
      ${filePath}`);
      process.exit(1);
    } else {
      commands.push(command.data.toJSON());
      commandNameMap.set(commandName, filePath);
    }
  } else {
    console.error(`Commands must export 'data' and 'execute': ${filePath}`);
  }
}

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log(
      `Starting slash command deploy for ${commands.length} commands`
    );

    const botAppId = process.env.APP_ID;
    const guildId = process.env.GUILD_ID;

    let data;
    if (guildId) {
      // Deploy to specific guild
      data = await rest.put(
        Routes.applicationGuildCommands(botAppId, guildId),
        { body: commands }
      );
    } else {
      // Deploy to all guilds
      data = await rest.put(Routes.applicationCommands(botAppId), {
        body: commands,
      });
    }

    console.log(
      `Successfully deployed ${data.length} slash commands ` +
        (guildId ? `to guild ${guildId}` : `globally`)
    );
  } catch (error) {
    console.log(error);
  }
})();
