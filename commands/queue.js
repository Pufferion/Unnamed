const { execute } = require("./play");

module.exports = {
    name:'queue',
    description:'displays queue',
    execute(msg, q){
        const sq = q.get(msg.guild.id);
        if(!sq) {msg.channel.send("There is nothing playing fucking 2head");}

        msg.channel.send(`
__**Song Queue**__
${sq.songs.map(song => `**-** ${song.title}`).join('\n')}

**Now Playing:** ${sq.songs[0].title}
        `, {split: true});
    }
}