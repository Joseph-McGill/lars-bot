import { SlashCommandBuilder } from "discord.js";
import { bot } from "../bot/Bot.js";

export default {
  data: new SlashCommandBuilder()
    .setName("deactivate")
    .setDescription("Deactivate LarsBot reply and voice functionality")
    .setDMPermission(false),
  async execute(interaction) {
    bot.destroyActiveConnection(interaction.guildId);
    await interaction.reply({
      content: "LarsBot deactivated",
      ephemeral: true,
    });
  },
};
