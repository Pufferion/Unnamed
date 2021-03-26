
module.exports = {
    name:'volume',
    description: 'control volume',
    execute(msg, args, q){
        const sq = q.get(msg.guild.id);
        if(!msg.member.voice.channel) {msg.channel.send("Be in a voice channel lmao");}
        if(!sq) {msg.channel.send("There is nothing playing fucking 2head");}
        if(!args[0]) {msg.channel.send(`Current volume is: **${sq.volume}**`);}
        if(!isNaN(args[0])) {
            sq.volume = args[0];
            sq.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
            msg.channel.send(`The volume is set to: ${args[0]}`);
        }else {
            msg.channel.send("How the fuck am I supoosed to change the volume to this?!");
        }
        

    }
}