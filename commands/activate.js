import { Collection, SlashCommandBuilder } from "discord.js";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} from "@discordjs/voice";
import { bot } from "../bot/Bot.js";
import { wait, randomTimeInterval } from "../utils/time.js";

const audioFileCache = new Collection();

function loadSoundClips() {
  const __dirname = dirname(fileURLToPath(import.meta.url));

  const soundsPath = path.join(__dirname, "../sounds");
  const soundFiles = fs
    .readdirSync(soundsPath, { recursive: true })
    .filter((file) => !file.match(/.*example\.mp3$/));

  for (const soundFile of soundFiles) {
    const fullPath = path.join(soundsPath, soundFile);
    audioFileCache.set(soundFile, fullPath);
  }
}

function selectRandomSound() {
  const randomKey = audioFileCache.randomKey();
  const file = audioFileCache.get(randomKey);
  audioFileCache.delete(randomKey);

  return file;
}

async function playAudioFiles(audioPlayer) {
  loadSoundClips();
  console.log(audioFileCache);

  // Play everything in /sounds/ once
  while (audioFileCache.size && bot.activeConnection) {
    console.log(audioFileCache);
    const interval = randomTimeInterval(1, 2);
    await wait(interval);
    const file = createAudioResource(selectRandomSound());
    audioPlayer.play(file);
  }
}

export default {
  data: new SlashCommandBuilder()
    .setName("activate")
    .setDescription("Activates the LarsBot voice subroutines"),
  async execute(interaction) {
    const client = interaction.client;
    const userId = interaction.user.id;

    const guild = await client.guilds.fetch(interaction.guildId);
    const user = guild.voiceStates.cache.get(userId);
    if (!user || !user.channelId) {
      await interaction.reply({
        content: "You must be in a voice channel to activate LarsBot",
        ephemeral: true,
      });
      return;
    }

    loadSoundClips();
    if (!audioFileCache.size) {
      await interaction.reply({
        content: "There are no sounds available",
        ephemeral: true,
      });
      return;
    }

    await interaction.reply({
      content: "LarsBot activated",
      ephemeral: true,
    });

    const channel = await guild.channels.fetch(user.channelId);
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    const audioPlayer = createAudioPlayer();
    connection.subscribe(audioPlayer);
    bot.setActiveConnection(connection);

    await playAudioFiles(audioPlayer);

    // Leave voice channel when done
    if (bot.activeConnection) {
      connection.destroy();
    }
  },
};
