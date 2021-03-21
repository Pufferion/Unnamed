const Discord = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Displays a list of commands.',
    execute(msg) {
        const embed = new Discord.MessageEmbed()
                .addFields(
                { name: "**Social**", value: "`un!hug <person>` - *Hugs the mentioned someone.*" },
                { name: "**Moderation**", value: "`un!kick <person, reason (optional)>` - *Kicks someone out of the server.*" },
                { name: "**Misc**", value: "`un!info` - *Displays bot info.* \n `un!ping` - *Displays the bots ping*" },
            )
            .setFooter("made with the help of RAID SHADOW LEGENDS! the new free mobile mmorpg with great story and graphics.")
        msg.channel.send(embed);
    } 
}