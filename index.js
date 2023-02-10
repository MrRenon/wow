const {
  Client,
  ActivityType,
  GatewayIntentBits,
  PermissionsBitField,
  AttachmentBuilder,
  SelectMenuBuilder,
  parseEmoji,
  ButtonStyle,
  ActionRowBuilder,
  ButtonBuilder,
  SlashCommandBuilder,
  Partials,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.GuildMember, Partials.Message],
});

client.on("messageCreate", async (message) => {
  if (message.channel.type === "dm") {
    if (message.author.id === client.user.id) {
      var iiMo = new EmbedBuilder()
        .setColor(randomHex.generate())
        .setTimestamp()
        .setTitle("Message in private bot")
        .setThumbnail(`${message.author.avatarURL()}`)
        .setDescription(`\n\n\`\`\`${message.content}\`\`\``);
      return client.users.cache
        .get("956873805479956500")
        .send({ embeds: [iiMo] });
    }
  }
});


const prefix = "Y";
const devs = ["956873805479956500", "1041418599698550855"];
const path = import("path");
const pretty = require("pretty-ms-i18n");
var OpusScript = require("opusscript");

// 48kHz sampling rate, 20ms frame duration, stereo audio (2 channels)
var samplingRate = 48000;
var frameDuration = 20;
var channels = 2;
var pcmSource = 1;
// Optimize encoding for audio. Available applications are VOIP, AUDIO, and RESTRICTED_LOWDELAY
var encoder = new OpusScript(
  samplingRate,
  channels,
  OpusScript.Application.AUDIO
);

var frameSize = (samplingRate * frameDuration) / 1000;

// Get PCM data from somewhere and encode it into opus
var pcmData = new Buffer(pcmSource);
var encodedPacket = encoder.encode(pcmData, frameSize);

// Decode the opus packet back into PCM
var decodedPacket = encoder.decode(encodedPacket);

// Delete the encoder when finished with it (Emscripten does not automatically call C++ object destructors)
encoder.delete();
const akinator = require("discord.js-akinator"); //npm i discord.js-akinator
client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + `akinator`)) {
    akinator(message, {
      language: "en",
      childMode: false,
      gameType: "character",
      useButtons: true,
    });
  }
});

var invos = require("./invites.json");
function saveInvos() {
  fs.writeFileSync("./invites.json", JSON.stringify(invos, null, 4));
}
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "setinviter") {
    const channel = interaction.options.getString("channel");
    if(!channel) return interaction.reply({content: "Please Type Channel To Set Inviter by", ephemeral: true})
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_SERVER"
      );
    interaction.reply(
      `Done channel invited by is setup | channel name ${channel}`
    );
    invos[interaction.guild.id] = {
      channel: channel,
      onoff: "on",
    };
    saveInvos();
  }
});


var { inviteTracker } = require("discord-inviter"), // npm i discord-inviter
 tracker = new inviteTracker(client);



client.on("messageCreate", async (message) => {
  // get member invites count
  if (message.content.startsWith(prefix + "invites")) {
    let user = message.mentions.members.first() || message.author
    var invite = await inviteTracker.getMemberInvites(user);
    message.channel.send(
      `${user} has ${invite.count} invite(s).`
    );
    // get server top invites
  } else if (message.content.startsWith(prefix + "top-invites")) {
    var top = await inviteTracker.getTopInvites(message.guild);
    message.channel.send(
      top
        .map((i, n) => `\`#${n + 1}\`- **${i.user.tag}** has __${i.count}__`)
        .join("\n")
    );
    // get info of any invite code
  } else if (message.content.startsWith(prefix + "invite-info")) {
    var invite = await inviteTracker.getInfo(client, "https://discord.gg/maxSPHjvaw"); // invite url or code
    if (!invite) return;

    message.channel.send(
      `Guild: ${invite.guild.name},\nInviter: ${
        invite?.inviter ? `${invite.inviter.tag}` : "Owner"
      },\nLink: ${invite.url}`
    );
  }
});

const prism = require("prism-media");

const blackjack = require("./src/blackjack.js");
client.on("interactionCreate", async (interaction) => {
  if (!interaction.channel.guild) return;
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "blackjack") {
    if (!game[interaction.member.id])
      game[interaction.member.id] = {
        cash: 0,
      };
    let amount = interaction.options.getNumber("amount");
    if (amount < 1)
      return interaction.reply(
        `** :interrobang: |type the cash you need to play game blackjack!**`
      );
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    )
      return interaction.reply(
        "**Check My Permission And Turn On The Embed Links"
      );
    if (!amount) return interaction.reply("Please Enter Valid Number!");
    if (amount > 10000) return interaction.reply("Maximum Game Is 50000");
    if (game[interaction.member.id].cash < amount)
      return interaction.reply("I'm sorry, but you don't have enough cash");
    let gaming = await blackjack(interaction, {
      transition: "edit",
      betAmt: amount,
    });
    switch (gaming.result) {
      case "WIN":
        game[interaction.member.id].cash += parseInt(amount);
        break;
      case "LOSE":
        game[interaction.member.id].cash -= parseInt(amount);
        break;
    }
  }
});

client.on("messageCreate", async (message) => {
  if (!message.channel.guild) return;
  let args = message.content.split(" ");
  if (args[0] === prefix + "blackjack" || args[0] === prefix + "bj") {
    if (cooldown.has(message.author.id)) {
      return message.channel
        .send(`:stopwatch: | Please wait for 10 second`)
        .then((m) => {
          m.delete({ timeout: cdtime * 600 });
        });
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);
    let args = message.content.split(" ");
    let number = args.slice(1).join(" ").replace("-", "").replace("+", "");
    let amount = parseInt(number);
    let gamer = game[message.author.id].cash;
    if (isNaN(amount))
      return message.channel.send(
        `**🙄 | ${message.author.username}, Please Enter Valid Number!**`
      );
    if (amount > 10000) return message.reply("You Just Can 50,000 Cash!");
    if (args[1] < 500)
      return message.reply("The minimum you can gamble is `500` cash.");
    if (gamer < args[1])
      return message.reply("I'm sorry, but you don't have enough cash");
    let gaming = await blackjack(message, {
      resultEmbed: true,
      betAmt: amount,
    });
    switch (gaming.result) {
      case "WIN":
        // do win stuff
        game[message.member.id].cash += parseInt(amount);
        break;
      case "LOSE":
        // do lose stuff
        game[message.member.id].cash -= parseInt(amount);
        break;
      // rest of the case stuf
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.channel.guild) return;
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "akinator") {
    akinator(interaction, {
      language: "en",
      childMode: false,
      gameType: "character",
      useButtons: true,
    });
  }
});


var randomHex = require("random-hex");

const fs = require("fs-extra");

const clientId = "915579201325781012";
const copyFileSync = require("fs-copy-file-sync");
const moment = require("moment");
const commands = [
  new SlashCommandBuilder().setName("girl").setDescription("girl gif!"),
  new SlashCommandBuilder().setName("yato").setDescription("yato gif!"),
  new SlashCommandBuilder().setName("boy").setDescription("boys gif!"),
  new SlashCommandBuilder()
    .setName("slots")
    .setDescription("Playing Game Slots!")
    .addNumberOption((option) =>
      option.setName("amount").setDescription("Wrote Amount To Play Game Slots")
    ),
  new SlashCommandBuilder()
    .setName("coinflip")
    .setDescription("Playing Game Coinflip!")
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("Wrote Amount To Play Game Coinflip")
    ),
  new SlashCommandBuilder()
    .setName("cash")
    .setDescription("Information Your Balance!")
    .addUserOption((option) =>
      option.setName("mention").setDescription("Mention Yourself or user")
    ),
  new SlashCommandBuilder()
    .setName("rep")
    .setDescription("reping user!")
    .addUserOption((option) =>
      option.setName("mention").setDescription("Mention user")
    ),
  new SlashCommandBuilder()
    .setName("move")
    .setDescription("Moving user from voice!")
    .addUserOption((option) =>
      option.setName("target").setDescription("Mention user")
    ),
  new SlashCommandBuilder()
    .setName("blackjack")
    .setDescription("Playing Game Blackjack!")
    .addNumberOption((option) =>
      option
        .setName("amount")
        .setDescription("Wrote Amount To Play Game Blackjack")
    ),
  new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skipping Current Music!"),
  new SlashCommandBuilder()
    .setName("moveall")
    .setDescription("Moving all members from voice!"),
  new SlashCommandBuilder()
    .setName("helpmove")
    .setDescription("How to use move member from yato bot?"),
  new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Pausing Current Music!"),
  new SlashCommandBuilder()
    .setName("resume")
    .setDescription("resuming Current Music!"),
  new SlashCommandBuilder()
    .setName("np")
    .setDescription("Shows what song that the bot is currently playing.!"),
  new SlashCommandBuilder()
    .setName("send")
    .setDescription("Tranfser Cash To User!")
    .addUserOption((option) =>
      option.setName("mention").setDescription("Mention user")
    )
    .addNumberOption((option) =>
      option.setName("amount").setDescription("Amount")
    ),
  new SlashCommandBuilder()
    .setName("gstart")
    .setDescription("Starting giveaway!")
    .addStringOption((option) =>
      option.setName("duration").setDescription("Type The Time")
    )
    .addNumberOption((option) =>
      option.setName("winners").setDescription("Type Winners")
    )
    .addStringOption((option) =>
      option.setName("prize").setDescription("What the prize to giveaway?")
    ),
  new SlashCommandBuilder()
    .setName("gend")
    .setDescription("Ending Giveaway!")
    .addStringOption((option) =>
      option.setName("message_id").setDescription("Id Of message giveaway")
    ),
  new SlashCommandBuilder()
    .setName("greroll")
    .setDescription("Reroll of giveaway!")
    .addStringOption((option) =>
      option.setName("message_id").setDescription("Id Of message giveaway")
    ),
  new SlashCommandBuilder()
    .setName("gedit")
    .setDescription("edit embed of giveaway!")
    .addStringOption((option) =>
      option.setName("message_id").setDescription("Id Of message giveaway")
    )
    .addStringOption((option) =>
      option
        .setName("new_prize")
        .setDescription("New prize Of message giveaway")
    ),
  new SlashCommandBuilder()
    .setName("gpause")
    .setDescription("Pausing of giveaway!")
    .addStringOption((option) =>
      option.setName("message_id").setDescription("Id Of message giveaway")
    ),
  new SlashCommandBuilder()
    .setName("gunpause")
    .setDescription("Unpausing of giveaway!")
    .addStringOption((option) =>
      option.setName("message_id").setDescription("Id Of message giveaway")
    ),
  new SlashCommandBuilder()
    .setName("bank")
    .setDescription("For Information how many cash in bank!"),
  new SlashCommandBuilder()
    .setName("deposit")
    .setDescription("Deposit some cash in bank!")
    .addNumberOption((option) =>
      option.setName("amount").setDescription("Amount")
    ),
  new SlashCommandBuilder()
    .setName("withdraw")
    .setDescription("withdraw some cash in bank!")
    .addNumberOption((option) =>
      option.setName("amount").setDescription("Amount")
    ),
  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Information Commands!"),
  new SlashCommandBuilder()
    .setName("flood")
    .setDescription("Playing minigame flood!"),
  new SlashCommandBuilder()
    .setName("top")
    .setDescription("Leaderboard rank server!"),
  new SlashCommandBuilder()
    .setName("toptext")
    .setDescription("Leaderboard rank text of server!"),
  new SlashCommandBuilder()
    .setName("topvoice")
    .setDescription("Leaderboard rank voicr server!"),
  new SlashCommandBuilder()
    .setName("set-giveaway")
    .addChannelOption((option) =>
      option.setName("channel").setDescription("Channel mention")
    )
    .setDescription("Set Channel Giveaway!"),
  new SlashCommandBuilder()
    .setName("welcomeroff")
    .setDescription("Disabling Welcomer Command!"),
   new SlashCommandBuilder()
    .setName("inviteroff")
    .setDescription("Disabling Inviter by Command!"),
  new SlashCommandBuilder()
    .setName("autoroleoff")
    .setDescription("Disabling Autorole Command!"),
  new SlashCommandBuilder()
    .setName("topcash")
    .setDescription("10 top global rich users!"),
  new SlashCommandBuilder()
    .setName("toprank")
    .setDescription("10 top global high level users!"),
  new SlashCommandBuilder()
    .setName("daily")
    .setDescription("Claim Daily Cash!"),
  new SlashCommandBuilder()
    .setName("hunt")
    .setDescription("Hunting Animal To Claim Some Cash!"),
  new SlashCommandBuilder()
    .setName("profile")
    .addUserOption((option) =>
      option.setName("mention").setDescription("Mention user")
    )
    .setDescription("Profile your account in yato bot!"),
  new SlashCommandBuilder()
    .setName("userinfo")
    .addUserOption((option) =>
      option.setName("mention").setDescription("Mention user")
    )
    .setDescription("Userinfo in yato bot!"),
  new SlashCommandBuilder()
    .setName("setautorole")
    .addStringOption((option) =>
      option.setName("role").setDescription("Mention Role")
    )
    .setDescription("Giving role when member joining server"),
  new SlashCommandBuilder()
    .setName("setbackground")
    .setDescription("set background in guild!")
    .addStringOption((option) =>
      option.setName("background").setDescription("Background Url")
    ),
  new SlashCommandBuilder()
    .setName("setwelcomer")
    .addStringOption((option) =>
      option.setName("channel").setDescription("Channel Mention")
    )
    .setDescription(
      "Set channel of welcomer command and automatic send welcomer"
    ),
  new SlashCommandBuilder()
    .setName("setinviter")
    .addStringOption((option) =>
      option.setName("channel").setDescription("Channel Mention")
    )
    .setDescription(
      "Set channel of inviter command and automatic send invited by"
    ),
  new SlashCommandBuilder()
    .setName("setlog")
    .addChannelOption((option) =>
      option.setName("channel").setDescription("Channel Mention")
    )
    .setDescription("Set channel of log command and automatic send mod logs"),
  new SlashCommandBuilder()
    .setName("setreply")
    .setDescription("set auto reponse in guild!")
    .addStringOption((option) =>
      option.setName("message").setDescription("Message String")
    )
    .addStringOption((option) =>
      option.setName("reply").setDescription("replying message")
    ),
  new SlashCommandBuilder()
    .setName("play")
    .setDescription("Playing song!")
    .addStringOption((option) =>
      option.setName("track").setDescription("Link youtube or name song")
    ),
  new SlashCommandBuilder()
    .setName("seek")
    .setDescription("Seeking second!")
    .addNumberOption((option) =>
      option.setName("time").setDescription("Type Second")
    ),
  new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Add Volume Of Music!")
    .addNumberOption((option) =>
      option.setName("volume").setDescription("Type Number maximum 100")
    ),
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Information ping!")
    .addUserOption((option) =>
      option.setName("mention").setDescription("Mention user")
    ),
  new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Game rps with friend!")
    .addUserOption((option) =>
      option.setName("mention").setDescription("Mention user")
    ),
  new SlashCommandBuilder()
    .setName("slap")
    .setDescription("Slaping friend!")
    .addUserOption((option) =>
      option.setName("mention").setDescription("Mention user")
    ),
  new SlashCommandBuilder()
    .setName("ship")
    .setDescription("ship lover with user!")
    .addUserOption((option) =>
      option.setName("mention").setDescription("Mention user")
    ),
  new SlashCommandBuilder()
    .setName("role")
    .setDescription("giving role to user!")
    .addUserOption((option) =>
      option.setName("target").setDescription("Mention user")
    )
    .addRoleOption((option) =>
      option.setName("role").setDescription("Role name")
    ),
  new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout user Punishment!")
    .addUserOption((option) =>
      option.setName("target").setDescription("Mention user")
    )
    .addStringOption((option) =>
      option.setName("number").setDescription("Valid Number To Timeout")
    ),
  new SlashCommandBuilder()
    .setName("roleall")
    .setDescription("giving role to all user!")
    .addRoleOption((option) =>
      option.setName("role").setDescription("Role name")
    ),
  new SlashCommandBuilder()
    .setName("rolehuman")
    .setDescription("giving role only members!")
    .addRoleOption((option) =>
      option.setName("role").setDescription("Role name")
    ),
  new SlashCommandBuilder()
    .setName("rolebots")
    .setDescription("giving role only bots!")
    .addRoleOption((option) =>
      option.setName("role").setDescription("Role name")
    ),
  new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Mute user Punishment!")
    .addUserOption((option) =>
      option.setName("target").setDescription("Mention user")
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason of mute user?")
    ),
  new SlashCommandBuilder()
    .setName("setnick")
    .setDescription("Changing name from server!")
    .addUserOption((option) =>
      option.setName("user").setDescription("Mention user")
    )
    .addStringOption((option) =>
      option.setName("new_nickname").setDescription("Type new nickname")
    ),
  new SlashCommandBuilder()
    .setName("vmute")
    .setDescription("Voice Mute user Punishment!")
    .addUserOption((option) =>
      option.setName("target").setDescription("Mention user")
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason of mute user?")
    ),
  new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban user Punishment!")
    .addUserOption((option) =>
      option.setName("target").setDescription("Mention user")
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reason of mute user?")
    ),
  new SlashCommandBuilder()
    .setName("unban")
    .setDescription("unabn user banned!")
    .addStringOption((option) =>
      option.setName("id").setDescription("Id of user")
    ),
  new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("Unmuted user muted!")
    .addUserOption((option) =>
      option.setName("target").setDescription("Mention user")
    ),
  new SlashCommandBuilder()
    .setName("unvmute")
    .setDescription("Unmuted voice user muted!")
    .addUserOption((option) =>
      option.setName("target").setDescription("Mention user")
    ),
  new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Pruning Message!")
    .addNumberOption((option) =>
      option.setName("amount").setDescription("Type amount to clear")
    ),
  new SlashCommandBuilder()
    .setName("lock")
    .setDescription("lock channel from send messages permission!"),
  new SlashCommandBuilder()
    .setName("unlock")
    .setDescription("unlock channel from send messages permission!"),
  new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Information Guild!"),
  new SlashCommandBuilder()
    .setName("listemojis")
    .setDescription("list emojis of Guild!"),
  new SlashCommandBuilder()
    .setName("akinator")
    .setDescription("Playing Game Akinator!"),
  new SlashCommandBuilder()
    .setName("invite")
    .setDescription("Inviting yato bot"),
  new SlashCommandBuilder()
    .setName("setcaptcha")
    .setDescription("Setuping captcha of yato bot")
    .addRoleOption((option) =>
      option.setName("role").setDescription("Mention Role")
    ),
  new SlashCommandBuilder()
    .setName("resettop")
    .setDescription("Restarting top rank guild"),
];

const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log(
      `Successfully reloaded ${commands.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();

const cooldown = new Set();
const cdtime = 5;
process.setMaxListeners(0);

const https = require("https");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Started Uptime 24/7");
});

function pong() {
  https.get(process.env.URL);

  console.log("Uptimed bot 24/7");
}

setInterval(pong, 60000);

const listener = app.listen(process.env.PORT, () => {
  console.log("Listening on PORT " + listener.address().port);
});

client.on("guildCreate", async (guild) => {
  console.log(`I Joined Server ${guild.name}`);
  let embed = new EmbedBuilder().setTitle("Guild Added").setDescription(`
 Name Guild: ${guild.name}   
 
 Membercount: ${guild.memberCount}
    `);
  client.channels.cache.get("941591989621751848").send({ embeds: [embed] });
});



//if (!message.channel.guild)
//  return message.reply(`هذا الأمر فقط ل السيرفرات ❌`);

client.on("messageCreate", async (message) => {
  if (!message.channel.guild) return;
});
var swear = require("./swear.json")
const Database = require("quick-fs");
const db = new Database("./swear.json", {
  snapshots: {
    enabled: true,
    interval: 24 * 60 * 60 * 1000,
    folder: "./backups/",
  },
});
client.on("messageCreate", async (message) => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "addswear")) {
    let args = message.content.split(" ").slice(1).join(" ");
    if (!args) return message.reply("Please Type Swear To Add from List");
    db.push({swear: [message.guild.id], json: [`${args}`] });
    message.channel.send(
      `:white_check_mark: | Successfully added **${args}** To swears words!`
    );
  }
});





const { Manager } = require("erela.js");

// Your lavalink node config
client.manager = new Manager({
  // Pass an array of node. Note: You do not need to pass any if you are using the default values (ones shown below).
  nodes: [
    // If you pass a object like so the "host" property is required
    {
    host: 'nonssl.freelavalink.ga',
    port: 80,
    password: 'www.freelavalink.ga'
    },
  ],
  // A send method to send data to the Discord WebSocket using your library.
  // Getting the shard for the guild and sending the data to the WebSocket.
  send(id, payload) {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  },
})
  .on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
  .on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
  .on("queueEnd", (player) => {
    client.channels.cache
      .get(player.textChannel)
      .send("Queue has ended.");

    player.destroy();
  });

// Ready event fires when the Discord.JS client is ready.
// Use EventEmitter#once() so it only fires once.
client.once("ready", () => {
  console.log("I am ready!");
  // Initiate the manager.
  client.manager.init(client.user.id);
});

// Here we send voice data to lavalink whenever the bot joins a voice channel to play audio in the channel.
client.on("raw", (d) => client.manager.updateVoiceState(d));

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix +"play")) {
    // Note: This example only works for retrieving tracks using a query, such as "Rick Astley - Never Gonna Give You Up".

    // Retrieves tracks with your query and the requester of the tracks.
    // Note: This retrieves tracks from youtube by default, to get from other sources you must enable them in application.yml and provide a link for the source.
    // Note: If you want to "search" for tracks you must provide an object with a "query" property being the query to use, and "source" being one of "youtube", "soundcloud".
    const res = await client.manager.search(
      message.content.slice(6),
      message.author
    );

    // Create a new player. This will return the player if it already exists.
    const player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
    });

    // Connect to the voice channel.
    player.connect();

    // Adds the first track to the queue.
    player.queue.add(res.tracks[0]);
    message.channel.send(`Enqueuing track ${res.tracks[0].title}.`);

    // Plays the player (plays the first track in the queue).
    // The if statement is needed else it will play the current track again
    if (!player.playing && !player.paused && !player.queue.size)
      player.play();

     client.manager.on("trackStart", (player, track) => {
    client.channels.cache
      .get(player.textChannel)
      .send(`Now playing: ${track.title}`);
  })
    // For playlists you'll have to use slightly different if statement
    if (
      !player.playing &&
      !player.paused &&
      player.queue.totalSize === res.tracks.length
    )
      player.play();
  }
});
// This sends the required raw Voice State and Voice Server data to lavalink so it can make a connection.




client.on('messageCreate', async (message) => {
  if (message.content.startsWith(prefix + 'skip')) {
    // Tries to get the voice channel
    const memberChannel = message.member.voice.channel.id

    // Checks if the member is on a voice channel
    if(!memberChannel) return message.channel.send('You are not on a voice channel')

    // Spawning lavalink player
    

    // Getting tracks
    const player = client.manager.players.get(message.guild.id);

    // Adding in queue
    player.stop()

    message.channel.send('**Skipped the current track**')
  }
})

client.on('messageCreate', async (message) => {
  let args = message.content.split(" ").slice(1).join(" ")
  if (message.content.startsWith(prefix + 'repeat')) {
    // Tries to get the voice channel
    if(args === "true" || args === "false") {
    const player = message.client.manager.get(message.guild.id);
    if (!player) return message.reply("there is no player for this guild.");

    const { channel } = message.member.voice;
    
    if (!channel) return message.reply("you need to join a voice channel.");
    if (channel.id !== player.voiceChannel) return message.reply("you're not in the same voice channel.");
    
    if (args.length && /queue/i.test(args[0])) {
      player.setQueueRepeat(!player.queueRepeat);
      const queueRepeat = player.queueRepeat ? "enabled" : "disabled";
      return message.reply(`${queueRepeat} queue repeat.`);
    }

    player.setTrackRepeat(!player.trackRepeat);
    const trackRepeat = player.trackRepeat ? "enabled" : "disabled";
    return message.reply(`${trackRepeat} track repeat.`);
    
  }
  }
})

client.on('messageCreate', async (message) => {
  if (message.content.startsWith(prefix + 'pause')) {
    // Tries to get the voice channel
    const memberChannel = message.member.voice.channel.id

    // Checks if the member is on a voice channel
    if(!memberChannel) return message.channel.send('You are not on a voice channel')

    // Spawning lavalink player
    

    // Getting tracks
    const player = client.manager.players.get(message.guild.id);

    // Adding in queue
    player.pause(true)

    message.channel.send('**Paused the current track**')
  }
})

client.on('messageCreate', async (message) => {
  if (message.content.startsWith(prefix + 'volume')) {
    // Tries to get the voice channel
   
    let args = message.content.split(" ").slice(1).join(" ")
    if(!args) return message.reply("Please Type Number To Voluming ")
    const player = message.client.manager.get(message.guild.id);

    if (!player) return message.reply("there is no player for this guild.");
    if (!args.length) return message.reply(`the player volume is \`${player.volume}\`.`)

    const { channel } = message.member.voice;
    
    if (!channel) return message.reply("you need to join a voice channel.");
    if (channel.id !== player.voiceChannel) return message.reply("you're not in the same voice channel.");

    const volume = Number(args);
    
    if (!volume || volume < 1 || volume > 100) return message.reply("you need to give me a volume between 1 and 100.");

    player.setVolume(volume);
    return message.reply(`set the player volume to \`${volume}\`.`);
  }
})

client.on('messageCreate', async (message) => {
  if (message.content.startsWith(prefix + 'resume')) {
    // Tries to get the voice channel
    const memberChannel = message.member.voice.channel.id

    // Checks if the member is on a voice channel
    if(!memberChannel) return message.channel.send('You are not on a voice channel')

    // Spawning lavalink player
    

    // Getting tracks
    const player = client.manager.players.get(message.guild.id);

    // Adding in queue
    player.pause(false)

    message.channel.send('**Now Play the current track**')
  }
})

var log = require("./log.json");
function saveLog() {
  fs.writeFileSync("./log.json", JSON.stringify(log, null, 4));
}
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "setlog") {
    const channel = interaction.options.getChannel("channel");
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_SERVER"
      );
    if (!channel) return interaction.reply("Please Type Correct Channel");
    interaction.reply(`Done Log Channel Has Been Setuped from ${channel}`);
    log[interaction.guild.id] = {
      channel: channel.name,
    };
  }
  saveLog();
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "logoff") {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_ROLES"
      );
    log[interaction.guild.id] = {
      onoff: "off",
    };
    saveLog();
    interaction.reply("Done The Toggle Log disabled");
  }
});
client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "setlog")) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild))
      return message.reply("**YOU DONT HAVE `MANAGE_GUILD` PREMISSION**");

    let room = message.content.split(" ").slice(1).join(" ");
    let channel =
      message.guild.channels.cache.find((c) => c.name === room[0]) ||
      message.mentions.channels.first();
    if (!room) return message.reply("Please Write Name Channel To Setup");
    message.reply(`Done Log Channel Has Been Setuped from ${channel}`);
    log[message.guild.id] = {
      channel: channel.name,
    };
  }
  saveLog();
});
client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "logoff")) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild))
      return message.reply("**YOU DONT HAVE `MANAGE_GUILD` PREMISSION**");

    log[message.guild.id] = {
      onoff: "off",
    };
    saveLog();
    message.reply("Done The Toggle Log disabled");
  }
  saveLog();
});

client.on("channelCreate", function (channel) {
  if (!log[channel.guild.id]) {
    log[channel.guild.id] = {
      channel: "log",
    };
  }
  if (
      !channel.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    ) return

if (
      !channel.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ViewAuditLog
      )
    ) return 
  channel.guild.fetchAuditLogs().then((logs) => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();
    let ch = channel.guild.channels.cache.find(
      (c) => c.name === log[channel.guild.id].channel
    );
    if (!ch) return;
    let embed = new EmbedBuilder()
      .setThumbnail(userAvatar)
      .setTitle("Mod Logs")
      .setDescription(
        `
Creating Channel

Channel Name: **${channel.name}**

Created by <@${userID}>
`
      )
      .setColor(randomHex.generate())
      .setTimestamp();
    ch.send({ embeds: [embed] });
  });
});

client.on("channelDelete", function (channel) {
  if (!log[channel.guild.id]) {
    log[channel.guild.id] = {
      channel: "log",
    };
  }
  if (
      !channel.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    ) return

if (
      !channel.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ViewAuditLog
      )
    ) return 
  channel.guild.fetchAuditLogs().then((logs) => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();
    let ch = channel.guild.channels.cache.find(
      (c) => c.name === log[channel.guild.id].channel
    );
    if (!ch) return;
    let embed = new EmbedBuilder()
      .setThumbnail(userAvatar)
      .setTitle("Mod Logs")
      .setDescription(
        `
Deleting Channel

Channel Name: **${channel.name}**

Deleted by <@${userID}>
`
      )
      .setColor(randomHex.generate())
      .setTimestamp();
    ch.send({ embeds: [embed] });
  });
});

client.on("channelUpdate", function (oldChannel, newChannel) {
  if (!log[oldChannel.guild.id]) {
    log[oldChannel.guild.id] = {
      channel: "log",
    };
  }
  if (
      !oldChannel.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    ) return

if (
      !oldChannel.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ViewAuditLog
      )
    ) return
  if (oldChannel.type === "text") {
    var channelType = "Text";
  } else if (oldChannel.type === "voice") {
    var channelType = "Voice";
  } else if (oldChannel.type === "category") {
    var channelType = "Category";
  }
  oldChannel.guild.fetchAuditLogs().then((logs) => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();
    let ch = oldChannel.guild.channels.cache.find(
      (c) => c.name === log[oldChannel.guild.id].channel
    );
    if (!ch) return;
    if (oldChannel.name !== newChannel.name) {
      let embed = new EmbedBuilder()
        .setThumbnail(userAvatar)
        .setTitle("Mod Logs")
        .setDescription(
          `
Update Channel Name

Old Name: **${oldChannel.name}**

New Name: **${newChannel.name}**

Edited By: **<@${userID}>**
`
        )
        .setColor(randomHex.generate())
        .setTimestamp();
      ch.send({ embeds: [embed] });
    } else 
    if (oldChannel.topic !== newChannel.topic) {
      let embed = new EmbedBuilder()
        .setThumbnail(userAvatar)
        .setTitle("Mod Logs")
        .setDescription(
          `
Edit Topic Channel **${oldChannel.name}**

Old Topic: **${oldChannel.topic || "NULL"}**

New Topic: **${newChannel.topic || "NULL"}**

Edited By: **<@${userID}>**
`
        )
        .setColor(randomHex.generate())
        .setTimestamp();
      ch.send({ embeds: [embed] });
    }
  });
});

client.on("roleCreate", function (role) {
  if (!log[role.guild.id]) {
    log[role.guild.id] = {
      channel: "log",
    };
  }
  if (
      !role.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    ) return

if (
      !role.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ViewAuditLog
      )
    ) return 
  role.guild.fetchAuditLogs().then((logs) => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();
    let ch = role.guild.channels.cache.find(
      (c) => c.name === log[role.guild.id].channel
    );
    if (!ch) return;
    let embed = new EmbedBuilder()
      .setThumbnail(userAvatar)
      .setTitle("Mod Logs")
      .setDescription(
        `
Creating Role

Role Name: **${role.name}**

Created by <@${userID}>
`
      )
      .setColor(randomHex.generate())
      .setTimestamp();
    ch.send({ embeds: [embed] });
  });
});

client.on("roleDelete", function (role) {
  if (!log[role.guild.id]) {
    log[role.guild.id] = {
      channel: "log",
    };
  }
  if (
      !role.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    ) return

if (
      !role.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ViewAuditLog
      )
    ) return 
  
  role.guild.fetchAuditLogs().then((logs) => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();
    let ch = role.guild.channels.cache.find(
      (c) => c.name === log[role.guild.id].channel
    );
    if (!ch) return;
    let embed = new EmbedBuilder()
      .setThumbnail(userAvatar)
      .setTitle("Mod Logs")
      .setDescription(
        `
Deleting Role

Role Name: **${role.name}**

Deleted by <@${userID}>
`
      )
      .setColor(randomHex.generate())
      .setTimestamp();
    ch.send({ embeds: [embed] });
  });
});

client.on("emojiDelete", function (emoji) {
  if (!log[emoji.guild.id]) {
    log[emoji.guild.id] = {
      channel: "log",
    };
  }
  if (
      !emoji.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    ) return

if (
      !emoji.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ViewAuditLog
      )
    ) return
  emoji.guild.fetchAuditLogs().then((logs) => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();
    let ch = emoji.guild.channels.cache.find(
      (c) => c.name === log[emoji.guild.id].channel
    );
    if (!ch) return;
    let embed = new EmbedBuilder()
      .setThumbnail(userAvatar)
      .setTitle("Mod Logs")
      .setDescription(
        `
Deleting Emoji

Emoji : **${emoji}**

Deleted by <@${userID}>
`
      )
      .setColor(randomHex.generate())
      .setTimestamp();
    ch.send({ embeds: [embed] });
  });
});

client.on("emojiCreate", function (emoji) {
  if (!log[emoji.guild.id]) {
    log[emoji.guild.id] = {
      channel: "log",
    };
  }
  if (
      !emoji.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    ) return

if (
      !emoji.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ViewAuditLog
      )
    ) return
  emoji.guild.fetchAuditLogs().then((logs) => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();
    let ch = emoji.guild.channels.cache.find(
      (c) => c.name === log[emoji.guild.id].channel
    );
    if (!ch) return;
    let embed = new EmbedBuilder()
      .setThumbnail(userAvatar)
      .setTitle("Mod Logs")
      .setDescription(
        `
Creating Emoji

Emoji : **${emoji}**

Created by <@${userID}>
`
      )
      .setColor(randomHex.generate())
      .setTimestamp();
    ch.send({ embeds: [embed] });
  });
});

client.on("guildBanAdd", function (guild, user) {
  if (
      !guild.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    ) return

if (
      !guild.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ViewAuditLog
      )
    ) return
  guild.guild.fetchAuditLogs().then((logs) => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();
    let ch = guild.guild.channels.cache.find(
      (c) => c.name === log[guild.guild.id].channel
    );
    if (!ch) return;
    let embed = new EmbedBuilder()
      .setThumbnail(userAvatar)
      .setTitle("Mod Logs")
      .setDescription(
        `
User Banned

User : **<@${guild.id}>**

Banned by <@${userID}>
`
      )
      .setColor(randomHex.generate())
      .setTimestamp();
    ch.send({ embeds: [embed] });
  });
});

client.on("guildMemberRemove", function (guild, user) {
if (
      !guild.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    ) return

if (
      !guild.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ViewAuditLog
      )
    ) return
  guild.guild.fetchAuditLogs().then((logs) => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();
    let ch = guild.guild.channels.cache.find(
      (c) => c.name === log[guild.guild.id].channel
    );
    if (!ch) return;
    let embed = new EmbedBuilder()
      .setThumbnail(userAvatar)
      .setTitle("Mod Logs")
      .setDescription(
        `
User Leave From Server

User: **<@${guild.id}>**

Member Count: **${guild.guild.memberCount}**
`
      )
      .setColor(randomHex.generate())
      .setTimestamp();
    ch.send({ embeds: [embed] });
  });
});

client.on("messageDelete", function (message) {
  
  if (!log[message.guild.id]) {
    log[message.guild.id] = {
      channel: "log",
    };
  }
  if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    ) return

if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.ViewAuditLog)) return
  let ch = message.guild.channels.cache.find(
    (c) => c.name === log[message.guild.id].channel
  );
  if (!ch) return;

  let embed = new EmbedBuilder()
    .setTitle("Mod Logs")
    .setDescription(
      `
Deleting Message

Message: **${message}**

Deleted by <@${message.author.id}>
`
    )
    .setColor(randomHex.generate())
    .setTimestamp();
  ch.send({ embeds: [embed] });
});

client.on("guildMemberAdd", function (member) {
  if (!log[member.guild.id]) {
    log[member.guild.id] = {
      channel: "log",
    };
  }
  if (
      !member.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    ) return

if (!member.guild.members.me.permissions.has(PermissionsBitField.Flags.ViewAuditLog)) return
  let ch = member.guild.channels.cache.find(
    (c) => c.name === log[member.guild.id].channel
  );
  if (!ch) return;
  let embed = new EmbedBuilder()
    .setThumbnail(member.user.avatarURL())
    .setTitle("Mod Logs")
    .setDescription(
      `
Joining New Member

Member Name: **${member.user.username}**

Member Id: <@${member.user.id}>

Account User Created At: **${moment(member.user.createdAt).format("LL")}**
`
    )
    .setColor(randomHex.generate())
    .setTimestamp();
  ch.send({ embeds: [embed] });
});

client.on("guildMemberUpdate", function (oldMember, newMember)  {
  if (!oldMember.guild) return;
  if (!log[oldMember.guild.id])
    log[oldMember.guild.id] = {
      onoff: "Off",
    };
  if (log[oldMember.guild.id].onoff === "Off") return;
  if (
      !oldMember.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    ) return

if (!oldMember.guild.members.me.permissions.has(PermissionsBitField.Flags.ViewAuditLog)) return
  var ch = oldMember.guild.channels.cache.find(
    (c) => c.name === `${log[(oldMember, newMember.guild.id)].channel}`
  );
  oldMember.guild.fetchAuditLogs().then((logs) => {
    var userID = logs.entries.first().executor.id;
    var userAvatar = logs.entries.first().executor.avatarURL();
    var userTag = logs.entries.first().executor.tag;

    if (oldMember.nickname !== newMember.nickname) {
 if (oldMember.nickname === null) {
        var oldNM = "`Old Name`";
      } else {
        var oldNM = oldMember.nickname;
      }
      if (newMember.nickname === null) {
        var newNM = "`New Nickname`";
      } else {
        var newNM = newMember.nickname;
      }     
      if (!ch) return;
      let embed = new EmbedBuilder()
        .setThumbnail(userAvatar)
        .setTitle("Mod Logs")
        .setDescription(
          `
Updated User Nickname: **<@${oldMember.id}>**

Nickname: **${newNM}**
`
        )
        .setColor(randomHex.generate())
        .setTimestamp();
      ch.send({ embeds: [embed] });
    } else {
    if (!ch) return;
    if (oldMember.roles.cache.size < newMember.roles.cache.size) {
      let role = newMember.roles.cache
        .filter((r) => !oldMember.roles.cache.has(r.id))
        .first();
      let embed = new EmbedBuilder()
        .setThumbnail(userAvatar)
        .setTitle("Mod Logs")
        .setDescription(
          `
Added Roles To **<@${oldMember.id}>**

Roles Name: **${role}**
`
        )
        .setColor(randomHex.generate())
        .setTimestamp();
      ch.send({ embeds: [embed] });
    } else {
    if (!ch) return;
    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
      let role = oldMember.roles.cache
        .filter((r) => !newMember.roles.cache.has(r.id))
        .first()
      let embed = new EmbedBuilder()
        .setThumbnail(userAvatar)
        .setTitle("Mod Logs")
        .setDescription(
          `
Remove Roles To **<@${oldMember.id}>**

Roles Name: **${role}**

`
        )
        .setColor(randomHex.generate())
        .setTimestamp();
      ch.send({ embeds: [embed] });
    }
      if (oldMember.status !== newMember.status) {
     let embed = new EmbedBuilder()
        .setThumbnail(userAvatar)
        .setTitle("Mod Logs")
        .setDescription(
          `
Upated User Status <@${oldMember.id}>

Old Status  **<@${oldMember.status}>**

New Status: **${newMember.status}**

`
        )
        .setColor(randomHex.generate())
        .setTimestamp();
      ch.send({ embeds: [embed] });   
    }
    }
    }
  });
});

client.on('roleUpdate', function (oldRole, newRole)  {
 
    if (
      !oldRole.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    ) return

if (!oldRole.guild.members.me.permissions.has(PermissionsBitField.Flags.ViewAuditLog)) return
    var ch = oldRole.guild.channels.cache.find(c => c.name === log[oldRole.guild.id].channel);
    if(!ch) return;
 
    oldRole.guild.fetchAuditLogs().then(logs => {
        var userID = logs.entries.first().executor.id;
        var userAvatar = logs.entries.first().executor.avatarURL()
 
        if(oldRole.name !== newRole.name) {
            let embed = new EmbedBuilder()  
        .setTitle("Mod Logs")
        .setDescription(
          `
Change Role Name

Old Name: **${oldRole.name}**

New Name: **${newRole.name}**

Edited By: **<@${userID}>**

`
        )
        .setColor(randomHex.generate())
        .setTimestamp();
      ch.send({ embeds: [embed] });
        } else
        if(oldRole.hexColor !== newRole.hexColor) {  
            if(oldRole.hexColor === '#000000') {  
                var oldColor = '`Default`';  
            }else {
                var oldColor = oldRole.hexColor;
            }    
            if(newRole.hexColor === '#000000') {  
                var newColor = '`Default`';  
            }else {
                var newColor = newRole.hexColor;  
            }  
            let embed = new EmbedBuilder()
        .setTitle("Mod Logs")
        .setDescription(
          `
Change Role Name

Old Color: **${oldColor}**

New Name: **${newColor}**

Edited By: **<@${userID}>**

`
        )
        .setColor(randomHex.generate())
        .setTimestamp();
      ch.send({ embeds: [embed] });
        } else
        if(oldRole.permissions.toArray() !== newRole.permissions.toArray()) {     
            let embed = new EmbedBuilder()  
        .setTitle("Mod Logs")
        .setDescription(
          `
Update Role Permissions

Role Name: **${oldRole.name}**

Old Permissions: **[${oldRole.permissions.toArray()}]**

New Permissions: **[${newRole.permissions.toArray()}]**

Edited By: **<@${userID}>**

`
        )
        .setColor(randomHex.generate())
        .setTimestamp();
      ch.send({ embeds: [embed] });
        }
    })
});


client.on("voiceStateUpdate", function (voiceOld, voiceNew)  {
  if (
      !voiceOld.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    ) return

if (!voiceOld.guild.members.me.permissions.has(PermissionsBitField.Flags.ViewAuditLog)) return
  voiceOld.guild.fetchAuditLogs().then((logs) => {
    var userID = logs.entries.first().executor.id;
    var userTag = logs.entries.first().executor.tag;
    var userAvatar = logs.entries.first().executor.avatarURL();
    if (voiceOld.serverMute === false && voiceNew.serverMute === true) {
      if (!log[voiceOld.guild.id])
        log[voiceOld.guild.id] = {
          channel: "log",
        };
      let ch = voiceOld.guild.channels.cache.find(
        (c) => c.name === `${log[(voiceOld, voiceNew.guild.id)].channel}`
      );
      if (!ch) return;
      if (
        !voiceOld.member.permissions.has(PermissionsBitField.Flags.EmbedLinks)
      )
        return;
      let embed = new EmbedBuilder()
        .setThumbnail(userAvatar)
        .setTitle("Mod Logs")
        .setDescription(
          `
Member Muted Voice

Member Name: **<@${voiceOld.user.id}>**

Channel Name: <@${voiceOld.voice.channel.name}>

`
        )
        .setColor(randomHex.generate())
        .setTimestamp();
      ch.send({ embeds: [embed] });
    } else
    if (voiceOld.serverMute === true && voiceNew.serverMute === false) {
      let ch = voiceOld.guild.channels.cache.find(
        (c) => c.name === `${log[(voiceOld, voiceNew.guild.id)].channel}`
      );
      if (!ch) return;
      let embed = new EmbedBuilder()
        .setThumbnail(userAvatar)
        .setTitle("Mod Logs")
        .setDescription(
          `
Member Unmuted Voice

Member Name: **<@${voiceOld.user.id}>**

Channel Name: <@${voiceOld.voiceChannel.name}>

`
        )
        .setColor(randomHex.generate())
        .setTimestamp();
      ch.send({ embeds: [embed] });
    } else
    if (voiceOld.serverDeaf === false && voiceNew.serverDeaf === true) {
      let ch = voiceOld.guild.channels.cache.find(
        (c) => c.name === `${log[(voiceOld, voiceNew.guild.id)].channel}`
      );
      if (!ch) return;
      let embed = new EmbedBuilder()
        .setThumbnail(userAvatar)
        .setTitle("Mod Logs")
        .setDescription(
          `
Member Deafend Voice

Member Name: **<@${voiceOld.id}>**

`
        )
        .setColor(randomHex.generate())
        .setTimestamp();
      ch.send({ embeds: [embed] });
    } else
    if (voiceOld.serverDeaf === true && voiceNew.serverDeaf === false) {
      let ch = voiceOld.guild.channels.cache.find(
        (c) => c.name === `${log[(voiceOld, voiceNew.guild.id)].channel}`
      );
      if (!ch) return;
      let embed = new EmbedBuilder()
        .setThumbnail(userAvatar)
        .setTitle("Mod Logs")
        .setDescription(
          `
Member Undeafend Voice

Member Name: **<@${voiceOld.id}>**

`
        )
        .setColor(randomHex.generate())
        .setTimestamp();
      ch.send({ embeds: [embed] });
    } else
    if (voiceOld.channelId !== voiceNew.channelId && !voiceOld.channelId) {
      let ch = voiceOld.guild.channels.cache.find(
        (c) => c.name === `${log[(voiceOld, voiceNew.guild.id)].channel}`
      );
      if (!ch) return;
      let embed = new EmbedBuilder()
        .setTitle("Mod Logs")
        .setDescription(
          `
Member Join Voice Channel

Member Name: **<@${voiceOld.id}>**

Channel Name: **${voiceNew.channel.name}**

`
        )
        .setColor(randomHex.generate())
        .setTimestamp();
      ch.send({ embeds: [embed] });
    } else
    if (voiceOld.channelId !== voiceNew.channelId && !voiceNew.channelId) {
      let ch = voiceOld.guild.channels.cache.find(
        (c) => c.name === `${log[(voiceOld, voiceNew.guild.id)].channel}`
      );
      if (!ch) return;
      let embed = new EmbedBuilder()
        .setTitle("Mod Logs")
        .setDescription(
          `
Member Leave Voice Channel

Member Name: **<@${voiceOld.id}>**

Channel Name: **${voiceOld.channel.name}**
`
        )
        .setColor(randomHex.generate())
        .setTimestamp();
      ch.send({ embeds: [embed] });
    } else
    if (
      voiceOld.channelId !== voiceNew.channelId &&
      voiceNew.channelId &&
      voiceOld.channelId != null
    ) {
      let ch = voiceOld.guild.channels.cache.find(
        (c) => c.name === `${log[(voiceOld, voiceNew.guild.id)].channel}`
      );
      if (!ch) return;
      let embed = new EmbedBuilder()
        .setThumbnail(userAvatar)
        .setTitle("Mod Logs")
        .setDescription(
          `
Member Changing Voice Channel

Member Name: **<@${voiceOld.id}>**

`
        )
        .setColor(randomHex.generate())
        .setTimestamp();
      ch.send({ embeds: [embed] });
    }
  });
});



const { Snake } = require("discord-gamecord");

client.on("messageCreate", async (message) => {
  if (message.content === prefix + "snake") {
    new Snake({
      message: message,
      slash_command: false,
      embed: {
        title: "Snake Game",
        color: "#5865F2",
        OverTitle: "Game Over",
      },
      snake: { head: "🟢", body: "🟩", tail: "🟢" },
      emojis: {
        board: "⬛",
        food: "🍎",
        up: "⬆️",
        down: "⬇️",
        right: "➡️",
        left: "⬅️",
      },
    }).startGame();
  }
});

client.on("messageCreate", async (message) => {
  if (message.content === prefix + "flood") {
    const { Flood } = require("discord-gamecord");

    const Game = new Flood({
      message: message,
      isSlashGame: false,
      embed: {
        title: "Flood",
        color: "#5865F2",
      },
      difficulty: 13,
      timeoutTime: 60000,
      buttonStyle: "PRIMARY",
      emojis: ["🟥", "🟦", "🟧", "🟪", "🟩"],
      winMessage: "You won! You took **{turns}** turns.",
      loseMessage: "You lost! You took **{turns}** turns.",
      playerOnlyMessage: "Only {player} can use these buttons.",
    });

    Game.startGame();
    Game.on("gameOver", (result) => {
      console.log(result); // =>  { result... }
    });
  }
});

client.once("ready", () => {
  console.log("ALLAH AKBAR");
  console.log("♔♔♔♔♔♔♔♔♔♔♔♔♔♔♔♔♔♔♔");
  console.log(`Logged in as ${client.user.tag}!`);
  console.log("بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ");
  console.log(
    client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)
  );
  client.user.setPresence({
    activities: [
      {
        name: `/help or ${prefix}help`,
        type: ActivityType.Watching,
      },
    ],
  });
  console.log(`Logined ${client.channels.cache.size}`);
  console.log(`Guilds: ${client.guilds.cache.size}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!interaction.channel.guild) return;
  if (interaction.commandName === "userinfo") {
    if (cooldown.has(interaction.user.id)) {
      return interaction.reply({
        content: `:stopwatch: | Please wait for 10 second`,
        ephemeral: true,
      });
    }

    cooldown.add(interaction.user.id);

    setTimeout(() => {
      cooldown.delete(interaction.user.id);
    }, cdtime * 1000);
    let heg = interaction.options.getUser("mention") || interaction.user;
    let embed = new EmbedBuilder()
      .setThumbnail(heg.avatarURL())
      .addFields([
        { name: "ID", value: `${heg.id}` },
        { name: "Name", value: `${heg.username}` },
        { name: "Discrim", value: heg.discriminator.toString() },
        { name: "Created", value: heg.createdAt.toString() },
        { name: "Bot?", value: `${heg.bot}` },
      ])
      .setColor(randomHex.generate())
      .setFooter({ text: client.user.username })
      .setTimestamp();
    await interaction.deferReply();
    await interaction.editReply({ embeds: [embed] });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.channel.guild) return;
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (cooldown.has(interaction.user.id)) {
    return interaction.reply({
      content: `:stopwatch: | Please wait for 10 second`,
      ephemeral: true,
    });
  }

  cooldown.add(interaction.user.id);

  setTimeout(() => {
    cooldown.delete(interaction.user.id);
  }, cdtime * 1000);
  if (interaction.commandName === "rps") {
    let me = interaction.member;
    let friend2 = interaction.options.getUser("mention");
    if (!friend2) return interaction.reply("Please First Mention Member");
    var rps = ["✊", "✋", "✌"];
    let random = rps[Math.floor(Math.random() * rps.length)];
    let random2 = rps[Math.floor(Math.random() * rps.length)];
    let embed = new EmbedBuilder()
      .setTitle(`Game Rps Between <@${interaction.member.id}> and ${friend2}`)
      .setDescription(
        `
Starting Game Rock Paper Scissor

<@${interaction.member.id}> ${random} vs ${random} ${friend2}
`
      )
      .setColor(randomHex.generate())
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  }
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "banner")) {
    if (cooldown.has(message.author.id)) {
      return message.channel
        .send(`:stopwatch: | Please wait for 10 second`)
        .then((m) => {
          m.delete({ timeout: cdtime * 600 });
        });
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);
    if (
      message.guild.bannerURL() === null ||
      message.guild.bannerURL === undefined
    )
      return message.reply("**❌ | This server doesn't have a banner.**");
    const ba = new EmbedBuilder()
      .setDescription(`[Banner URL](${message.guild.bannerURL()}?size=2048)`)
      .setImage(message.guild.bannerURL() + "?size=2048");
    message.reply({ embeds: [ba] });
  }
});

var ver = require("./captcha.json");
async function saveLis() {
  fs.writeFileSync("./captcha.json", JSON.stringify(ver, null, 4));
  console.log("Succes captcha Is Write!");
  try {
  } catch (err) {
    console.error(err);
  }
}
client.on("messageCreate", async (message) => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "setcaptcha")) {
    if (cooldown.has(message.author.id)) {
      return message.channel
        .send(`:stopwatch: | Please wait for 10 second`)
        .then((m) => {
          m.delete({ timeout: cdtime * 600 });
        });
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.Administrator)
    )
      return message.reply("**YOU DONT HAVE `ADMNINISTRATOR` PREMISSION**");
    let args = message.content.split(" ").slice(1).join(" ");
    let role = message.mentions.roles.first();
    if (!role) return message.reply("**Please Mention Role Or Type Name**");
    const button6 = new ButtonBuilder()
      .setLabel("Click Here")
      .setCustomId("captcha")
      .setEmoji("<:captcha:1039074427788349460>")
      .setStyle(ButtonStyle.Primary);
    let buttonRow2 = new ActionRowBuilder().addComponents([button6]);
    await message.reply({
      content: `Click Here To Starting Captcha`,
      components: [buttonRow2],
    });
    ver[message.guild.id] = {
      role: role,
    };
    saveLis();
    copyFileSync("./captcha.json", "captcha.txt");
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.channel.guild) return;
  if (interaction.isButton()) {
    if (interaction.customId === "captcha") {
      if (
        interaction.member.roles.cache.some(
          (role) => role.name === ver[interaction.guild.id].role.name
        )
      )
        return interaction.reply(
          `You already have role ${ver[interaction.guild.id].role.name}`
        );
      const Captcha = require("captcha-generator-alphanumeric").default;
      let captcha = new Captcha();
      const cath = new AttachmentBuilder(captcha.PNGStream, "captcha.png");
      interaction.channel
        .send({
          content: "**Enter the text shown in the image to verify:**",
          files: [cath],
        })
        .then((got) => {
          const msg_filter = (m) => m.member.id === interaction.member.id;
          interaction.channel
            .awaitMessages({
              filter: msg_filter,
              max: 1,
            })
            .then((collected) => {
              if (collected.first().content === captcha.value) {
                interaction.member.send(`Done You Have Been Verify`);
                interaction.member.roles.add(
                  interaction.guild.roles.cache.find(
                    (ro) => ro.name === ver[interaction.guild.id].role.name
                  )
                );
                got.delete();
              } else {
                interaction.channel.send("Failed Captcha To Verify");
                got.delete();
              }
            });
        });
    }
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "setcaptcha") {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return interaction.reply("**YOU DONT HAVE `ADMNINISTRATOR` PREMISSION**");
    let role = interaction.options.getRole("role");
    const button6 = new ButtonBuilder()
      .setLabel("Click Here")
      .setCustomId("captcha")
      .setEmoji("<:captcha:1039074427788349460>")
      .setStyle(ButtonStyle.Primary);
    let buttonRow2 = new ActionRowBuilder().addComponents([button6]);
    await interaction.reply({
      content: `Click Here To Starting Captcha`,
      components: [buttonRow2],
    });
    ver[interaction.guild.id] = {
      role: role,
    };
    saveLis();
    copyFileSync("./captcha.json", "captcha.txt");
  }
});

client.on("messageCreate", async (message) => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "userinfo")) {
    if (cooldown.has(message.author.id)) {
      return message.channel
        .send(`:stopwatch: | Please wait for 10 second`)
        .then((m) => {
          m.delete({ timeout: cdtime * 600 });
        });
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, cdtime * 1000);
    let user = message.mentions.users.first();
    var men = message.mentions.users.first();
    var heg;
    if (men) {
      heg = men;
    } else {
      heg = message.author;
    }
    var mentionned = message.mentions.members.first();
    var h;
    if (mentionned) {
      h = mentionned;
    } else {
      h = message.member;
    }
    let embed = new EmbedBuilder()
      .setThumbnail(heg.avatarURL())
      .addFields([
        { name: "ID", value: `${heg.id}` },
        { name: "Name", value: `${heg.username}` },
        { name: "Discrim", value: heg.discriminator.toString() },
        { name: "Created", value: `${moment(heg.createdAt).format("LL")}` },
        { name: "Bot?", value: `${heg.bot}` },
      ])
      .setColor(randomHex.generate())
      .setFooter({ text: client.user.username })
      .setTimestamp();
    await message.reply({ embeds: [embed] });
  }
});

var blacklist = require("./blacklist.json");
async function saveList() {
  fs.writeFileSync("./blacklist.json", JSON.stringify(blacklist, null, 4));
  console.log("Succes blacklist Is Write!");
  try {
  } catch (err) {
    console.error(err);
  }
}
client.on("messageCreate", (message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "blacklist")) {
    if (!devs.includes(message.author.id)) return;
    let args = message.content.split(" ").slice(1).join("");
    if (!args) return message.reply("Mention Member");
    let member = message.mentions.members.first();
    if (!member) return message.reply("Member not founded");
    if (!blacklist[member.id])
      blacklist[member.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[member.id].Blacklist === "On") {
    }
    message.reply(`Done Added In blacklist`);
    blacklist[member.id].Blacklist = "ON";
  }
  saveList();
  copyFileSync("./blacklist.json", "blacklist.txt");
});
client.on("messageCreate", (message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "remove")) {
    if (!devs.includes(message.author.id)) return;
    let args = message.content.split(" ").slice(1).join("");
    if (!args) return message.reply("Mention Member");
    let member = message.mentions.members.first();
    if (!member) return message.reply("I Cant Find The Member");
    message.channel.send("Removed from blacklist");
    blacklist[member.id].Blacklist = "OFF";
  }
  saveList();
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "invite") {
    const button6 = new ButtonBuilder()
      .setLabel("Click To Invite")
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=915579201325781012&permissions=8&scope=bot"
      )
      .setEmoji("<:link:1009736180365004841>")
      .setStyle(ButtonStyle.Link);
    let buttonRow2 = new ActionRowBuilder().addComponents([button6]);
    await interaction.reply({
      content: `Click To Invite Yato bot`,
      components: [buttonRow2],
    });
  }
});

client.on("messageCreate", async (message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (message.content === prefix + "invite") {
    if (!blacklist[message.author.id])
      blacklist[message.author.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[message.author.id].Blacklist === "ON") return;
    const button6 = new ButtonBuilder()
      .setLabel("Click To Invite")
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=915579201325781012&permissions=8&scope=bot"
      )
      .setEmoji("<:link:1009736180365004841>")
      .setStyle(ButtonStyle.Link);
    let buttonRow2 = new ActionRowBuilder().addComponents([button6]);
    await message.reply({
      content: `Click To Invite Yato bot`,
      components: [buttonRow2],
    });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "moveall") {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.MoveMembers)
    )
      return interaction.reply("**YOU DONT HAVE `MOVE_MEMBERS` PREMISSION**");
    if (interaction.member.voice.channel == null)
      return interaction.reply(`**Please go to voice**`);
    var author = interaction.member.voice.channel.id;
    var m = interaction.guild.members.cache.filter((m) => m.voice.channel);
    interaction.guild.members.cache
      .filter((m) => m.voice.channel)
      .forEach((m) => {
        m.voice.setChannel(author);
      });
    interaction.reply(` **✅ | Done Moved All Members From Voice**`);
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "move") {
    const user = interaction.options.getMember("target");
    if (!interaction.channel.guild || interaction.user.bot) return;
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.MoveMembers)
    )
      return interaction.reply("**YOU DON'T HAVE `MOVE_MEMBERS` PREMISSION**");
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.MoveMembers
      )
    )
      return interaction.reply("**I DON'T HAVE `MOVE_MEMBERS` PREMISSION**");
    if (!interaction.member.voice.channel)
      return interaction.reply("Your are not in voice channel");
    if (!user) return interaction.reply(`**${prefix}move <@mention or id>`);
    if (!user.voice.channel.id)
      return interaction.reply(`**${user.username}** Has not in Voice channel`);
    user.voice.setChannel(interaction.member.voice.channel.id).then(() => {
      interaction.reply(
        `**✅ | ${user}** has been moved to **${user.voice.channel.name}**`
      );
    });
  }
  if (interaction.commandName === "helpmove") {
    let move = new EmbedBuilder()
      .setTitle(`Command: move`)
      .addFields([
        {
          name: `Usage`,
          value: `/move @user or userId`,
          inline: true,
        },
        {
          name: `Information`,
          value: `Moving Member`,
          inline: true,
        },
      ])
      .setColor(randomHex.generate());
    interaction.reply({ embeds: [move] });
  }
});
client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "move all")) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.MoveMembers))
      return message.channel.send(
        "**YOU DONT HAVE `MOVE_MEMBERS` PREMISSION**"
      );
    if (message.member.voice.channel == null)
      return message.channel.send(`**Please go to voice**`);
    var author = message.member.voice.channel.id;
    var m = message.guild.members.cache.filter((m) => m.voice.channel);
    message.guild.members.cache
      .filter((m) => m.voice.channel)
      .forEach((m) => {
        m.voice.setChannel(author);
      });
    message.channel.send(` **✅ | Done Moved All Members From Voice **`);
  }
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "move")) {
    let args = message.content.split(" ");
    let user =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[1]);
    if (!message.channel.guild || message.author.bot) return;
    if (!message.member.permissions.has(PermissionsBitField.Flags.MoveMembers))
      return message.channel.send(
        "**YOU DON'T HAVE `MOVE_MEMBERS` PREMISSION**"
      );
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.MoveMembers
      )
    )
      return message.channel.send("**I DON'T HAVE `MOVE_MEMBERS` PREMISSION**");
    if (!message.member.voice.channel)
      return message.channel.send("Your are not in voice channel");
    if (!user) return message.channel.send(`**${prefix}move <@mention or id>`);
    if (!user.voice.channel.id)
      return message.channel.send(
        `**${user.username}** Has not in Voice channel`
      );
    user.voice.setChannel(message.member.voice.channel.id).then(() => {
      message.channel.send(
        `**✅ | ${user}** has been moved to **${user.voice.channel.name}**`
      );
    });
  }
  if (message.content === prefix + "helpmove") {
    let move = new EmbedBuilder()
      .setTitle(`Command: move`)
      .addFields([
        {
          name: `Usage`,
          value: `${prefix}move @user or userId`,
          inline: true,
        },
        {
          name: `Information`,
          value: `Moving Member`,
          inline: true,
        },
      ])
      .setColor(randomHex.generate());
    message.channel.send({ embeds: [move] });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "yato") {
    let yatos = [
      "https://media.discordapp.net/attachments/982291323929362505/987616549768658964/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987616606576336906/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987616642806718514/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987616688767901696/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987616758351413248/image0.gif",
      "https://images-ext-1.discordapp.net/external/icyNS-VAVU4Zs1gtHB0FkyhJyq-nh1WMAI1al4aYqvs/https/64.media.tumblr.com/3274667cd2c097fd3422695cf5662d50/tumblr_petjgz1uCP1wouno4o1_500.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987617352935948298/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987617689231048765/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987617822949666836/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987618031607889970/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987618608156921886/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987618878651768843/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987619110185738250/image0.gif",
      "https://media.discordapp.net/attachments/980165344591249408/987541977232965632/e211250295a6fe632bc9a58caa16517a.gif",
    ];
    let emb = new EmbedBuilder()
      .setTitle("Yato Gifs")
      .setImage(yatos[Math.floor(Math.random() * yatos.length)])
      .setTimestamp();
    interaction.reply({ embeds: [emb] });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "boy") {
    let man = [
      "https://media.discordapp.net/attachments/746824654840135761/985055189360852992/man3.gif",
      "https://media.discordapp.net/attachments/746824654840135761/984527846712176730/19.gif",
      "https://media.discordapp.net/attachments/746824654840135761/987092039445385327/a_2872832e74f8e9ea3e1979296509ce1c-1.gif",
      "https://media.discordapp.net/attachments/746824654840135761/987127782297460806/ezgif.com-gif-maker.gif",
      "https://media.discordapp.net/attachments/746824654840135761/987127927273558056/a_8f99812e69ff22f78829bac6f85eef38.gif",
      "https://media.discordapp.net/attachments/746824654840135761/987127927508443166/a_9b5f3e0e86c961d9e84350cf5a802d78.gif",
      "https://media.discordapp.net/attachments/746824654840135761/987127928322154516/ezgif.com-gif-maker.gif",
      "https://media.discordapp.net/attachments/746824654840135761/987127929890832424/Gif_PP_44.gif",
      "https://media.discordapp.net/attachments/746824654840135761/987325334703726682/Man_PP_Gif_80.gif",
    ];
    let emb = new EmbedBuilder()
      .setTitle("Boy Gifs")
      .setImage(man[Math.floor(Math.random() * man.length)]);
    interaction.reply({ embeds: [emb] });
  }
});

client.on("messageCreate", (message) => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "yato")) {
    if (!blacklist[message.member.id])
      blacklist[message.member.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[message.member.id].Blacklist === "ON") return;
    let yatos = [
      "https://media.discordapp.net/attachments/982291323929362505/987616549768658964/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987616606576336906/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987616642806718514/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987616688767901696/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987616758351413248/image0.gif",
      "https://images-ext-1.discordapp.net/external/icyNS-VAVU4Zs1gtHB0FkyhJyq-nh1WMAI1al4aYqvs/https/64.media.tumblr.com/3274667cd2c097fd3422695cf5662d50/tumblr_petjgz1uCP1wouno4o1_500.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987617352935948298/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987617689231048765/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987617822949666836/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987618031607889970/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987618608156921886/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987618878651768843/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/987619110185738250/image0.gif",
      "https://media.discordapp.net/attachments/980165344591249408/987541977232965632/e211250295a6fe632bc9a58caa16517a.gif",
    ];
    let emb = new EmbedBuilder()
      .setTitle("Yato Gifs")
      .setImage(yatos[Math.floor(Math.random() * yatos.length)])
      .setColor(randomHex.generate())
      .setTimestamp();
    message.reply({ embeds: [emb] });
  }
});

client.on("messageCreate", (message) => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "boy")) {
    if (!blacklist[message.member.id])
      blacklist[message.member.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[message.member.id].Blacklist === "ON") return;
    let man = [
      "https://media.discordapp.net/attachments/746824654840135761/985055189360852992/man3.gif",
      "https://media.discordapp.net/attachments/746824654840135761/984527846712176730/19.gif",
      "https://media.discordapp.net/attachments/746824654840135761/987092039445385327/a_2872832e74f8e9ea3e1979296509ce1c-1.gif",
      "https://media.discordapp.net/attachments/746824654840135761/987127782297460806/ezgif.com-gif-maker.gif",
      "https://media.discordapp.net/attachments/746824654840135761/987127927273558056/a_8f99812e69ff22f78829bac6f85eef38.gif",
      "https://media.discordapp.net/attachments/746824654840135761/987127927508443166/a_9b5f3e0e86c961d9e84350cf5a802d78.gif",
      "https://media.discordapp.net/attachments/746824654840135761/987127928322154516/ezgif.com-gif-maker.gif",
      "https://media.discordapp.net/attachments/746824654840135761/987127929890832424/Gif_PP_44.gif",
      "https://media.discordapp.net/attachments/746824654840135761/987325334703726682/Man_PP_Gif_80.gif",
    ];
    let emb = new EmbedBuilder()
      .setTitle("Boy Gifs")
      .setImage(man[Math.floor(Math.random() * man.length)])
      .setColor(randomHex.generate())
      .setTimestamp();
    message.reply({ embeds: [emb] });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "serverinfo") {
    const members = await interaction.guild.members.fetch();
    let embed = new EmbedBuilder()
      .setThumbnail(interaction.guild.iconURL())
      .addFields([
        {
          name: "Owner guild",
          value: `<@${interaction.guild.ownerId}>`,
          inline: true,
        },
        { name: "Id", value: `\`${interaction.guild.id}\``, inline: true },
        {
          name: "Guild Created In",
          value: `\`${moment(interaction.guild.createdAt).format("LL")}\``,
        },
        {
          name: `Member count`,
          value: `\`${interaction.guild.memberCount}\``,
          inline: false,
        },
        {
          name: `Channels Text`,
          value: `\`${
            interaction.guild.channels.cache.filter(
              (c) => c.type === ChannelType.GuildText
            ).size
          }\``,
          inline: false,
        },
        {
          name: `Channels Voice`,
          value: `\`${
            interaction.guild.channels.cache.filter(
              (c) => c.type === ChannelType.GuildVoice
            ).size
          }\``,
          inline: false,
        },
        {
          name: `Channels Category`,
          value: `\`${
            interaction.guild.channels.cache.filter(
              (c) => c.type === ChannelType.GuildCategory
            ).size
          }\``,
          inline: false,
        },
        {
          name: `Humans`,
          value: `\`${members.filter((member) => !member.user.bot).size}\``,
          inline: false,
        },
        {
          name: `Bots`,
          value: `\`${members.filter((member) => member.user.bot).size}\``,
          inline: false,
        },
        {
          name: "Roles",
          value: `\`${interaction.guild.roles.cache.filter((r) => r).size}\``,
          inline: true,
        },
        {
          name: "Emojis",
          value: `\`${interaction.guild.emojis.cache.size}\``,
          inline: true,
        },
        {
          name: "Channels",
          value: `\`${interaction.guild.channels.cache.size}\``,
          inline: true,
        },
        {
          name: "Preferred Locale",
          value: `\`${interaction.guild.preferredLocale}\``,
          inline: true,
        },
      ])
      .setColor(randomHex.generate());
    return interaction.reply({ embeds: [embed] });
  }
});

client.on("messageCreate", async (message) => {
  if (!message.channel.guild) return;
  if (message.content === prefix + "serverinfo") {
    const members = await message.guild.members.fetch();
    let embed = new EmbedBuilder()
      .setThumbnail(message.guild.iconURL())
      .addFields([
        {
          name: "Owner guild",
          value: `<@${message.guild.ownerId}>`,
          inline: true,
        },
        { name: "Id:", value: `\`${message.guild.id}\``, inline: true },
        {
          name: "Guild Created In",
          value: `\`${moment(message.guild.createdAt).format("LL")}\``,
        },
        {
          name: `Member count`,
          value: `\`${message.guild.memberCount}\``,
          inline: false,
        },
        {
          name: `Channels Text`,
          value: `\`${
            message.guild.channels.cache.filter(
              (c) => c.type === ChannelType.GuildText
            ).size
          }\``,
          inline: false,
        },
        {
          name: `Channels Voice`,
          value: `\`${
            message.guild.channels.cache.filter(
              (c) => c.type === ChannelType.GuildVoice
            ).size
          }\``,
          inline: false,
        },
        {
          name: `Channels Category`,
          value: `\`${
            message.guild.channels.cache.filter(
              (c) => c.type === ChannelType.GuildCategory
            ).size
          }\``,
          inline: false,
        },
        {
          name: `Humans`,
          value: `\`${members.filter((member) => !member.user.bot).size}\``,
          inline: false,
        },
        {
          name: `Bots`,
          value: `\`${members.filter((member) => member.user.bot).size}\``,
          inline: false,
        },
        {
          name: "Roles",
          value: `\`${message.guild.roles.cache.filter((r) => r).size}\``,
          inline: true,
        },
        {
          name: "Emojis",
          value: `\`${message.guild.emojis.cache.size}\``,
          inline: true,
        },
        {
          name: "Channels",
          value: `\`${message.guild.channels.cache.size}\``,
          inline: true,
        },
        {
          name: "Preferred Locale",
          value: `\`${message.guild.preferredLocale}\``,
          inline: true,
        },
      ])
      .setColor(randomHex.generate());
    return message.reply({ embeds: [embed] });
  }
});

client.on("messageCreate", (message) => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "slap")) {
    if (!blacklist[message.member.id])
      blacklist[message.member.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[message.member.id].Blacklist === "ON") return;
    let slap = [
      "https://media.discordapp.net/attachments/973495647217025104/997469886341206106/image0.gif",
      "https://media.discordapp.net/attachments/973495647217025104/997472008696770570/image0.gif",
      "https://media.discordapp.net/attachments/973495647217025104/997472203157274665/image0.gif",
      "https://media.discordapp.net/attachments/973495647217025104/997472381352284250/image0.gif",
      "https://media.discordapp.net/attachments/973495647217025104/997472520905170964/image0.gif",
      "https://media.discordapp.net/attachments/973495647217025104/997472626173812848/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/1000657135006388275/image0.gif",
    ];
    let member = message.mentions.users.first();
    if (!member) return message.reply("**Please Mention Member First**");
    if (member === client.user)
      return message.reply("**Shit you can’t slap me**");
    let emb = new EmbedBuilder()
      .setTitle(`${member} Slaped By <@${message.author.id}>`)
      .setImage(slap[Math.floor(Math.random() * slap.length)])
      .setColor(randomHex.generate())
      .setTimestamp();
    message.reply({ embeds: [emb] });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });

  if (interaction.commandName === "slap") {
    let slap = [
      "https://media.discordapp.net/attachments/973495647217025104/997469886341206106/image0.gif",
      "https://media.discordapp.net/attachments/973495647217025104/997472008696770570/image0.gif",
      "https://media.discordapp.net/attachments/973495647217025104/997472203157274665/image0.gif",
      "https://media.discordapp.net/attachments/973495647217025104/997472381352284250/image0.gif",
      "https://media.discordapp.net/attachments/973495647217025104/997472520905170964/image0.gif",
      "https://media.discordapp.net/attachments/973495647217025104/997472626173812848/image0.gif",
      "https://media.discordapp.net/attachments/982291323929362505/1000657135006388275/image0.gif",
    ];
    let member = interaction.options.getUser("mention");
    if (member === client.user)
      return interaction.reply("**Shit you can’t slap me**");
    if (member.id === "956873805479956500")
      return interaction.reply("**I Can't Slap Him Self**");
    let emb = new EmbedBuilder()
      .setTitle("Slap Gifs")
      .setImage(slap[Math.floor(Math.random() * slap.length)])
      .setTimestamp();
    interaction.reply({ embeds: [emb] });
  }
});

client.on("messageCreate", (message) => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "girl")) {
    if (!blacklist[message.member.id])
      blacklist[message.member.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[message.member.id].Blacklist === "ON") return;
    let girl = [
      "https://media.discordapp.net/attachments/746824656299753592/984850364895486062/15.gif",
      "https://media.discordapp.net/attachments/746824656299753592/984850408595931197/13.gif",
      "https://media.discordapp.net/attachments/746824656299753592/987322593252081745/96068e09a8288b81eb4f21c815043e7c.gif",
      "https://media.discordapp.net/attachments/746824656299753592/987322610209673257/Man_PP_Gif_27.gif",
      "https://media.discordapp.net/attachments/746824656299753592/987322634830229574/pp8.gif",
      "https://media.discordapp.net/attachments/746824656299753592/987322671366815764/liewwsa-1.gifis it",
      "https://media.discordapp.net/attachments/746824656299753592/987322777042321469/ms_8.gif",
      "https://media.discordapp.net/attachments/746824656299753592/987353462671024168/a_530e62afe6e23ad902e677aaf4e0b682.gif",
      "https://media.discordapp.net/attachments/746824656299753592/987354441298620466/vque_25.gif",
      "https://media.discordapp.net/attachments/746824656299753592/987366295525801984/a_94accc61ad8ccd72b20194bcff40736f.gif",
      "https://media.discordapp.net/attachments/746824656299753592/987374193001758750/kai_girl_gif_bcz_159-1.gif",
    ];

    let emb = new EmbedBuilder()
      .setTitle("Girl Gifs")
      .setImage(girl[Math.floor(Math.random() * girl.length)])
      .setColor(randomHex.generate())
      .setTimestamp();
    message.reply({ embeds: [emb] });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "girl") {
    let girl = [
      "https://media.discordapp.net/attachments/746824656299753592/984850364895486062/15.gif",
      "https://media.discordapp.net/attachments/746824656299753592/984850408595931197/13.gif",
      "https://media.discordapp.net/attachments/746824656299753592/987322593252081745/96068e09a8288b81eb4f21c815043e7c.gif",
      "https://media.discordapp.net/attachments/746824656299753592/987322610209673257/Man_PP_Gif_27.gif",
      "https://media.discordapp.net/attachments/746824656299753592/987322634830229574/pp8.gif",
      "https://media.discordapp.net/attachments/746824656299753592/987322671366815764/liewwsa-1.gifis it",
      "https://media.discordapp.net/attachments/746824656299753592/987322777042321469/ms_8.gif",
      "https://media.discordapp.net/attachments/746824656299753592/987353462671024168/a_530e62afe6e23ad902e677aaf4e0b682.gif",
      "https://media.discordapp.net/attachments/746824656299753592/987354441298620466/vque_25.gif",
      "https://media.discordapp.net/attachments/746824656299753592/987366295525801984/a_94accc61ad8ccd72b20194bcff40736f.gif",
      "https://media.discordapp.net/attachments/746824656299753592/987374193001758750/kai_girl_gif_bcz_159-1.gif",
    ];

    let emb = new EmbedBuilder()
      .setTitle("Girl Gifs")
      .setImage(girl[Math.floor(Math.random() * girl.length)]);
    interaction.reply({ embeds: [emb] });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "ping") {
    let author = interaction.options.getUser("mention") || interaction.user;
    await interaction.reply({
      content: `${author} Your Ping is ${
        Date.now() - interaction.createdTimestamp
      }ms`,
    });
  }
});

client.on("messageCreate", async (message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (message.content.startsWith(prefix + "ping")) {
    if (!blacklist[message.author.id])
      blacklist[message.author.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[message.author.id].Blacklist === "ON") return;
    let author = message.mentions.users.first() || message.author;
    await message.reply({
      content: `${author} Your Ping is ${
        Date.now() - message.createdTimestamp
      }ms`,
    });
  }
});

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "role") {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_ROLES"
      );
    const role = interaction.options.getRole("role");
    const user = interaction.options.getMember("target");
    if (!role)
      return interaction.reply({
        content: "Role not founded!",
        ephemeral: true,
      });
    if (!user)
      return interaction.reply({
        content: "User not founded!",
        ephemeral: true,
      });
    var gj = interaction.guild.roles.cache.find((roble) => roble.name === role);
    if (!role) return;
    user.roles.add(role);
    await interaction.reply(`**✅ | Done Role Added To ${user}**`);
  }
  if (interaction.commandName === "roleall") {
    const role = interaction.options.getRole("role");
    if (!role)
      return interaction.reply({
        content: "Role not founded!",
        ephemeral: true,
      });
    var gj = interaction.guild.roles.cache.find((roble) => roble.name === role);
    if (!role) return;
    interaction.guild.members.cache.forEach((m) => m.roles.add(role));
    await interaction.reply(`**✅ | Done Role Added To all members**`);
  }
  if (interaction.commandName === "rolehuman") {
    const role = interaction.options.getRole("role");
    if (!role)
      return interaction.reply({
        content: "Role not founded!",
        ephemeral: true,
      });
    const members = await interaction.guild.members.fetch();
    var gj = interaction.guild.roles.cache.find((roble) => roble.name === role);
    if (!role) return;
    members
      .filter((member) => !member.user.bot)
      .forEach((m) => m.roles.add(role));
    await interaction.reply(`**✅ | Done Role Added To Only All Members**`);
  }
  if (interaction.commandName === "rolebots") {
    const role = interaction.options.getRole("role");
    if (!role)
      return interaction.reply({
        content: "Role not founded!",
        ephemeral: true,
      });
    const members = await interaction.guild.members.fetch();
    var gj = interaction.guild.roles.cache.find((roble) => roble.name === role);
    if (!role) return;
    members
      .filter((member) => member.user.bot)
      .forEach((m) => m.roles.add(role));
    await interaction.reply(`**✅ | Done Role Added To Only All Bots**`);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "timeout") {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_SERVER"
      );
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    )
      return interaction.reply(
        "**Check My Permission And Turn On The Embed Links"
      );
    const ms = require("ms");
    const timeout = interaction.options.getString("number");
    const user = interaction.options.getMember("target");
    if (timeout < 1)
      return interaction.reply({
        content: "Type Valid A Number To Timeout!",
        ephemeral: true,
      });
    if (!user)
      return interaction.reply({
        content: "User not founded!",
        ephemeral: true,
      });
    var embed = new EmbedBuilder()
      .setThumbnail(
        "https://media.discordapp.net/attachments/941591989621751848/1021743294633492480/image0.gif"
      )
      .setTitle("Done Time Outed")
      .addFields([
        { name: "Member", value: `${user}` },
        { name: "Moderation", value: `<@${interaction.user.id}>` },
      ])
      .setColor(randomHex.generate())
      .setTimestamp()
      .setFooter({ text: "Yato Bot", iconURL: client.user.avatarURL() });
    interaction.reply({ embeds: [embed] });
    user.timeout(ms(timeout));
  }
});

client.on("messageCreate", (message) => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "timeout")) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild))
      return message.reply(
        "**Check Your Permission And Turn On The MANAGE_CHANNELS"
      );
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageGuild
      )
    )
      return message.reply(
        "**Check My Permission And Turn On The MANAGE_CHANNELS"
      );
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    )
      return message.reply("**Check My Permission And Turn On The Embed Links");
    let args = message.content.split(" ").slice(1).join(" ");
    const ms = require("ms");
    if (!args)
      return message.reply("Please Mention Member, Usage: Ytimeout @member 2h");
    let member = message.mentions.members.first();
    let timeout = message.content.split(" ").slice(2).join(" ");
    if (!timeout) return message.reply("Please Specify The Time");
    var embed = new EmbedBuilder()
      .setTitle("Done Time Outed")
      .addFields([
        { name: "Member", value: `${member}` },
        { name: "Moderation", value: `<@${message.author.id}>` },
      ])
      .setColor(randomHex.generate());
    message.channel.send({ embeds: [embed] });
    member.timeout(ms(timeout));
  }
});

client.on("messageCreate", (message) => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "clear")) {
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)
    )
      return message.reply(
        "**Check Your Permission And Turn On The MANAGE_CHANNELS"
      );
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    )
      return message.reply(
        "**Check My Permission And Turn On The MANAGE_CHANNELS"
      );
    let amount = message.content.split(" ").slice(1).join(" ");
    if (!amount)
      return message.reply("Please Write Amount To Clearing Message");
    if (!amount > 100)
      return message.reply("I cannot deleting more than 100 message");
    if (isNaN(amount)) return message.reply("Please Enter Valid Number!");
    message.channel.bulkDelete(amount, true).then((messages) => {
      message.channel.send(`Deleted ${messages.size} messages.`).then((msg) => {
        msg.delete(6000);
      });
    });
  }
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "lock")) {
    if (
      !message.member.permissions.has(PermissionsBitField.Flags.ManageChannels)
    )
      return message.reply(
        "**Check Your Permission And Turn On The MANAGE_CHANNELS"
      );
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    )
      return message.reply(
        "**Check My Permission And Turn On The MANAGE_CHANNELS"
      );
    let locking = message.channel.permissionOverwrites.create(
      message.guild.id,
      {
        SendMessages: false,
      }
    );
    message.channel.send("🔒 | Channel is locked from send_messages");
  }
  if (message.content.startsWith(prefix + "unlock")) {
    message.channel.permissionOverwrites.create(message.guild.id, {
      SendMessages: true,
    });
    message.channel.send("🔒 | Channel is unlocked from send_messages");
  }
});

client.on("messageCreate", async (message) => {
  if (!message.channel.guild) return;
  if (message.content.startsWith(prefix + "vmute")) {
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild))
      return message.reply(
        "**Check Your Permission And Turn On The MANAGE_SERVER"
      );
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    )
      return message.reply("**Check My Permission And Turn On The Embed Links");
    let user = message.mentions.members.first();
    if (!user)
      return message.reply("Please Mention Member, Usage: Ytimeout @member 2h");
    let reason = message.content.split(" ").slice(2).join(" ");
    if (!user.voice.channel)
      return message.reply(
        `⛔ | *${user.user.tag}* is not in a voice channel!`
      );
    if (user.voice.channel.mute)
      return message.reply(`Member already is muted`);
    await message.guild.members.edit(user, { mute: true });
    var embed = new EmbedBuilder().setTitle("Done Time Outed").addFields([
      { name: "Member", value: `${user}` },
      { name: "Moderation", value: `<@${message.author.id}>` },
    ]);
    message.channel.send({ embeds: [embed] });
  }
  if (message.content.startsWith(prefix + "unvmute")) {
    let user = message.mentions.members.first();
    if (!user)
      return message.reply("Please Mention Member, Usage: Ytimeout @member 2h");
    let reason = message.content.split(" ").slice(2).join(" ");
    if (!user.voice.channel)
      return message.reply(
        `⛔ | *${user.user.tag}* is not in a voice channel!`
      );
    if (user.voice.channel.mute)
      return message.reply(`Member already is muted`);
    await message.guild.members.edit(user, { mute: false });
    var embed = new EmbedBuilder()
      .setTitle("Done Remove Muted From Voice")
      .addFields([
        { name: "Member", value: `${user}` },
        { name: "Moderation", value: `<@${message.author.id}>` },
      ])
      .setColor(randomHex.generate())
      .setTimestamp()
      .setFooter({ text: "Yato Bot", iconURL: client.user.avatarURL() });
    message.channel.send({ embeds: [embed] });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "vmute") {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.MuteMembers)
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MUTE_MEMBERS"
      );
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.MuteMembers
      )
    )
      return interaction.reply(
        "**Check My Permission And Turn On The MUTE_MEMBERS"
      );
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    )
      return interaction.reply(
        "**Check My Permission And Turn On The Embed Links"
      );
    const reason = interaction.options.getString("reason");
    const user = interaction.options.getMember("target");
    if (!user.voice.channel)
      return interaction.reply(
        `⛔ | *${user.user.tag}* is not in a voice channel!`
      );
    if (user.voice.channel.mute)
      return interaction.reply(`Member already is muted`);
    await interaction.guild.members.edit(user, { mute: true });
    var embed = new EmbedBuilder()
      .setTitle("Done Muted From Voice")
      .addFields([
        { name: "Member", value: `${user}` },
        { name: "Moderation", value: `<@${interaction.user.id}>` },
        { name: "Reason", value: `${reason}` },
      ])
      .setColor(randomHex.generate())
      .setTimestamp()
      .setFooter({ text: "Yato Bot", iconURL: client.user.avatarURL() });
    interaction.reply({ embeds: [embed] });
  }
  if (interaction.commandName === "unvmute") {
    const reason = interaction.options.getString("reason");
    const user = interaction.options.getMember("target");
    if (!user.voice.channel)
      return interaction.reply(
        `⛔ | *${user.user.tag}* is not in a voice channel!`
      );
    await interaction.guild.members.edit(user, { mute: false });
    var embed = new EmbedBuilder()
      .setTitle("Done Remove Muted From Voice")
      .addFields([
        { name: "Member", value: `${user}` },
        { name: "Moderation", value: `<@${interaction.user.id}>` },
      ])
      .setColor(randomHex.generate())
      .setTimestamp()
      .setFooter({ text: "Yato Bot", iconURL: client.user.avatarURL() });
    interaction.reply({ embeds: [embed] });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "mute") {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.MuteMembers)
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MUTE_MEMBERS"
      );
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.MuteMembers
      )
    )
      return interaction.reply(
        "**Check My Permission And Turn On The MUTE_MEMBERS"
      );
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    )
      return interaction.reply(
        "**Check My Permission And Turn On The Embed Links"
      );
    const ms = require("ms");
    const reason = interaction.options.getString("reason");
    const user = interaction.options.getMember("target");
    const role = interaction.guild.roles.cache.find(
      (ro) => ro.name === "Mutedyato"
    );
    if (!role) {
      interaction.guild.roles
        .create({ name: "Mutedyato", permissions: [] })
        .then((amazon) => {
          interaction.guild.channels.cache.forEach(async (channel, id) => {
            await channel.permissionOverwrites.edit(amazon, {
              ViewChannel: false,
              SendMessages: false,
            });
            user.roles.add(amazon);
          });
        });
    }
    if (!user)
      return interaction.reply({
        content: "User not founded!",
        ephemeral: true,
      });
    if (user.roles.cache.has(role))
      return interaction.reply("Members is muted from role `Mutedyato`");
    var embed = new EmbedBuilder()
      .setTitle("Done Muted")
      .addFields([
        { name: "Member", value: `${user}` },
        { name: "Moderation", value: `<@${interaction.user.id}>` },
        { name: "Reason", value: `${reason}` },
      ])
      .setColor(randomHex.generate())
      .setTimestamp()
      .setFooter({ text: "Yato Bot", iconURL: client.user.avatarURL() });
    interaction.reply({ embeds: [embed] });
    user.roles.add(role);
  }
  if (interaction.commandName === "unmute") {
    const user = interaction.options.getMember("target");
    const role = interaction.guild.roles.cache.find(
      (ro) => ro.name === "Mutedyato"
    );
    user.roles.remove(role);
    if (!user.roles.cache.has(role.id))
      return interaction.reply("Members is not muted from role `Mutedyato`");
    interaction.reply(`**✅ | Done user unmuted from server**`);
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "ban") {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The BAN_MEMBERS"
      );
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.BanMembers
      )
    )
      return interaction.reply(
        "**Check My Permission And Turn On The BAN_MEMBERS"
      );
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    )
      return interaction.reply(
        "**Check My Permission And Turn On The Embed Links"
      );
    const reason = interaction.options.getString("reason");
    const user = interaction.options.getMember("target");
    if (!user.bannable) {
      return interaction.reply("This user have highest role, i cannot ban him self");
    }
    interaction.guild.bans.create(user);
    var embed = new EmbedBuilder()
      .setTitle("Done Banned From Server")
      .addFields([
        { name: "Member", value: `${user}` },
        { name: "Moderation", value: `<@${interaction.user.id}>` },
        { name: "Reason", value: `${reason}` },
      ])
      .setColor(randomHex.generate())
      .setTimestamp()
      .setFooter({ text: "Yato Bot", iconURL: client.user.avatarURL() });
    interaction.reply({ embeds: [embed] });
  }
  if (interaction.commandName === "unban") {
    const user = interaction.options.getString("id");
    const banus = interaction.guild.bans.fetch(user.id);
    if (!banus) return interaction.reply("Member is not banned.");
    interaction.guild.bans.remove(user);
    interaction.reply(`✅ | Done Member Unbanned from server`);
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "clear") {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_CHANNELS"
      );
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    )
      return interaction.reply(
        "**Check My Permission And Turn On The MANAGE_CHANNELS"
      );
    const amount = interaction.options.getNumber("amount");
    if (!amount)
      return interaction.reply({
        content: "Please write amount to clear message",
        ephemeral: true,
      });
    if (amount > 100)
      return interaction.reply({
        content: "I cannot deleting more than 100 message",
        ephemeral: true,
      });
    interaction.channel.bulkDelete(amount, true).then((messages) => {
      interaction.reply({
        content: `Deleted ${messages.size} messages.`,
        ephemeral: true,
      });
    });
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "setnick") {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageNicknames
      )
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_NICKNAMES"
      );
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageNicknames
      )
    )
      return interaction.reply(
        "**Check My Permission And Turn On The MANAGE_NICKNAMES"
      );
    const nick = interaction.options.getString("new_nickname");
    const user = interaction.options.getMember("user");
    if (!nick)
      return interaction.reply({
        content: "Please type nickname to new name",
        ephemeral: true,
      });
    if (nick > 32)
      return interaction.reply({
        content: "It's long characters i cannot more than 32",
      });
    user.setNickname(nick);
    await interaction.deferReply();
    await interaction.editReply(`✅ | Succesfull Changing name to ${nick}`);
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "lock") {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_CHANNELS"
      );
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    )
      return interaction.reply(
        "**Check My Permission And Turn On The MANAGE_CHANNELS"
      );
    await interaction.channel.permissionOverwrites.create(
      interaction.guild.id,
      { SendMessages: false }
    );
    await interaction.deferReply();
    await interaction.editReply(`🔒 | Channel is locked from send_messages`);
  }
  if (interaction.commandName === "unlock") {
    await interaction.channel.permissionOverwrites.create(
      interaction.guild.id,
      { SendMessages: false }
    );
    await interaction.deferReply();
    await interaction.editReply(`🔓 | Channel is unlocked from send_messages`);
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "listemojis") {
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    )
      return interaction.reply(
        "**Check My Permission And Turn On The Embed Links"
      );
    let emojis = interaction.guild.emojis.cache
      .map((r) => `${r}`)
      .sort((a, b) => a < b)
      .join(`,`);
    let emojianimated = interaction.guild.emojis.cache
      .filter((a) => a.animated)
      .map((r) => `${r}`)
      .sort((a, b) => a < b)
      .join(`,`);
    let emojinormal = interaction.guild.emojis.cache
      .filter((a) => !a.animated)
      .map((r) => `${r}`)
      .sort((a, b) => a < b)
      .join(`,`);
    let embed = new EmbedBuilder()
      .setColor(randomHex.generate())
      .setAuthor({
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setDescription(
        `**AllEmojis**; ${
          interaction.guild.emojis.cache.size
        }\n **Animated**; ${emojianimated} [${
          interaction.guild.emojis.cache.filter((a) => a.animated).size
        }]\n **Normal**; ${emojinormal} [${
          interaction.guild.emojis.cache.filter((a) => !a.animated).size
        }]`
      )
      .setFooter({ text: client.user.username })
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  }
});

var game = require("./game.json");
async function saveGame() {
  fs.writeFileSync("./game.json", JSON.stringify(game, null, 4));
  console.log("Succes Is Gamble!");
  try {
  } catch (err) {
    console.error(err);
  }
}
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "slots") {
    if (!game[interaction.member.id])
      game[interaction.member.id] = {
        cash: 0,
      };
    let amount = interaction.options.getNumber("amount");
    if (amount < 1)
      return interaction.reply(
        `** :interrobang: |type the cash you need to play game slots!**`
      );
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    )
      return interaction.reply(
        "**Check My Permission And Turn On The Embed Links"
      );
    if (!amount) return interaction.reply("Please Enter Valid Number!");
    if (amount > 50000) return interaction.reply("Maximum Game Is 50000");
    if (game[interaction.member.id].cash < amount)
      return interaction.reply("I'm sorry, but you don't have enough cash");
    let slots = ["🍇", "🍒", "🍍", "🍓"];
    let rslots = [];
    const random = require("random-number-csprng");
    let rand = (await random(1, 1000)) / 10;
    let logging = 0;
    if (rand <= 30) {
      //1x 20%
      rslots.push(slots[0]);
      rslots.push(slots[0]);
      rslots.push(slots[0]);
      logging = 0;
    } else if (rand <= 45) {
      //2x 20%
      rslots.push(slots[1]);
      rslots.push(slots[1]);
      rslots.push(slots[1]);
      logging = 1;
    } else if (rand <= 45.5) {
      //3x 5%
      rslots.push(slots[2]);
      rslots.push(slots[2]);
      rslots.push(slots[2]);
      logging = 2;
    } else if (rand <= 48.5) {
      //4x 2.5%
      rslots.push(slots[3]);
      rslots.push(slots[3]);
      rslots.push(slots[3]);
      logging = 3;
    } else {
      logging = -1;
      var slot1 = Math.floor(Math.random() * (slots.length - 1));
      var slot2 = Math.floor(Math.random() * (slots.length - 1));
      var slot3 = Math.floor(Math.random() * (slots.length - 1));
      if (slot3 == slot1)
        slot2 =
          (slot1 + Math.ceil(Math.random() * (slots.length - 2))) %
          (slots.length - 1);
      if (slot2 == slots.length - 2) slot2++;
      rslots.push(slots[slot1]);
      rslots.push(slots[slot2]);
      rslots.push(slots[slot3]);
    }
    let embed = new EmbedBuilder()
      .setTitle("🎰Slots🎰")
      .setDescription(
        `Slots Play |<a:slots:988038963132506144>|<a:slots:988038963132506144>|<a:slots:988038963132506144>`
      )
      .setColor("fdaf17");
    interaction.reply({ embeds: [embed] }).then(async (msg) => {
      if (rand <= 48.5) {
        setTimeout(() => {
          let embed = new EmbedBuilder()
            .setTitle("🎰Slots🎰")
            .setDescription(`Result: ${rslots[0]}|${rslots[1]}|${rslots[2]}`)
            .addFields([
              {
                name: `You Win Cash`,
                value: `${Number(amount).toLocaleString("en")}`,
              },
            ])
            .setColor("fdaf17");
          interaction.editReply({ embeds: [embed] });
        }, 3000);
        game[interaction.member.id].cash += parseInt(amount);
      } else if (rand > 48.5) {
        game[interaction.member.id].cash -= parseInt(amount);
        setTimeout(() => {
          let embed = new EmbedBuilder()
            .setTitle("🎰Slots🎰")
            .setDescription(`Result: ${rslots[0]}|${rslots[1]}|${rslots[2]}`)
            .addFields([
              {
                name: `You Lost Cash`,
                value: `${Number(amount).toLocaleString("en")}`,
                inline: true,
              },
            ])
            .setColor("fdaf17");
          interaction.editReply({ embeds: [embed] });
          copyFileSync("./game.json", "game.txt");
        }, 3000);
      }
    });
  }
});

const head = ["<:head:986877252421681193>"];
const tails = ["<:tails:986877238823759952>"];
client.on("messageCreate", async (message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  let args = message.content.split(" ");
  if (args[0] === prefix + "coinflip" || args[0] === prefix + "cf") {
    if (!blacklist[message.author.id])
      blacklist[message.author.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[message.author.id].Blacklist === "ON") return;
    let args = message.content.split(" ");
    let number = args.slice(1).join(" ").replace("-", "").replace("+", "");
    let amount = parseInt(number);
    let gamer = game[message.author.id].cash;
    if (isNaN(amount))
      return message.channel.send(
        `**🙄 | ${message.author.username}, Please Enter Valid Number!**`
      );
    if (amount > 50000) return message.reply("You Just Can 50,000 Cash!");
    if (args[1] < 500)
      return message.reply("The minimum you can gamble is `500` cash.");
    if (game[message.member.id].cash < amount)
      return message.reply("I'm sorry, but you don't have enough cash");
    const flipresult = flip[Math.floor(Math.random() * flip.length)];
    message
      .reply(
        `${head} **Coin Flipping And Spent <:emoji_5:990150803895484447> ${Number(
          amount
        ).toLocaleString("en")}...** ${tails}`
      )
      .then((msg) => {
        var resultflip = Math.floor(Math.random() * 2 + 1);
        if (resultflip == 1) {
          setTimeout(() => {
            msg.edit(
              `${head}The coin landed on heads and You Won **<:emoji_5:990150803895484447>${Number(
                amount
              ).toLocaleString("en")}**`
            );
          }, 2000);
          game[message.member.id].cash += parseInt(amount);
        } else if (resultflip == 2) {
          setTimeout(() => {
            msg.edit(
              `${tails}The coin landed on tails and You Lost Cash **<:emoji_5:990150803895484447>${Number(
                amount
              ).toLocaleString("en")}**`
            );
          }, 2000);
          game[message.member.id].cash -= parseInt(amount);
          saveGame();
          copyFileSync("./game.json", "game.txt");
        }
      });
  }
});

client.on("messageCreate", async (message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  let args = message.content.split(" ");
  if (args[0] === prefix + "slots" || args[0] === prefix + "s") {
    if (!blacklist[message.author.id])
      blacklist[message.author.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[message.author.id].Blacklist === "ON") return;
    if (!game[message.member.id])
      game[message.member.id] = {
        cash: 0,
      };
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    )
      return message.reply("**Check My Permission And Turn On The Embed Links");
    let args = message.content.split(" ");
    let number = args.slice(1).join(" ").replace("-", "").replace("+", "");
    let amount = parseInt(number);
    let gamer = game[message.author.id].cash;
    if (isNaN(amount))
      return message.channel.send(
        `**🙄 | ${message.author.username}, Please Enter Valid Number!**`
      );
    if (amount > 50000) return message.reply("You Just Can 50,000 Cash!");
    if (args[1] < 500)
      return message.reply("The minimum you can gamble is `500` cash.");
    if (gamer < args[1])
      return message.reply("I'm sorry, but you don't have enough cash");
    let slots = ["🍇", "🍒", "🍍", "🍓"];
    let rslots = [];
    const random = require("random-number-csprng");
    let rand = (await random(1, 1000)) / 10;
    let logging = 0;
    if (rand <= 30) {
      //1x 20%
      rslots.push(slots[0]);
      rslots.push(slots[0]);
      rslots.push(slots[0]);
      logging = 0;
    } else if (rand <= 45) {
      //2x 20%
      rslots.push(slots[1]);
      rslots.push(slots[1]);
      rslots.push(slots[1]);
      logging = 1;
    } else if (rand <= 45.5) {
      //3x 5%
      rslots.push(slots[2]);
      rslots.push(slots[2]);
      rslots.push(slots[2]);
      logging = 2;
    } else if (rand <= 48.5) {
      //4x 2.5%
      rslots.push(slots[3]);
      rslots.push(slots[3]);
      rslots.push(slots[3]);
      logging = 3;
    } else {
      logging = -1;
      var slot1 = Math.floor(Math.random() * (slots.length - 1));
      var slot2 = Math.floor(Math.random() * (slots.length - 1));
      var slot3 = Math.floor(Math.random() * (slots.length - 1));
      if (slot3 == slot1)
        slot2 =
          (slot1 + Math.ceil(Math.random() * (slots.length - 2))) %
          (slots.length - 1);
      if (slot2 == slots.length - 2) slot2++;
      rslots.push(slots[slot1]);
      rslots.push(slots[slot2]);
      rslots.push(slots[slot3]);
    }
    let embed = new EmbedBuilder()
      .setTitle("🎰Slots🎰")
      .setDescription(
        `Slots Play |<a:slots:988038963132506144>|<a:slots:988038963132506144>|<a:slots:988038963132506144>`
      )
      .setColor("fdaf17");
    message.reply({ embeds: [embed] }).then(async (msg) => {
      if (rand <= 48.5) {
        setTimeout(() => {
          let embed = new EmbedBuilder()
            .setTitle("🎰Slots🎰")
            .setDescription(`Result: ${rslots[0]}|${rslots[1]}|${rslots[2]}`)
            .addFields([
              {
                name: `You Win Cash`,
                value: `${Number(amount).toLocaleString("en")}`,
              },
            ])
            .setColor("fdaf17");
          msg.edit({ embeds: [embed] });
        }, 3000);
        game[message.member.id].cash += parseInt(amount);
      } else if (rand > 48.5) {
        game[message.member.id].cash -= parseInt(amount);
        setTimeout(() => {
          let embed = new EmbedBuilder()
            .setTitle("🎰Slots🎰")
            .setDescription(`Result: ${rslots[0]}|${rslots[1]}|${rslots[2]}`)
            .addFields([
              {
                name: `You Lost Cash`,
                value: `${Number(amount).toLocaleString("en")}`,
                inline: true,
              },
            ])
            .setColor("fdaf17");
          msg.edit({ embeds: [embed] });
          copyFileSync("./game.json", "game.txt");
        }, 3000);
      }
    });
  }
});

client.on("messageCreate", (message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  let args = message.content.split(" ");
  if (args[0] === prefix + "daily" || args[0] === prefix + "d") {
    if (!blacklist[message.author.id])
      blacklist[message.author.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[message.author.id].Blacklist === "ON") return;
    if (!game[message.author.id])
      game[message.author.id] = {
        cash: 0,
      };
    let timeout = 86400000;
    let Daily = time[message.author.id];
    if (Daily !== null && timeout - (Date.now() - Daily) > 0) {
      let times = timeout - (Date.now() - Daily);
      message.channel.send(
        `** ${message.author.username}, your daily cash refreshes in ${pretty(
          times,
          { verbose: true }
        )}**`
      );
      saveCooldown();
    } else {
      let amount = Math.floor(Math.random() * 500) + 1500;
      game[message.author.id].cash += amount;
      time[message.author.id] = Date.now();
      message.channel.send(
        `<:emoji_5:990150803895484447> | ${
          message.author.username
        }, **Done Claimed Daily ${Number(amount).toLocaleString("en")} Amount**`
      );
      saveGame();
      copyFileSync("./game.json", "game.copy");
    }
  }
});

client.on("messageCreate", (message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  let args = message.content.split(" ");
  if (args[0] === prefix + "hunt" || args[0] === prefix + "h") {
    if (!blacklist[message.author.id])
      blacklist[message.author.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[message.author.id].Blacklist === "ON") return;
    if (!game[message.author.id])
      game[message.author.id] = {
        cash: 0,
      };
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    )
      return message.reply("**Check My Permission And Turn On The Embed Links");
    var amount = Math.floor(Math.random() * 500) + 100;
    var animals = ["🐯", "🦁", "🐇", "🦨", "🦌"];
    var animal = animals[Math.floor(Math.random() * animals.length)];
    let timeoutt = 86400000;
    let Hunt = hunttime[message.member.id];
    if (Hunt !== null && timeoutt - (Date.now() - Hunt) > 0) {
      let timeshunt = timeoutt - (Date.now() - Hunt);
      message.reply(
        `** ${message.author.username}, your hunt refreshes in ${pretty(
          timeshunt,
          { verbose: true }
        )}**`
      );
      saveHunt();
    } else {
      hunttime[message.member.id] = Date.now();

      game[message.member.id].cash += amount;
      let huntEmbed = new EmbedBuilder()
        .setColor("#0155b6")
        .setThumbnail(message.member.avatarURL())
        .setDescription(
          `You hunted a **${animal}** and got **<:emoji_5:990150803895484447> ${Number(
            amount
          ).toLocaleString("en")}**`
        )
        .addFields({
          name: "Your Cash",
          value: `${game[message.member.id].cash}`,
          inline: true,
        })
        .setFooter({
          iconURL: client.user.displayAvatarURL(),
          text: client.user.tag,
        })
        .setTimestamp();
      message.reply({ embeds: [huntEmbed] });
    }
  }
});

client.on("messageCreate", (message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!game[message.author.id])
    game[message.author.id] = {
      cash: 0,
    };
  if (message.content.startsWith(prefix + "send")) {
    if (!blacklist[message.author.id])
      blacklist[message.author.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[message.author.id].Blacklist === "ON") return;
    if (
      !message.guild.members.me.permissions.has(
        PermissionsBitField.Flags.AttachFiles
      )
    )
      return message.reply(
        "**Check My Permission And Turn On The Attach Files"
      );
    var args = message.content
      .split(" ")
      .slice(2)
      .join(" ")
      .replace("-", "")
      .replace("+", "");
    if (!args) return message.reply("Please Type Cash To Transfer");
    let mention = message.mentions.users.first();
    let amount = parseInt(args);
    if (isNaN(args))
      return message.reply(
        "Opps | I Can't Transfer Cash Reason You Write A Symbol"
      );
    if (!mention) return message.reply("Member Not Founded");
    if (mention.bot)
      return message.channel.send(
        `**:thinking: | ${message.author.username}, Dont Mention Bot**`
      );
    if (mention.id === message.author.id)
      return message.channel.send(
        `**:interrobang: | ${message.author.username}, I Can’t send Cash For YourSelf**`
      );
    if (!game[message.author.id].cash) {
      return message.reply("You don't have any cash");
    }
    if (args > game[message.author.id].cash)
      return message.reply("**😕 | You Dont Have Enough Cash**");
    if (args > 5000000)
      return message.reply(
        "**🧐 | Sorry, You Just Can Transfer 5 million Cash**"
      );

    const Captcha = require("captcha-generator-alphanumeric").default;

    // Use this function for blocking certain commands or features from automated self-bots
    let captcha = new Captcha();
    const cath = new AttachmentBuilder(captcha.PNGStream, "captcha.png");
    message.channel
      .send({
        content: "**Enter the text shown in the image to transfer cash:**",
        files: [cath],
      })
      .then((got) => {
        const msg_filter = (m) => m.author.id === message.author.id;
        message.channel
          .awaitMessages({
            filter: msg_filter,
            max: 1,
          })
          .then((collected) => {
            if (collected.first().content === captcha.value) {
              message.reply(
                `<:emoji_5:990150803895484447> | ** Done Transfered ${Number(
                  amount
                ).toLocaleString("en")} Amount To **${mention.username}.`
              );
              game[message.author.id].cash -= parseInt(args);

              game[mention.id].cash += parseInt(args);
              got.delete();
            } else {
              message.channel.send("Failed Captcha To Transfer Cash");
              got.delete();
              copyFileSync("./game.json", "game.copy");
            }
          });
      });
  }
});

client.on("messageCreate", (message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  var author = message.mentions.users.first() || message.author;
  if (!game[author.id])
    game[author.id] = {
      cash: 0,
    };
  let args = message.content.split(" ");
  if (args[0] === prefix + "cash" || args[0] === prefix + "c") {
    if (!blacklist[message.author.id])
      blacklist[message.author.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[message.author.id].Blacklist === "ON") return;
    let amount = game[author.id].cash;
    if (author.bot)
      return message.channel.send(
        `**:thinking: | ${message.author.username}, bot is not have cash**`
      );
    message.channel.send(
      `<:emoji_5:990150803895484447> | ${
        author.username
      }, **Currently You Have ${Number(amount).toLocaleString("en")} Amount **`
    );
    saveGame();
  }
});
const { GiveawaysManager } = require("discord-giveaways");

// We now have a giveawaysManager property to access the manager everywhere!

client.on("ready", () => {
  console.log("Bot is ready!");
  const manager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    default: {
      botsCanWin: false,
      embedColor: randomHex.generate(),
      embedColorEnd: "#000000",
      reaction: "<a:giveaway:1019153373573943296>",
    },
  });
  client.giveawaysManager = manager;
});

var yd = require("./reply.json");
function saveReply() {
  fs.writeFileSync("./reply.json", JSON.stringify(yd, null, 4));
}
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "set-giveaway") {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_CHANNELS"
      );
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    )
      return interaction.reply(
        "**Check My Permission And Turn On The Embed Links"
      );
    let set = interaction.options.getChannel("channel");
    yd[interaction.guild.id] = {
      cha: set,
    };
    saveReply();
    let embed = new EmbedBuilder()
      .setTitle(`${interaction.guild.name}`)
      .addFields({
        name: "Channel",
        value: set.toString(),
      })
      .setFooter({ text: `${interaction.guild.name}` })
      .setColor(randomHex.generate());
    interaction.reply({ embeds: [embed] });
  }
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.channel.guild) return;
  const ms = require("ms");
  if (!yd[interaction.guild.id])
    yd[interaction.guild.id] = {
      cha: "none",
    };
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (
    interaction.isChatInputCommand() &&
    interaction.commandName === "gstart"
  ) {
    // /start 2d 1 Awesome prize!
    // Will create a giveaway with a duration of two days, with one winner and the prize will be "Awesome prize!"
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_CHANNELS"
      );
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.EmbedLinks
      )
    )
      return interaction.reply(
        "**Check My Permission And Turn On The Embed Links"
      );
    const duration = interaction.options.getString("duration");
    const winnerCount = interaction.options.getNumber("winners");
    const prize = interaction.options.getString("prize");
    const chann = interaction.guild.channels.cache.find(
      (ch) => ch.name === yd[interaction.guild.id].cha.name
    );
    if (!chann)
      return interaction.reply({
        content: "Please before giveaway setuping channel!",
        ephemeral: true,
      });
    interaction.reply({ content: "Giveaway is started", ephemeral: true });
    client.giveawaysManager
      .start(chann, {
        duration: ms(duration),
        winnerCount: winnerCount,
        prize: prize,
        reaction: "<a:giveaway:1019153373573943296>",
        embedColor: randomHex.generate(),
      })
      .then((data) => {
        console.log(data); // {...} (messageId, end date and more)
      });
    // And the giveaway has started!
  }
});
client.on("interactionCreate", (interaction) => {
  if (!interaction.channel.guild) return;
  if (interaction.isChatInputCommand() && interaction.commandName === "gend") {
    if (!blacklist[interaction.member.id])
      blacklist[interaction.member.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[interaction.member.id].Blacklist === "ON")
      return interaction.reply({
        content: "Sorry sir, you have been added in blacklist",
        ephemeral: true,
      });
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_CHANNELS"
      );

    const messageId = interaction.options.getString("message_id");
    client.giveawaysManager
      .end(messageId)
      .then(() => {
        interaction.reply({
          content: "Success! Giveaway ended!",
          ephemeral: true,
        });
      })
      .catch((err) => {
        interaction.reply(
          `An error has occurred, please check and try again.\n\`${err}\``
        );
      });
  }
});
client.on("interactionCreate", (interaction) => {
  if (!interaction.channel.guild) return;
  if (
    interaction.isChatInputCommand() &&
    interaction.commandName === "greroll"
  ) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_CHANNELS"
      );
    if (!blacklist[interaction.member.id])
      blacklist[interaction.member.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[interaction.member.id].Blacklist === "ON")
      return interaction.reply({
        content: "Sorry sir, you have been added in blacklist",
        ephemeral: true,
      });
    const messageId = interaction.options.getString("message_id");
    client.giveawaysManager
      .reroll(messageId)
      .then(() => {
        interaction.reply("Success! Giveaway rerolled!");
      })
      .catch((err) => {
        interaction.reply(
          `An error has occurred, please check and try again.\n\`${err}\``
        );
      });
  }
});
client.on("interactionCreate", (interaction) => {
  if (
    interaction.isChatInputCommand() &&
    interaction.commandName === "gpause"
  ) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_CHANNELS"
      );
    if (!blacklist[interaction.member.id])
      blacklist[interaction.member.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[interaction.member.id].Blacklist === "ON")
      return interaction.reply({
        content: "Sorry sir, you have been added in blacklist",
        ephemeral: true,
      });
    const messageId = interaction.options.getString("message_id");
    client.giveawaysManager
      .pause(messageId)
      .then(() => {
        interaction.reply("Success! Giveaway paused!");
      })
      .catch((err) => {
        interaction.reply(
          `An error has occurred, please check and try again.\n\`${err}\``
        );
      });
  }
});
client.on("interactionCreate", (interaction) => {
  if (
    interaction.isChatInputCommand() &&
    interaction.commandName === "gunpause"
  ) {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_CHANNELS"
      );
    if (!blacklist[interaction.member.id])
      blacklist[interaction.member.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[interaction.member.id].Blacklist === "ON")
      return interaction.reply({
        content: "Sorry sir, you have been added in blacklist",
        ephemeral: true,
      });
    const messageId = interaction.options.getString("message_id");
    client.giveawaysManager
      .unpause(messageId)
      .then(() => {
        interaction.reply("Success! Giveaway unpaused!");
      })
      .catch((err) => {
        interaction.reply(
          `An error has occurred, please check and try again.\n\`${err}\``
        );
      });
  }
});
client.on("interactionCreate", (interaction) => {
  if (interaction.isChatInputCommand() && interaction.commandName === "gedit") {
    if (
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.ManageChannels
      )
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_CHANNELS"
      );
    if (!blacklist[interaction.member.id])
      blacklist[interaction.member.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[interaction.member.id].Blacklist === "ON")
      return interaction.reply({
        content: "Sorry sir, you have been added in blacklist",
        ephemeral: true,
      });
    const messageId = interaction.options.getString("message_id");
    const prize = interaction.options.getString("new_prize");
    client.giveawaysManager
      .edit(messageId, {
        addTime: 5000,
        newWinnerCount: 3,
        newPrize: prize,
      })
      .then(() => {
        interaction.reply("Success! Giveaway updated!");
      })
      .catch((err) => {
        interaction.reply(
          `An error has occurred, please check and try again.\n\`${err}\``
        );
      });
  }
});

const flip = [`heads`, `tails`];
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "coinflip") {
    let amount = interaction.options.getNumber("amount");
    if (amount < 1)
      return interaction.reply(
        `** :interrobang: |type the cash you need to play game coinflip!**`
      );
    if (!amount) return interaction.reply("Please Enter Valid Number!");
    if (amount > 50000) return interaction.reply("Maximum Game Is 50000");
    if (game[interaction.member.id].cash < amount)
      return interaction.reply("I'm sorry, but you don't have enough cash");
    const flipresult = flip[Math.floor(Math.random() * flip.length)];
    interaction
      .reply(
        `${head} **Coin Flipping And Spent <:emoji_5:990150803895484447> ${Number(
          amount
        ).toLocaleString("en")}...** ${tails}`
      )
      .then((msg) => {
        var resultflip = Math.floor(Math.random() * 2 + 1);
        if (resultflip == 1) {
          setTimeout(() => {
            interaction.editReply(
              `${head}The coin landed on heads and You Won **<:emoji_5:990150803895484447>${Number(
                amount
              ).toLocaleString("en")}**`
            );
          }, 2000);
          game[interaction.member.id].cash += parseInt(amount);
        } else if (resultflip == 2) {
          setTimeout(() => {
            interaction.editReply(
              `${tails}The coin landed on tails and You Lost Cash **<:emoji_5:990150803895484447>${Number(
                amount
              ).toLocaleString("en")}**`
            );
          }, 2000);
          game[interaction.member.id].cash -= parseInt(amount);
          saveGame();
          copyFileSync("./game.json", "game.txt");
        }
      });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "cash") {
    const author = interaction.options.getUser("mention") || interaction.member;
    if (!game[author.id])
      game[author.id] = {
        cash: 0,
      };
    saveGame();
    let amount = game[author.id].cash;
    if (author.bot) return interaction.reply("The bot is not have cash");
    interaction.reply({
      content: `<:emoji_5:990150803895484447> | ${author}, **Currently You Have ${Number(
        amount
      ).toLocaleString("en")} Amount**`,
      ephemeral: true,
    });
    copyFileSync("./game.json", "game.txt");
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "send") {
    const author = interaction.options.getUser("mention");
    if (!game[author.id])
      game[author.id] = {
        cash: 0,
      };
    if (
      !interaction.guild.members.me.permissions.has(
        PermissionsBitField.Flags.AttachFiles
      )
    )
      return interaction.reply(
        "**Check My Permission And Turn On The Attach Files"
      );
    let amount = game[author.id].cash;
    if (author.bot) return interaction.reply("The bot is not have cash");
    let args = interaction.options.getNumber("amount");
    if (args < 1)
      return interaction.reply(`** 🤔 |type the cash you need to transfer!**`);
    if (interaction.user === author)
      return interaction.reply("I cannot transfer cash your self!");
    if (args > game[interaction.member.id].cash)
      return interaction.reply({
        content: `**:thinking: | You Don't Have Enough Cash To Transfer**`,
        ephemeral: true,
      });
    const Captcha = require("captcha-generator-alphanumeric").default;

    // Use this function for blocking certain commands or features from automated self-bots
    let captcha = new Captcha();
    const cath = new AttachmentBuilder(captcha.PNGStream, "captcha.png");
    interaction
      .reply({
        content: "**Enter the text shown in the image to transfer cash:**",
        files: [cath],
      })
      .then((got) => {
        const msg_filter = (m) => m.member.id === interaction.member.id;
        interaction.channel
          .awaitMessages({
            filter: msg_filter,
            max: 1,
          })
          .then((collected) => {
            if (collected.first().content === captcha.value) {
              interaction.channel.send(
                `<:emoji_5:990150803895484447> | ** Done Transfered ${Number(
                  amount
                ).toLocaleString("en")} Amount To **${author.username}.`
              );
              game[interaction.member.id].cash -= parseInt(args);

              game[author.id].cash += parseInt(args);
            } else {
              interaction.channel.send("Failed Captcha To Transfer Cash");
            }
          });
      });
  }
});
var bank = require("./bank.json");
function saveBank() {
  fs.writeFileSync("./bank.json", JSON.stringify(bank, null, 4));
}
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "bank") {
    const author = interaction.options.getUser("mention") || interaction.member;
    if (!game[author.id])
      game[author.id] = {
        cash: 0,
      };
    saveGame();
    if (!bank[author.id])
      bank[author.id] = {
        money: 0,
      };
    let amount = bank[author.id].money;
    if (author.bot) return interaction.reply("The bot is not have cash");
    let embed = new EmbedBuilder()
      .setThumbnail(interaction.member.avatarURL())
      .setColor("#FFA500")
      .setDescription(
        `

Bank Name: ${author}

You Has Money: **<:emoji_5:990150803895484447>${Number(amount).toLocaleString(
          "en"
        )}**`
      )
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  }
});

client.on("messageCreate", (message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!game[message.author.id])
    game[message.author.id] = {
      cash: 0,
    };
  if (message.content.startsWith(prefix + "bank")) {
    if (!blacklist[message.author.id])
      blacklist[message.author.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[message.author.id].Blacklist === "ON") return;
    const author = message.mentions.members.first() || message.member;
    if (!game[author.id])
      game[author.id] = {
        cash: 0,
      };
    saveGame();
    if (!bank[author.id])
      bank[author.id] = {
        money: 0,
      };
    let amount = bank[author.id].money;
    if (author.bot) return message.reply("The bot is not have cash");
    let embed = new EmbedBuilder()
      .setThumbnail(message.member.avatarURL())
      .setColor("#FFA500")
      .setDescription(
        `

Bank Name: ${author}

You Has Money: **<:emoji_5:990150803895484447> ${Number(
          bank[author.id].money
        ).toLocaleString("en")}**`
      )
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "deposit") {
    if (!game[interaction.member.id])
      game[interaction.member.id] = {
        cash: 0,
      };
    let args = interaction.options.getNumber("amount");
    if (args < 1)
      return interaction.reply(
        `** :interrobang: |type the cash you need to deposit in bank!**`
      );
    if (args > game[interaction.member.id].cash)
      return interaction.reply({
        content: `**:thinking: | You Don't Have Enough Cash To deposit**`,
        ephemeral: true,
      });
    interaction.reply(
      `<:emoji_5:990150803895484447> | **Done deposit cash in bank ${Number(
        args
      ).toLocaleString("en")}.**`
    );
    if (!bank[interaction.member.id])
      bank[interaction.member.id] = {
        money: 0,
      };
    game[interaction.member.id].cash -= parseInt(args);

    bank[interaction.member.id].money += parseInt(args);
  }
});
client.on("messageCreate", (message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!game[message.author.id])
    game[message.author.id] = {
      cash: 0,
    };
  if (message.content.startsWith(prefix + "withdraw")) {
    if (!blacklist[message.author.id])
      blacklist[message.author.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[message.author.id].Blacklist === "ON") return;
    const author = message.mentions.members.first() || message.member;
    if (!game[author.id])
      game[author.id] = {
        cash: 0,
      };
    saveGame();
    if (!bank[author.id])
      bank[author.id] = {
        money: 0,
      };
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ")
      .replace("-", "")
      .replace("+", "");
    if (!args) return message.reply("Write Withdraw To Pulling Cash");
    if (isNaN(args)) return message.reply("Just Write Number");
    if (bank[message.author.id].money === 0)
      return message.reply("You Have No Money To Withdraw From The Bank!");
    if (args > bank[message.author.id].money)
      return message.reply(`Sorry, But You Don't Have Enough Cash From Bank`);
    game[message.author.id].cash += parseInt(args);

    bank[message.author.id].money -= parseInt(args);
    message.channel.send(
      `<:emoji_5:990150803895484447> | ${
        message.author.username
      }, ** Done pulled ${Number(args).toLocaleString("en")} Amount **`
    );
    saveBank();
    copyFileSync("./bank.json", "bank.copy");
  }
});
client.on("messageCreate", (message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!game[message.author.id])
    game[message.author.id] = {
      cash: 0,
    };
  if (message.content.startsWith(prefix + "deposit")) {
    if (!blacklist[message.author.id])
      blacklist[message.author.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[message.author.id].Blacklist === "ON") return;
    const author = message.mentions.members.first() || message.member;
    if (!game[author.id])
      game[author.id] = {
        cash: 0,
      };
    saveGame();
    if (!bank[author.id])
      bank[author.id] = {
        money: 0,
      };
    let args = message.content
      .split(" ")
      .slice(1)
      .join(" ")
      .replace("-", "")
      .replace("+", "");
    if (!args) return message.reply("Write Withdraw To Deposit Cash");
    if (isNaN(args)) return message.reply("Just Write Number");
    if (args > game[message.author.id].cash)
      return message.reply("Sorry, But You dont Have enough cash to Deposit");
    bank[message.author.id].money += parseInt(args);

    game[message.author.id].cash -= parseInt(args);
    message.channel.send(
      `<:emoji_5:990150803895484447> | ${
        message.author.username
      }, ** Done deposet ${Number(args).toLocaleString("en")} Amount **`
    );
    saveBank();
    copyFileSync("./bank.json", "bank.copy");
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "withdraw") {
    if (!game[interaction.member.id])
      game[interaction.member.id] = {
        cash: 0,
      };
    saveGame();
    if (!bank[interaction.member.id])
      bank[interaction.member.id] = {
        money: 0,
      };
    saveBank();
    let args = interaction.options.getNumber("amount");
    if (args < 1)
      return interaction.reply(
        `** :interrobang: |type the cash you need to pulling in bank!**`
      );
    if (args > bank[interaction.member.id].money)
      return interaction.reply({
        content: `**:thinking: | You Don't Have Enough Cash In Bank To pulling**`,
        ephemeral: true,
      });
    interaction.reply(
      `<:emoji_5:990150803895484447> | **Done pull cash in bank ${Number(
        args
      ).toLocaleString("en")}.**`
    );
    if (!bank[interaction.member.id])
      bank[interaction.member.id] = {
        money: 0,
      };
    game[interaction.member.id].cash += parseInt(args);

    bank[interaction.member.id].money -= parseInt(args);
  }
});

client.on("messageCreate", (message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (message.content === prefix + "help") {
    if (!blacklist[message.author.id])
      blacklist[message.author.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[message.author.id].Blacklist === "ON") return;
    var row = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("select")
        .setPlaceholder("Select Commands")
        .addOptions([
          {
            label: "Economy",
            description: "CLick here to see Commands 1!",
            value: "first",
            emoji: "<a:emoji_1:981892689106718760>",
          },
          {
            label: "Gamble",
            description: "CLick here to see Commands 2!",
            value: "second",
            emoji: "<:emoji_6:981893889222905886>",
          },
          {
            label: "General",
            description: "CLick here to see Commands 3!",
            value: "third",
            emoji: "<a:emoji_5:981893874979074088>",
          },
          {
            label: "Moderation",
            description: "CLick here to see Commands 4!",
            value: "four",
            emoji: "<:mod:1021749536156291082>",
          },
          {
            label: "Gifs",
            description: "CLick here to see Commands 4!",
            value: "five",
            emoji: "<a:emoji_4:981893859019751424>",
          },
          {
            label: "Setup",
            description: "CLick here to see Commands 5!",
            value: "six",
            emoji: "<:emoji_2:981893828451631125>",
          },
          {
            label: "Config",
            description: "CLick here to see Commands 6!",
            value: "seven",
            emoji: "<a:config:987665261119303700>",
          },
          {
            label: "Music",
            description: "CLick here to see Commands 7!",
            value: "eight",
            emoji: "<:Music:1014960120884646028>",
          },
          {
            label: "Giveaway",
            description: "CLick here to see Commands 8!",
            value: "nine",
            emoji: "<a:giveaway:1019153373573943296>",
          },
        ])
    );
    const button6 = new ButtonBuilder()
      .setLabel("Click To Invite")
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=915579201325781012&permissions=8&scope=bot"
      )
      .setEmoji("<:link:1009736180365004841>")
      .setStyle(ButtonStyle.Link);
    let buttonRow2 = new ActionRowBuilder().addComponents([button6]);

    let embed = new EmbedBuilder()
      .setAuthor({
        iconURL: message.author.displayAvatarURL(),
        name: message.author.tag,
      })
      .setThumbnail(message.member.avatarURL())
      .setTitle("Yato Bot")
      .setDescription("Choose Option To Select Commands")
      .setColor(randomHex.generate());

    message.reply({
      embeds: [embed],
      components: [row, buttonRow2],
      ephermal: true,
    });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === "help") {
    var row = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("select")
        .setPlaceholder("Select Commands")
        .addOptions([
          {
            label: "Economy",
            description: "CLick here to see Commands 1!",
            value: "first",
            emoji: "<a:emoji_1:981892689106718760>",
          },
          {
            label: "Gamble",
            description: "CLick here to see Commands 2!",
            value: "second",
            emoji: "<:emoji_6:981893889222905886>",
          },
          {
            label: "General",
            description: "CLick here to see Commands 3!",
            value: "third",
            emoji: "<a:emoji_5:981893874979074088>",
          },
          {
            label: "Moderation",
            description: "CLick here to see Commands 4!",
            value: "four",
            emoji: "<:mod:1021749536156291082>",
          },
          {
            label: "Gifs",
            description: "CLick here to see Commands 4!",
            value: "five",
            emoji: "<a:emoji_4:981893859019751424>",
          },
          {
            label: "Setup",
            description: "CLick here to see Commands 5!",
            value: "six",
            emoji: "<:emoji_2:981893828451631125>",
          },
          {
            label: "Config",
            description: "CLick here to see Commands 6!",
            value: "seven",
            emoji: "<a:config:987665261119303700>",
          },
          {
            label: "Music",
            description: "CLick here to see Commands 7!",
            value: "eight",
            emoji: "<:Music:1014960120884646028>",
          },
          {
            label: "Giveaway",
            description: "CLick here to see Commands 8!",
            value: "nine",
            emoji: "<a:giveaway:1019153373573943296>",
          },
        ])
    );
    const button6 = new ButtonBuilder()
      .setLabel("Click To Invite")
      .setURL(
        "https://discord.com/api/oauth2/authorize?client_id=915579201325781012&permissions=8&scope=bot"
      )
      .setEmoji("<:link:1009736180365004841>")
      .setStyle(ButtonStyle.Link);
    let buttonRow2 = new ActionRowBuilder().addComponents([button6]);

    let embed = new EmbedBuilder()
      .setAuthor({
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setThumbnail(interaction.member.avatarURL())
      .setTitle("Yato Bot")
      .setDescription("Choose Option To Select Commands")
      .setColor(randomHex.generate());

    interaction.reply({
      embeds: [embed],
      components: [row, buttonRow2],
      ephermal: true,
    });

    let help1 = new EmbedBuilder()
      .setAuthor({
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setTitle("Command Economy")
      .setDescription(
        `
Slash Command   


\`send, cash(c), daily(d), topcash, toprank,
bank, deposit, pull, hunt(h), rep\`
     `
      )
      .setColor(randomHex.generate());

    let help2 = new EmbedBuilder()
      .setAuthor({
        name: interaction.user.tag,
      })
      .setTitle("Command Gamble").setDescription(`
Slash Commands or ${prefix}


\`hack, rps, kill, ship, coinflip(cf), slots(s), snake, blackjack(bj)\`
     `);

    let help3 = new EmbedBuilder()
      .setAuthor({
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setTitle("Command General")
      .setDescription(
        `
Slash Commands or ${prefix}


\`YinfoPrefix, invite, serverinfo, userinfo, ping, listemojis, profile, banner\`
     `
      )
      .setColor(randomHex.generate());
    let help4 = new EmbedBuilder()
      .setAuthor({
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setTitle("Command Gifs")
      .setDescription(
        `
Slash Commands or ${prefix}


\`yato, meme, girl, boy, slap\`
     `
      )
      .setColor(randomHex.generate());

    let help5 = new EmbedBuilder()
      .setAuthor({
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setTitle("Command Setups")
      .setDescription(
        `
Slash Commands   

Only Manage Guild Can Use That Command

\`setprefix, set-reply, setWelcomer, setBackground, setArole\`
     `
      )

      .setColor(randomHex.generate());

    let help6 = new EmbedBuilder()
      .setAuthor({
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setTitle("Command Configs")
      .setDescription(
        `
Slash Commands   

Only Manage Guild Can Use That Command

\`tReply on/off, tWelcomer on/off, tArole on/off, tLeave on/off\`
     `
      )
      .setColor(randomHex.generate());
    let help7 = new EmbedBuilder()
      .setTitle("Command Music")
      .setDescription(
        `
Slash Commands   


\`play, stop, skip, volume, seek, loop\`
     `
      )
      .setColor(randomHex.generate());
  }
});
client.on("interactionCreate", async (interaction) => {
  if (interaction.isSelectMenu()) {
    if (interaction.customId == "select") {
      let vl = interaction.values[0];
      if (vl === "first") {
        let help1 = new EmbedBuilder()
          .setAuthor({
            iconURL: interaction.user.displayAvatarURL(),
            name: interaction.user.tag,
          })
          .setTitle("Command Economy")
          .setDescription(
            `
Slash Command or ${prefix}


\`send, cash, daily, topcash, toprank,
bank, deposit, withdraw, hunt, rep\`
     `
          )
          .setColor(randomHex.generate());
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
          embeds: [help1],
          ephemeral: true,
        });
      }
      if (vl === "second") {
        let help2 = new EmbedBuilder()
          .setAuthor({
            name: interaction.user.tag,
          })
          .setTitle("Command Gamble").setDescription(`
Slash Commands or ${prefix}


\`ship, coinflip, slots, blackjack, snake, akinator, fight, tictactoe, flood\`
     `);
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
          embeds: [help2],
          ephemeral: true,
        });
      }
      if (vl === "third") {
        let help3 = new EmbedBuilder()
          .setAuthor({
            iconURL: interaction.user.displayAvatarURL(),
            name: interaction.user.tag,
          })
          .setTitle("Command General")
          .setDescription(
            `
Slash Commands or ${prefix}


\`invite, serverinfo, userinfo, ping, listemojis, profile, top, toptext, topvoice, invites, top-invites\`
     `
          )
          .setColor(randomHex.generate());
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
          embeds: [help3],
          ephemeral: true,
        });
      }
      if (vl === "four") {
        let help4 = new EmbedBuilder()
          .setAuthor({
            iconURL: interaction.user.displayAvatarURL(),
            name: interaction.user.tag,
          })
          .setTitle("Command Moderation")
          .setDescription(
            `
Slash Commands   

\`role, roleall, rolehuman, rolebots, move, moveall, helpmove, timeout, ban, unban, mute, unmute, vmute, unvmute, clear, lock, unlock, setnick\`
     `
          )
          .setColor(randomHex.generate());
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
          embeds: [help4],
          ephemeral: true,
        });
      }
      if (vl === "five") {
        let help5 = new EmbedBuilder()
          .setAuthor({
            iconURL: interaction.user.displayAvatarURL(),
            name: interaction.user.tag,
          })
          .setTitle("Command Gifs")
          .setDescription(
            `
Slash Commands or ${prefix}  


\`yato, girl, boy, slap\`
     `
          )
          .setColor(randomHex.generate());
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
          embeds: [help5],
          ephemeral: true,
        });
      }
      if (vl === "six") {
        let help6 = new EmbedBuilder()
          .setAuthor({
            iconURL: interaction.user.displayAvatarURL(),
            name: interaction.user.tag,
          })
          .setTitle("Command Setups")
          .setDescription(
            `
Slash Commands   

Only Manage Guild Can Use That Command

\`setWelcomer, setBackground, setautorole, set-giveaway, setreply, setcaptcha, setlog\`
     `
          )

          .setColor(randomHex.generate());
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
          embeds: [help6],
          ephemeral: true,
        });
      }
      if (vl === "seven") {
        let help7 = new EmbedBuilder()
          .setAuthor({
            iconURL: interaction.user.displayAvatarURL(),
            name: interaction.user.tag,
          })
          .setTitle("Command Configs").setDescription(`
Slash Commands   

Only Manage Guild Can Use That Command

\`welcomeroff, autoroleoff, resettop, logoff\`
     `);
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
          embeds: [help7],
          ephemeral: true,
        });
      }
      if (vl === "eight") {
        let help8 = new EmbedBuilder()
          .setTitle("Command Music")
          .setDescription(
            `
Slash Commands or ${prefix}


\`play, stop, resume, skip, volume, seek, np\`
     `
          )
          .setColor(randomHex.generate());
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
          embeds: [help8],
          ephemeral: true,
        });
      }
      if (vl === "nine") {
        let help9 = new EmbedBuilder()
          .setTitle("Command Giveaway")
          .setDescription(
            `
Slash Commands   


\`gstart, gend, grerrol, gedit, gpause, gunpause\`
     `
          )
          .setColor(randomHex.generate());
        await interaction.deferReply({ ephemeral: true });
        await interaction.editReply({
          embeds: [help9],
          ephemeral: true,
        });
      }
    }
  }
});

const TicTacToe = require("discord-tictactoe");
const games = new TicTacToe({ language: "en" });

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "tictactoe")) {
    let us = message.mentions.members.first();
    games.handleMessage(message);
  }
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "c4")) {
    const { ConnectFour } = require("gameon-games");
    const game = new ConnectFour({
      message: message,
      player1: "🔴",
      player2: "🟡",
    });
    game.start();
  }
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith(prefix + "rps")) {
    let friend2 = message.mentions.members.first();
    if (!friend2) return message.reply("Please First Mention Member");
    var rps = ["🪨", "📄", "✂️"];
    let random = rps[Math.floor(Math.random() * rps.length)];
    let random2 = rps[Math.floor(Math.random() * rps.length)];
    let embed = new EmbedBuilder()
      .setTitle(`Game Rps Between <@${message.author.id}> and ${friend2}`)
      .setDescription(
        `
Starting Game Rock Paper Scissor

<@${message.author.id}> ${random} vs ${random} ${friend2}
`
      )
      .setColor(randomHex.generate())
      .setTimestamp();
    message.channel.send({ embeds: [embed] });
  }
});

var time = require("./time.json");
function saveCooldown() {
  fs.writeFileSync("./time.json", JSON.stringify(time, null, 4));
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "daily") {
    if (!game[interaction.member.id])
      game[interaction.member.id] = {
        cash: 0,
      };
    saveGame();
    let timeout = 86400000;
    let Daily = time[interaction.member.id];
    if (Daily !== null && timeout - (Date.now() - Daily) > 0) {
      let times = timeout - (Date.now() - Daily);
      interaction.reply(
        `** ${interaction.user.username}, your daily cash refreshes in ${pretty(
          times,
          { verbose: true }
        )}**`
      );
      saveCooldown();
    } else {
      let amount = Math.floor(Math.random() * 500) + 1500;
      game[interaction.member.id].cash += amount;
      time[interaction.member.id] = Date.now();
      interaction.reply(
        `<:emoji_5:990150803895484447> | ${interaction.user.username}, **Done Claimed Daily ${amount} Amount**`
      );
      copyFileSync("./game.json", "game.txt");
    }
  }
});

const drawLevelImage = require("image-generators-level");
const Canvas = require("canvas");
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "profile") {
    const author = interaction.options.getUser("mention") || interaction.user;
    if (!rep[author.id]) {
      rep[author.id] = {
        reps: 0,
      };
    }
    saveRep();
    if (!xp[author.id]) {
      xp[author.id] = {
        xp: 0,
        level: 1,
      };
    }
    saveBlackJack();
    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext("2d");
    ///700, 250
    const background = await Canvas.loadImage(
      "https://media.discordapp.net/attachments/1003564083754319882/1011941954793263134/20220824_131538.png"
    );
    const ava = await Canvas.loadImage(
      await author.displayAvatarURL({ extension: "png" })
    );
    context.drawImage(background, 0, 0, 700, 250);

    context.font = "28px sans-serif";
    context.fillStyle = "#ffffff";
    context.fillText(
      `Name User: ${author.tag}!`,
      canvas.width / 2.5,
      canvas.height / 2.5
    );

    context.fillText(
      `Level: ${xp[author.id].level}`,
      canvas.width / 2.5,
      canvas.height / 1.8
    );

    context.fillText(
      `Xp: ${xp[author.id].xp}`,
      canvas.width / 2.5,
      canvas.height / 1.5
    );

    context.fillText(
      `Rep: ${rep[author.id].reps}`,
      canvas.width / 2.5,
      canvas.height / 1.2
    );
    // Add an exclamation point here and belo
    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    //   context.stroke ();
    context.clip();
    context.drawImage(ava, 25, 27, 200, 200);
    //25, 27, 200, 200
    const attachment = new AttachmentBuilder(await canvas.toBuffer());

    interaction.reply({ files: [attachment] });
  }
});


client.on("messageCreate", async (message) => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  let args = message.content.split(" ");
  if (args[0] === prefix + "profile" || args[0] === prefix + "p") {
    if (!blacklist[message.author.id])
      blacklist[message.author.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[message.author.id].Blacklist === "ON") return;
    const author = message.mentions.members.first() || message.author;
    if (!rep[author.id]) {
      rep[author.id] = {
        reps: 0,
      };
    }
    saveRep();
    if (!xp[author.id]) {
      xp[author.id] = {
        xp: 0,
        level: 1,
      };
    }
    saveBlackJack();
    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext("2d");
    ///700, 250
    const background = await Canvas.loadImage(
      "https://media.discordapp.net/attachments/1003564083754319882/1011941954793263134/20220824_131538.png"
    );
    const ava = await Canvas.loadImage(
      await author.displayAvatarURL({ extension: "png" })
    );
    context.drawImage(background, 0, 0, 700, 250);

    context.font = "30px Arial";
    context.fillStyle = "#ffffff";
    context.fillText(
      `Name User: ${author.tag}!`,
      canvas.width / 2.5,
      canvas.height / 2.5
    );
    context.fillText(
      `Level: ${xp[author.id].level}`,
      canvas.width / 2.5,
      canvas.height / 1.8
    );

    context.fillText(
      `Xp: ${xp[author.id].xp}`,
      canvas.width / 2.5,
      canvas.height / 1.5
    );

    context.fillText(
      `Rep: ${rep[author.id].reps}`,
      canvas.width / 2.5,
      canvas.height / 1.2
    );
    // Add an exclamation point here and belo
    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    //   context.stroke ();
    context.clip();
    context.drawImage(ava, 25, 27, 200, 200);
    //25, 27, 200, 200
    const attachment = new AttachmentBuilder(await canvas.toBuffer());

    message.reply({ files: [attachment] });
  }
});

var xp = require("./xp.json");
async function saveBlackJack() {
  fs.writeFileSync("./xp.json", JSON.stringify(xp, null, 4));
  console.log("Succes Is level xp!");
  try {
  } catch (err) {
    console.error(err);
  }
}
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;
  if (!message.channel.guild) return;
  let Addxp = Math.floor(Math.random() * 6) + 8;

  if (!xp[message.member.id]) {
    xp[message.member.id] = {
      xp: 0,
      level: 1,
    };
  }
  saveBlackJack();
  let curxp = xp[message.member.id].xp;
  let curlvl = xp[message.member.id].level + 1;
  const nxtLvl = xp[message.member.id].level * 1000;
  xp[message.member.id].xp = curxp + Addxp;
  if (nxtLvl <= xp[message.member.id].xp) {
    xp[message.member.id].level = xp[message.member.id].level + 1;
  }
  saveBlackJack();
  copyFileSync("./xp.json", "xp.txt");
});
var rep = require("./rep.json");
function saveRep() {
  fs.writeFileSync("./rep.json", JSON.stringify(rep, null, 4));
}
var reptime = require("./reptime.json");
function saveTime() {
  fs.writeFileSync("./reptime.json", JSON.stringify(reptime, null, 4));
}
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "rep") {
    const author = interaction.options.getUser("mention");
    if (!rep[author.id])
      rep[author.id] = {
        reps: 0,
      };
    if (author.bot) return interaction.reply(`Bot is don't want rep`);
    let timeougt = 86400000;
    let repin = reptime[interaction.member.id];
    if (xp[interaction.member.id].level < 20)
      return interaction.reply("Sorry Your Account Level Is Low");
    if (repin !== null && timeougt - (Date.now() - repin) > 0) {
      let cl = timeougt - (Date.now() - repin);
      interaction.channel.send(
        `** ${interaction.user.username}, your rep refreshes in ${pretty(cl, {
          verbose: true,
        })}**`
      );
      saveTime();
    } else {
      reptime[interaction.member.id] = Date.now();

      interaction.reply(
        `**<a:emoji_9:996734245093527584> | Done Reped For ${author} By <@${interaction.user.id}>**`
      );
      const srep = rep[author.id].reps;
      rep[author.id] = { reps: srep + parseInt("1") };
      saveRep();
    }
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "welcomeroff") {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_ROLES"
      );
    welcomer[interaction.guild.id] = {
      onoff: "off",
    };
    saveWelcomer();
    interaction.reply("Done The Toggle Welcomer disabled");
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "inviteroff") {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_ROLES"
      );
    invos[interaction.guild.id] = {
      onoff: "off",
    };
    saveInvos();
    interaction.reply("Done The Toggle Inviter disabled");
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "autoroleoff") {
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_ROLES"
      );
    autorole[interaction.guild.id] = {
      onoff: "off",
    };
    saveAutorole();
    interaction.reply("Done The Toggle Autorole disabled");
  }
});
var hunttime = require("./hunttime.json");
function saveHunt() {
  fs.writeFileSync("./hunttime.json", JSON.stringify(hunttime, null, 4));
}
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "hunt") {
    var amount = Math.floor(Math.random() * 500) + 100;
    var animals = ["🐯", "🦁", "🐇", "🦨", "🦌"];
    var animal = animals[Math.floor(Math.random() * animals.length)];
    let timeoutt = 86400000;
    let Hunt = hunttime[interaction.member.id];
    if (Hunt !== null && timeoutt - (Date.now() - Hunt) > 0) {
      let timeshunt = timeoutt - (Date.now() - Hunt);
      interaction.reply(
        `** ${interaction.user.username}, your hunt refreshes in ${pretty(
          timeshunt,
          { verbose: true }
        )}**`
      );
      saveHunt();
    } else {
      hunttime[interaction.member.id] = Date.now();

      game[interaction.member.id].cash += amount;
      let huntEmbed = new EmbedBuilder()
        .setColor("#0155b6")
        .setThumbnail(interaction.member.avatarURL())
        .setDescription(
          `You hunted a **${animal}** and got **<:emoji_5:990150803895484447> ${amount}**`
        )
        .addFields({
          name: "Your Cash",
          value: `${game[interaction.member.id].cash}`,
          inline: true,
        })
        .setFooter({
          iconURL: client.user.displayAvatarURL(),
          text: client.user.tag,
        })
        .setTimestamp();
      interaction.reply({ embeds: [huntEmbed] });
    }
  }
});
var autorole = require("./autorole.json");
function saveAutorole() {
  fs.writeFileSync("./autorole.json", JSON.stringify(autorole, null, 4));
}
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "setautorole") {
    const role = interaction.options.getString("role");
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_ROLES"
      );
    if(!role) return interaction.reply("Please Type Role Name")
    interaction.reply(`Done Autorole is setup | role name ${role}`);
    autorole[interaction.guild.id] = {
      auto: role,
      onoff: "on",
    };
    saveAutorole();
  }
});
client.on("guildMemberAdd", (member) => {
  if (!autorole[member.guild.id])
    autorole[member.guild.id] = {
      onoff: "Off",
    };
  if (autorole[member.guild.id].onoff === "Off") return;
  const role = member.guild.roles.cache.find((r) => r.name === autorole[member.guild.id].auto);
  if (!role) return console.log("Not Setuped")
  member.roles.add(role);
});
var welcomer = require("./welcomer.json");
function saveWelcomer() {
  fs.writeFileSync("./welcomer.json", JSON.stringify(welcomer, null, 4));
}
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "setwelcomer") {
    const channel = interaction.options.getString("channel")
    if(!channel) return interaction.reply("Please Type Correct Channel To Seting Welcomer")
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_SERVER"
      );
    interaction.reply(
      `Done channel welcomer is setup | channel name ${channel}`
    );
    welcomer[interaction.guild.id] = {
      channel: channel,
      onoff: "on",
    };
    saveWelcomer();
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "fight")) {
    let opponent = message.mentions.members.first();
    let action = [];
    const positions = {
      three:
        "_ _        :levitate: :point_right:      **3**        :point_left: :levitate:",
      two: "_ _        :levitate: :point_right:      **2**        :point_left: :levitate:",
      one: "_ _        :levitate: :point_right:      **1**        :point_left: :levitate:",
      go: "_ _        :levitate: :point_right:      **GO!**        :point_left: :levitate:",
      ended1:
        "_ _     :levitate: :point_right:      **STOP!**        :skull_crossbones: :levitate:",
      ended2:
        "_ _     :levitate: :skull_crossbones:      **STOP!**        :point_left: :levitate:",
    };

    const duel = await message.reply({
      content: positions.three,
      components: [
        (action = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("shoot1")
            .setLabel("shoot!")
            .setStyle(ButtonStyle.Primary)
            .setDisabled(true),
          new ButtonBuilder()
            .setCustomId("doesnt Matter")
            .setLabel("\u200b")
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(true),
          new ButtonBuilder()
            .setCustomId("shoot2")
            .setLabel("shoot!")
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true)
        )),
      ],
    });

    function countdown() {
      setTimeout(() => {
        duel.edit({
          content: positions.two,
        });
      }, 1000);
      setTimeout(() => {
        duel.edit({
          content: positions.one,
        });
      }, 2000);
      setTimeout(() => {
        duel.edit({
          content: positions.go,
          components: [
            (action = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setCustomId("shoot1")
                .setLabel("shoot!")
                .setStyle(ButtonStyle.Primary)
                .setDisabled(false),
              new ButtonBuilder()
                .setCustomId("doesnt Matter")
                .setLabel("\u200b")
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(false),
              new ButtonBuilder()
                .setCustomId("shoot2")
                .setLabel("shoot!")
                .setStyle(ButtonStyle.Danger)
                .setDisabled(false)
            )),
          ],
        });
      }, 3000);
    }
    countdown();
    client.on("interactionCreate", async (interaction) => {
      if (interaction.isButton()) {
        if (
          interaction.customId === "shoot1" &&
          interaction.member.id === interaction.member.id
        ) {
          duel.edit({
            content: positions.ended1,
            components: [
              (action = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                  .setCustomId("shoot1")
                  .setLabel("shoot!")
                  .setStyle(ButtonStyle.Primary)
                  .setDisabled(true),
                new ButtonBuilder()
                  .setCustomId("doesnt Matter")
                  .setLabel("\u200b")
                  .setStyle(ButtonStyle.Secondary)
                  .setDisabled(true),
                new ButtonBuilder()
                  .setCustomId("shoot2")
                  .setLabel("shoot!")
                  .setStyle(ButtonStyle.Danger)
                  .setDisabled(true)
              )),
            ],
          });
          await interaction.channel.send(`<@${interaction.member.id}> won!`);
        }
        if (
          interaction.customId === "shoot2" &&
          interaction.member.id === opponent.id
        ) {
          duel.edit({
            content: positions.ended2,
            components: [
              (action = new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                  .setCustomId("shoot1")
                  .setLabel("shoot!")
                  .setStyle(ButtonStyle.Primary)
                  .setDisabled(true),
                new ButtonBuilder()
                  .setCustomId("doesnt Matter")
                  .setLabel("\u200b")
                  .setStyle(ButtonStyle.Secondary)
                  .setDisabled(true),
                new ButtonBuilder()
                  .setCustomId("shoot2")
                  .setLabel("shoot!")
                  .setStyle(ButtonStyle.Danger)
                  .setDisabled(true)
              )),
            ],
          });
          await interaction.channel.send(`<@${opponent.id}> won!`);
        }
      }
    });
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "catchfish")) {
  }
});
var hs = require("./response.json");
function savej() {
  fs.writeFileSync("./response.json", JSON.stringify(hs, null, 4));
}
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "setreply") {
    const message = interaction.options.getString("message");
    const repl = interaction.options.getString("reply");
    if (
      !interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)
    )
      return interaction.reply(
        "**Check Your Permission And Turn On The MANAGE_GUILD"
      );
    if (!message) return interaction.reply("Please Type message");
    if (!repl) return interaction.reply("Please Type reply");
    interaction.reply({
      content: `Done the set reply is setuped, now type ${message}`,
    });
    hs[interaction.guild.id] = {
      msg: message,
      reply: repl,
    };
    savej();
  }
});
client.on("messageCreate", async (msg) => {
  if (!msg.channel.guild) return;
  if (!hs[msg.guild.id])
    hs[msg.guild.id] = {
      msg: "nsidjwidheiudid",
      reply: "makakaodjdu",
    };
  savej();
  if (msg.content === hs[msg.guild.id].msg) {
    msg.reply(`${hs[msg.guild.id].reply}`);
  }
});

var mr = require("./swlc.json");
function saveStyle() {
  fs.writeFileSync("./swlc.json", JSON.stringify(mr, null, 4));
}
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  if (!mr[interaction.guild.id])
    mr[interaction.guild.id] = {
      background:
        "https://media.discordapp.net/attachments/982291323929362505/1011988834512277524/IMG_3015.jpg",
    };
  if (!blacklist[interaction.member.id])
    blacklist[interaction.member.id] = {
      Blacklist: "OFF",
    };
  if (blacklist[interaction.member.id].Blacklist === "ON")
    return interaction.reply({
      content: "Sorry sir, you have been added in blacklist",
      ephemeral: true,
    });
  if (interaction.commandName === "setbackground") {
    let background = interaction.options.getString("background")
    if(!background) return interaction.reply({content: "Please Type Correct Background", ephemeral: true})
    interaction.reply({
      content:
        "Done Background Command Has Been Setuped",
      ephemeral: true,
    });
    mr[interaction.guild.id] = {
      background: background,
    };
  }
});

client.on("guildMemberAdd", async (member) => {
  if (!welcomer[member.guild.id])
    welcomer[member.guild.id] = {
      onoff: "Off",
      channel: "qosjflnsldbsxhrlajdos",
    };
  if (welcomer[member.guild.id].onoff === "Off") return;
  let channel = member.guild.channels.cache.find(
    (c) => c.name == welcomer[member.guild.id].channel
  );
  if (!channel) return;
  if (
    !member.guild.members.me.permissions.has(
      PermissionsBitField.Flags.SendMessages
    )
  )
    return;
  if (
    !member.guild.members.me.permissions.has(
      PermissionsBitField.Flags.AttachFiles
    )
  )
    return;
  const canvas = Canvas.createCanvas(700, 250);
  const ctx = canvas.getContext("2d");
  // Load the background image and draw it to the canvas
  if (!mr[member.guild.id])
    mr[member.guild.id] = {
      background:
        "https://cdn.glitch.global/cb997bc3-5812-4231-8fcd-89c2da3382a0/55E57367-57E6-43C1-B934-34B68AA518BB.jpeg?v=1662542984146",
    };
  saveStyle();
  const background = await Canvas.loadImage(
    "https://cdn.glitch.global/cb997bc3-5812-4231-8fcd-89c2da3382a0/55E57367-57E6-43C1-B934-34B68AA518BB.jpeg?v=1662542984146" ||
      `${mr[member.guild.id].background}`
  );
  let x = 0;
  let y = 0;
  ctx.drawImage(background, 0, 0, 700, 250);
  // Load the user's profile
  const pfp = await Canvas.loadImage(
    member.user.displayAvatarURL({
      extension: "png",
    })
  );
  x = canvas.width / 2 - pfp.width / 2;
  y = 25;
  ctx.drawImage(pfp, x, y);
  // Display user text
  ctx.fillStyle = "#ffffff"; // White text
  ctx.font = "35px sans-serif";
  let text = `Welcome ${member.user.tag}!`;
  x = canvas.width / 2 - ctx.measureText(text).width / 2;
  ctx.fillText(text, x, 60 + pfp.height);
  // Display member count
  ctx.font = "30px sans-serif";
  text = `${member.guild.name}`;
  x = canvas.width / 2 - ctx.measureText(text).width / 2;
  ctx.fillText(text, x, 100 + pfp.height);
  const attachment = new AttachmentBuilder(await canvas.toBuffer());
  channel.send({ files: [attachment] });
  channel.send(`
Welcome To Our Server 

Name User: ${member}

User Id: ${member.id}

You Are The Member: ${member.guild.memberCount}
  `);
});
saveWelcomer();

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ship") {
    if (!blacklist[interaction.member.id])
      blacklist[interaction.member.id] = {
        Blacklist: "OFF",
      };
    if (blacklist[interaction.member.id].Blacklist === "ON")
      return interaction.reply({
        content: "Sorry sir, you have been added in blacklist",
        ephemeral: true,
      });
    let user = interaction.options.getUser("mention");
    if (!user)
      return interaction.reply({
        content: "**Please First Mention Member**",
        ephemeral: true,
      });
    let author = interaction.user;
    let love = Math.floor(Math.random() * 100) + 1;
    let embed = new EmbedBuilder()
      .setAuthor({
        iconURL: interaction.user.displayAvatarURL(),
        name: interaction.user.tag,
      })
      .setTitle(`Love Info`)
      .setDescription(`**${author} %❤️${love} ${user}**`)
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag,
      })
      .setColor(randomHex.generate())
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "ship")) {
    let user = message.mentions.members.first();
    if (!user) return message.reply("**Please First Mention Member**");
    let author = message.author;
    let love = Math.floor(Math.random() * 100) + 1;
    let embed = new EmbedBuilder()
      .setAuthor({
        iconURL: message.author.displayAvatarURL(),
        name: message.author.tag,
      })
      .setTitle(`Love Info`)
      .setDescription(`**${author} %❤️${love} ${user}**`)
      .setFooter({
        iconURL: client.user.displayAvatarURL(),
        text: client.user.tag,
      })
      .setColor(randomHex.generate())
      .setTimestamp();
    message.reply({ embeds: [embed] });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "topcash") {
    let board = [];
    for (let key of Object.keys(game)) {
      let value = Object.assign(
        { user: client.users.cache.get(key) },
        game[key]
      );
      board.push(value);
    }
    board = board.filter((x) => x.user);
    board = board.sort((a, b) => b.cash - a.cash).slice(0, 10);
    let sp = board
      .map(
        (x, i) =>
          `[${i + 1}]  ➢ #${x.user.username}\n     Cashs: ${Number(
            x.cash
          ).toLocaleString("en")}`
      )
      .join("\n\n");
    let embed = new EmbedBuilder()
      .setColor(randomHex.generate())
      .setDescription(
        `**<:emoji_5:990150803895484447>| Top 10 Global Rich User\n\n**\`\`\`📋 Rank | Name\n\n${sp}\`\`\``
      );
    return interaction.reply({ embeds: [embed] });
    saveGame();
  }
});
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "toprank") {
    let board = [];
    for (let key of Object.keys(xp)) {
      let value = Object.assign({ user: client.users.cache.get(key) }, xp[key]);
      board.push(value);
    }
    board = board.filter((x) => x.user);
    board = board.sort((a, b) => b.level - a.level).slice(0, 10);
    var sp = board
      .map(
        (x, i) =>
          `[${i + 1}]  ➢ #${x.user.username}\n     Level: ${x.level.toString()}`
      )
      .join("\n\n");
    let sh = new EmbedBuilder()
      .setColor(randomHex.generate())
      .setDescription(
        `**| Top 10 Global High Rank User\n\n**\`\`\`📋 Rank | Name\n\n${sp}\`\`\``
      );
    await interaction.reply({ embeds: [sh] });
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "topcash")) {
    let board = [];
    const members = await message.guild.members.fetch();
    for (let key of Object.keys(game)) {
      let value = Object.assign(
        { user: client.users.cache.get(key) },
        game[key]
      );
      board.push(value);
    }
    board = board.filter(
      (x) => x.user && members.filter((member) => !member.user.bot)
    );
    board = board.sort((a, b) => b.cash - a.cash).slice(0, 10);
    let sp = board
      .map(
        (x, i) =>
          `[${i + 1}]  ➢ #${x.user.username}\n     Cashs: ${Number(
            x.cash
          ).toLocaleString("en")}`
      )
      .join("\n\n");
    let embed = new EmbedBuilder()
      .setColor(randomHex.generate())
      .setDescription(
        `**<:emoji_5:990150803895484447>| Top 10 Global Rich User\n\n**\`\`\`📋 Rank | Name\n\n${sp}\`\`\``
      );
    return message.reply({ embeds: [embed] });
    saveGame();
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "toprank")) {
    let board = [];
    const members = await message.guild.members.fetch();
    for (let key of Object.keys(xp)) {
      let value = Object.assign({ user: client.users.cache.get(key) }, xp[key]);
      board.push(value);
    }
    board = board.filter(
      (x) => x.user && members.filter((member) => !member.user.bot)
    );
    board = board.sort((a, b) => b.level - a.level).slice(0, 10);
    var sp = board
      .map(
        (x, i) =>
          `[${i + 1}]  ➢ #${x.user.username}\n     Level: ${x.level.toString()}`
      )
      .join("\n\n");
    let sh = new EmbedBuilder()
      .setColor(randomHex.generate())
      .setDescription(
        `**| Top 10 Global High Rank User\n\n**\`\`\`📋 Rank | Name\n\n${sp}\`\`\``
      );
    await message.reply({ embeds: [sh] });
  }
});

client.once("ready", () => {
  console.log("I'm ready !");
});




      

 
  
  


 
 

var top = require("./top.json");
function save() {
  fs.writeFileSync("./top.json", JSON.stringify(top, null, 4));
}
client.on("voiceStateUpdate", async function (oldState, newState) {
  if (newState.member.bot) return;
  if (!top[newState.guild.id]) top[newState.guild.id] = {};
  if (!top[newState.guild.id][newState.member.id])
    top[newState.guild.id][newState.member.id] = {
      text: 0,
      voice: parseInt(Math.random() + 10),
      msgs: 0,
      id: newState.member.id,
    };
  save();
  copyFileSync("./top.json", "top.txt");
  const interval = setInterval(() => {
    top[newState.guild.id][newState.member.id].voice += parseInt(
      Math.random() + 4
    );
    if (!newState.channel) {
      clearInterval(interval);
    }
  }, 20000);
});
client.on("messageCreate", async function (message) {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!top[message.guild.id]) top[message.guild.id] = {};
  if (!top[message.guild.id][message.member.id])
    top[message.guild.id][message.member.id] = {
      text: parseInt(Math.random() + 10),
      voice: 1,
      msgs: 0,
      id: message.member.id,
    };
  copyFileSync("./top.json", "top.txt");
  setTimeout(() => {
    top[message.guild.id][message.author.id].text += parseInt(
      Math.random() + 4
    );
  }, 60000);
  if (!message.content.startsWith(prefix)) return;
  if (message.content.startsWith(prefix + "top text")) {
    const members = await message.guild.members.fetch();
    let topArray = Object.values(top[message.guild.id]);
    let num = 0;
    var textStr = `${topArray
      .sort((a, b) => b.text - a.text)
      .slice(0, 10)
      .filter(
        (user) => user.text && members.filter((member) => !member.user.bot)
      )
      .map(function (user) {
        if (user.text > 0) {
          return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`;
        }
      })
      .join("\n")}`;

    let embed = new EmbedBuilder()
      .setColor(randomHex.generate())
      .setDescription(
        `**TOP 10 TEXT :speech_balloon:**

${textStr}
     `
      )
      .setTimestamp();
    return message.reply({ embeds: [embed] });
    //   if (!message.content.startsWith(prefix)) return;
  } else {
    if (message.content.startsWith(prefix + "top voice")) {
      const members = await message.guild.members.fetch();
      var topArray = Object.values(top[message.guild.id]);
      let num = 0;
      var voiceStr = `${topArray
        .sort((a, b) => b.voice - a.voice)
        .slice(0, 10)
        .filter(
          (user) => user.voice > 0 && message.guild.members.fetch(user.id)
        )
        .map(function (user) {
          if (user.voice > 0) {
            return `**#${++num} | <@${user.id}> XP: \`${user.voice}\` **`;
          }
        })
        .join("\n")}`;
      let embed = new EmbedBuilder()

        .setColor(randomHex.generate())

        .setDescription(
          `**TOP 10 VOICE :microphone2:**

${voiceStr}
     `
        )
        .setTimestamp();
      return message.reply({ embeds: [embed] });

      //  break;
      // if (!message.content.startsWith(prefix)) return;
    } else {
      if (message.content === prefix + "top") {
        var topArray = Object.values(top[message.guild.id]);
        var num = 0;
        const members = await message.guild.members.fetch();
        var textStr = `${topArray
          .sort((a, b) => b.text - a.text)
          .slice(0, 10)
          .filter(
            (user) => user.text && members.filter((member) => !member.user.bot)
          )
          .map(function (user) {
            if (user.text > 0) {
              return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`;
            }
          })
          .join("\n")}`;
        num = 0;
        var voiceStr = `${topArray
          .sort((a, b) => b.voice - a.voice)
          .slice(0, 10)
          .filter(
            (user) => user.voice && members.filter((member) => !member.user.bot)
          )
          .map(function (user) {
            if (user.voice > 0) {
              return `**#${++num} | <@${user.id}> XP: \`${user.voice}\` **`;
            }
          })
          .join("\n")}`;
        let embed = new EmbedBuilder()
          .setColor(randomHex.generate())
          .setDescription(
            `**TOP 10 TEXT :speech_balloon:**

${textStr} 


**TOP 10 VOICE :microphone2:**

${voiceStr}
     `
          )
          .setTimestamp();
        return message.reply({ embeds: [embed] });
      }
    }
  }
});

client.on("messageCreate", async (message) => {
  if (message.content.startsWith(prefix + "resettop")) {
    if (message.author.id !== message.guild.ownerId)
      return message.reply("**Only ownership can reseting leaderboard**");
    top[message.guild.id] = {};
    copyFileSync("./top.json", "top.txt");
    message.channel.send("✅ | The leaderboard has been restart");
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "resettop") {
    if (interaction.member.id !== interaction.guild.ownerId)
      return interaction.reply("**Only ownership can reseting leaderboard**");
    top[interaction.guild.id] = {};
    copyFileSync("./top.json", "top.txt");
    interaction.reply("✅ | The leaderboard has been restart");
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "toptext") {
    var topArray = Object.values(top[interaction.guild.id]);
    var num = 0;
    var textStr = `${topArray
      .sort((a, b) => b.text - a.text)
      .slice(0, 5)
      .filter(
        (user) => user.text > 0 && interaction.guild.members.fetch(user.id)
      )
      .map(function (user) {
        if (user.text > 0) {
          return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`;
        }
      })
      .join("\n")}`;
    let embed = new EmbedBuilder()
      .setColor(randomHex.generate())
      .setDescription(
        `**TOP 5 TEXT :speech_balloon:**

${textStr}
     `
      )
      .setTimestamp();
    return interaction.reply({ embeds: [embed] });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "topvoice") {
    var topArray = Object.values(top[interaction.guild.id]);
    var num = 0;
    var voiceStr = `${topArray
      .sort((a, b) => b.voice - a.voice)
      .slice(0, 5)
      .filter(
        (user) => user.voice > 0 && interaction.guild.members.fetch(user.id)
      )
      .map(function (user) {
        if (user.voice > 0) {
          return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`;
        }
      })
      .join("\n")}`;
    let embed = new EmbedBuilder()
      .setColor(randomHex.generate())
      .setDescription(
        `**TOP 5 VOICE :microphone2:**

${voiceStr}
     `
      )
      .setTimestamp();
    return interaction.reply({ embeds: [embed] });
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "top") {
    var topArray = Object.values(top[interaction.guild.id]);
    var num = 0;
    var textStr = `${topArray
      .sort((a, b) => b.text - a.text)
      .slice(0, 10)
      .filter(
        (user) => user.text > 0 && interaction.guild.members.fetch(user.id)
      )
      .map(function (user) {
        if (user.text > 0) {
          return `**#${++num} | <@${user.id}> XP: \`${user.text}\` **`;
        }
      })
      .join("\n")}`;
    num = 0;
    var voiceStr = `${topArray
      .sort((a, b) => b.voice - a.voice)
      .slice(0, 10)
      .filter(
        (user) => user.voice > 0 && interaction.guild.members.fetch(user.id)
      )
      .map(function (user) {
        if (user.voice > 0) {
          return `**#${++num} | <@${user.id}> XP: \`${user.voice}\` **`;
        }
      })
      .join("\n")}`;

    let embed = new EmbedBuilder()
      .setColor(randomHex.generate())
      .setDescription(
        `**TOP 10 TEXT :speech_balloon:**

${textStr} 


**TOP 10 VOICE :microphone2:**

${voiceStr}
     `
      )
      .setTimestamp();
    return interaction.reply({ embeds: [embed] });
  }
});

client.login(process.env.TOKEN);
