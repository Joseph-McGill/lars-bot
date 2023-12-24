import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("See if LarsBot is online"),
  async execute(interaction) {
    await interaction.reply({
      content: "LarsBot is online",
      ephemeral: true,
    });
  },
};
