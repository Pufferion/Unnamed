module.exports = {
    name: 'stop',
    description: ' ',
    execute(msg, q){
        try {
        const Sq = q.get(msg.guild.id);
        if(!msg.member.voice.channel) { msg.channel.send("You have to be in a voice channel to stop music lel!!!");}
        if(!Sq) {msg.channel.send("There isn't anything playing lmao");}
        Sq.connection.dispatcher.end();
        msg.channel.send("The music has stopped as you can hear..");
        }catch{
            return null;
        }
    }
}