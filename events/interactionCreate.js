import { Events } from "discord.js";

export default {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    if (!command) {
      console.error(
        `No command matching ${interaction.commandName} was found.`
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (error) {
      console.error(error);

      const content = {
        content: "There was an error while executing this command!",
        ephemeral: true,
      };
      interaction.replied || interaction.deferred
        ? await interaction.followUp(content)
        : await interaction.reply(content);
    }
  },
};
