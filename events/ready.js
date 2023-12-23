import { Events } from "discord.js";

export default {
  name: Events.ClientReady,
  once: true,
  execute(client) {
    console.log(`Bot ready, ${client.user.tag}`);
  },
};
