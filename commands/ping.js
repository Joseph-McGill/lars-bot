import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies to you"),
  async execute(interation) {
    await interation.reply("hey man what's going on");
  },
};
