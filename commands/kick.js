module.exports = {
    name: 'kick',
    desciption: 'kicks someone out the server',
    execute(msg, args) {
        const mention = msg.mentions.users.first();
        if (msg.member.hasPermission('KICK_MEMBERS')) {
            const target = msg.guild.members.cache.get(mention.id);
            target.kick();
            mention.send("oops you've been kicked")
        }   
    }
}