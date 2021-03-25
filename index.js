const Discord = require('discord.js');
const os = require('os');
require('dotenv').config();
const bot = new Discord.Client();

const config =  {
    token: process.env.DISCORD
};
const prefix = "un!";

const music_queue = new Map();

const fs = require("fs");
bot.commands = new Discord.Collection();
const cmdFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of cmdFiles) {
    const cmds = require(`./commands/${file}`);
    bot.commands.set(cmds.name, cmds);
}

// Misc
bot.on("ready", () => {
    console.log(`Online!`);
    bot.user.setActivity("loli hentai", {type: "WATCHING"});
})

// Messages
bot.on("message", onMsg)

function onMsg(msg) {
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLocaleLowerCase();

    if(cmd == "ping") {bot.commands.get('ping').execute(msg, args, bot);}
    if(cmd == "help") {bot.commands.get('help').execute(msg);}
    if(cmd == "kick") {bot.commands.get('kick').execute(msg, args);}
    if(cmd == "play") {bot.commands.get('play').execute(msg, args, music_queue);}
    if(cmd == "p") {bot.commands.get('play').execute(msg, args, music_queue);}
    if(cmd == "stop") {bot.commands.get('stop').execute(msg, music_queue);}
    if(cmd == "skip") {bot.commands.get('skip').execute(msg, music_queue);}
}

bot.login(config.token);
