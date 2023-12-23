import { SlashCommandBuilder } from "discord.js";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} from "@discordjs/voice";

function selectRandomGreetingSoundClip() {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const soundsPath = path.join(__dirname, "../sounds/greetings");
  const soundFiles = fs
    .readdirSync(soundsPath)
    .filter((file) => file !== "example.mp3");
  const randomIndex = Math.floor(Math.random() * soundFiles.length);

  return path.join(soundsPath, soundFiles[randomIndex]);
}

const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

export default {
  data: new SlashCommandBuilder()
    .setName("activate")
    .setDescription("Activates the LarsBot voice subroutines"),
  async execute(interaction) {
    // console.log(interaction);

    const client = interaction.client;
    const userId = interaction.user.id;

    const guild = await client.guilds.fetch(interaction.guildId);
    const user = guild.voiceStates.cache.get(userId);

    if (user && user.channelId) {
      await interaction.reply({
        content: "LarsBot voice activated",
        ephemeral: true,
      });

      const channel = await guild.channels.fetch(user.channelId);
      const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
      });

      // TODO wait a random amount of time for realism
      await wait(3000);

      const clip = selectRandomGreetingSoundClip();
      console.log(clip);
      const audioPlayer = createAudioPlayer();
      const file = createAudioResource(clip);
      connection.subscribe(audioPlayer);
      audioPlayer.play(file);

      // TODO stay in the channel and play other voice lines after random amounts of time
      setTimeout(() => {
        connection.destroy();
      }, 5000);
    } else {
      await interaction.reply("what's going on?");
    }
  },
};
