const Discord = require("discord.js");

module.exports = {
    name: 'help',
    description: 'Displays a list of commands.',
    execute(msg) {
        const embed = new Discord.MessageEmbed()
                .addFields(
                { name: "**Social**", value: "`un!hug <person>` - *Hugs the mentioned someone.*" },
                { name: "**Moderation**", value: "`un!kick <person, reason (optional)>` - *Kicks someone out of the server.*" },
                { name: "**Misc**", value: "`un!info` - *Displays bot info.*" },
            )
            .setFooter("omg wauw")
        msg.channel.send(embed);
    } 
}