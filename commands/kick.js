module.exports = {
    name: 'kick',
    desciption: 'kicks someone out the server',
    execute(msg, args) {
        const mention = msg.mentions.users.first();
        if (msg.member.hasPermission('KICK_MEMBERS')) {
            try {
                const target = msg.guild.members.cache.get(mention.id);
                mention.send("Oops, you've been kicked because: " + args[1] + ".");
                target.kick();
            } catch {
                msg.channel.send(":flushed: I don't have the right permissions or the person has higher and/or better permissions..");
            }
        }else {
            msg.channel.send(":flushed: You don't have permission..")
        }   
    }
}