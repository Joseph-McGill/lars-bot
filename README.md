# 🤖 LarsBot (Discord Local Audio Bot)

A Discord bot written in Node.js using **[discord.js](https://github.com/discordjs/discord.js)** that mimics an online friend of mine (Lars) using various voice clips.

The bot was created to test out **[discord.js](https://github.com/discordjs/discord.js)** functionality and get feel for how Discord handles interactions and slash commands before making a more complicated bot.

## ⭐ Requirements

1. A Discord Bot Token (you can follow Step 1 of the **[Discord Bot Guide](https://discord.com/developers/docs/getting-started))**
2. Node 20.6.0+
   - Node 20.6.0 introduced built in support for specifying an environment variable file when running a node application. If you wish to use an older version of Node, you will have to use **[dotenv](https://www.npmjs.com/package/dotenv)** or something similar to load environment variables

## 🚀 Getting Started

### 1. 👽 Clone the repo

```sh
git clone https://github.com/Joseph-McGill/lars-bot.git
cd lars-bot
npm install
```

### 2. ⚙ Configure Environment Variables

1. Create a file named `.env` and copy the contents of `.env.example` into it
2. Replace `<YOUR_APP_ID>` with the Application ID for your bot
   - Discord Developer Portal > Applications > Your Bot > General Information > Application ID
3. Replace `<YOUR_BOT_TOKEN>` with the Bot Token generated from Step 1 of the **[Discord Bot Guide](https://discord.com/developers/docs/getting-started)**
4. (Optional) Replace `<GUILD_ID>` with the ID of your Discord Server if you only want to deploy Slash Commands to one server. Doing so can be helpful during development.
   - You can find your Discord Server ID by following **[these steps](https://support.discord.com/hc/en-us/articles/206346498)**

**⚠ NEVER commit the contents of your `.env` file to source control ⚠**

### 3. ➕ Add your Bot to your Discord Server

Follow these two sections from the **[Discord Bot Guide](https://discord.com/developers/docs/getting-started)** to add your bot to your server

1. **[Adding scopes and bot permissions](https://discord.com/developers/docs/getting-started#adding-scopes-and-bot-permissions)**
2. **[Installing your app](https://discord.com/developers/docs/getting-started#installing-your-app)**

### 4. 🎶 Add audio files to `/sounds/`

You will need to add audio files to the `/sounds/` directory for LarsBot to play.

Since Lars is a close friend of mine, I have not included the actual audio files to protect his privacy. I've included an `example.mp3` in the sounds directory as a reference for adding more sound clips, but note that the `example.mp3` file is ignored during playback.

### 5. 🤝 Register Slash Commands with Discord

Before running LarsBot, you will need to register the Slash Commands for the bot with Discord. I've provided a script for easily doing so; simply run

```sh
npm run deployCommands
```

Note: if you have a `<GUILD_ID>` in the `.env` file, the slash commands will only be registered with that Discord Server; otherwise they are registered globally. Discord has limits on how many Slash Commands can be registered per day, so running the deploy script a bunch of times is not recommended.

### 6. 🏃‍♂️ Run the bot

```sh
npm run start
```

LarsBot is now ready to receive slash commands!

## 📝 Usage

When activated, LarsBot will join your voice channel and randomly play each of the files in `/sounds/` with a 10-20 second delay between each file.

### Slash Commands

- `/activate`  
   Makes LarsBot join your voice channel and start playing sounds
- `/deactivate`  
   Makes LarsBot stop playing sounds and leave the voice channel
- `/ping`  
   Tests whether the backend for LarsBot is online

## 🧪 Possible Future Developments

- Allowing LarsBot to play sound from other sources on the web instead of just from local files
- Making LarsBot able to hold a conversation using Text-To-Speech/Speech-To-Text and an AI model
