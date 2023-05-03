const { Client, GatewayIntentBits, messageLink } = require("discord.js");

require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const prefix = "!";
const token = process.env.TOKEN;

client.once("ready", () => {
  console.log(`${client.user.tag} started!`);
});

client.on("messageCreate", async (message) => {
  if (message.content === `${prefix}help`) {
    message.channel.send("Просто отправь команду **!waifu** или **!cake**");
  }
});
client.on("messageCreate", async (message) => {
  console.time("time");
  if (message.content === `${prefix}waifu`) {
    try {
      const res = await fetch("https://api.waifu.pics/sfw/waifu");
      const img = (await res.json()).url;

      message.channel.send({ files: [img] });
      console.timeEnd("time");
    } catch (err) {
      console.error(err);
      message.channel.send("Произошла ошибка при получении изображения..");
      console.timeEnd("time");
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.content === `${prefix}cake`) {
    console.time("time");
    try {
      const res = await fetch("https://api.waifu.pics/nsfw/waifu");
      const img = (await res.json()).url;

      message.channel.send({ files: [img] });
      console.timeEnd("time");
    } catch (err) {
      console.error(err);
      message.channel.send("Произошла ошибка при получении изображения..");
      console.timeEnd("time");
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.content === `${prefix}nice`) {
    message.channel.send("💖")
  }
})


client.login(token);
