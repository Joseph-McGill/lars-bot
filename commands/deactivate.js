import { SlashCommandBuilder } from "discord.js";
import { bot } from "../index.js";

export default {
  data: new SlashCommandBuilder()
    .setName("deactivate")
    .setDescription("Deactivate LarsBot reply and voice functionality"),
  async execute(interaction) {
    // TODO check if larsbot is currently in a voice channel, if so leave channel. if not stop replying to messages (remove message listener)
    if (bot.activeConnection) {
      bot.activeConnection.destroy();
    }

    await interaction.reply({
      content: "LarsBot deactivated",
      ephemeral: true,
    });
  },
};
