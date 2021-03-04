const Discord = require('discord.js');
const os = require('os');
const bot = new Discord.Client();

const prefix = "un!";

const fs = require("fs");
bot.commands = new Discord.Collection();
const cmdFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of cmdFiles) {
    const cmds = require(`./commands/${file}`);
    bot.commands.set(cmds.name, cmds);
}

// Misc
bot.on("ready", () => {
    console.log(`Online! (${Date.now() /60/60})`);
    bot.user.setActivity("loli hentai", {type: "WATCHING"});
})

// Messages
bot.on("message", msg => {
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLocaleLowerCase();

    if(cmd == "ping") {bot.commands.get('ping').execute(msg, args, bot);}
    if(cmd == "help") {bot.commands.get('help').execute(msg);}
    if(cmd == "kick") {bot.commands.get('kick').execute(msg, args);}
})

bot.login("NzEwMTI2NjAyMjg5NDE0MTk1.Xrv67w.FO5YOmq-nRqt1RQy06FtPCtEl9w");
