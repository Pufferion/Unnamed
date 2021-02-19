module.exports = {
    name: "info",
    description: "displays bot info",
    execute(msg, bot, Discord, prefix) {
        const embed = new Discord.MessageEmbed()
            .setColor('#a913cf')
            .addFields(
                {name: "Uptime", value: process.uptime().toString()},
                {name: "Prefix:", value: prefix}
            )
            .setFooter("omg what")
        msg.channel.send(embed);
    }
}