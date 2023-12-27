import { REST, Routes } from "discord.js";

const rest = new REST().setToken(process.env.DISCORD_TOKEN);

const botAppId = process.env.APP_ID;
const guildId = process.env.GUILD_ID;

console.log("Deleting slash commands");

// Delete Guild Commands
if (guildId) {
  rest
    .put(Routes.applicationGuildCommands(botAppId, guildId), { body: [] })
    .then(() => console.log("Successfully deleted all guild commands."))
    .catch(console.error);
}

// Delete Global Commands
rest
  .put(Routes.applicationCommands(botAppId), { body: [] })
  .then(() => console.log("Successfully deleted all application commands."))
  .catch(console.error);
