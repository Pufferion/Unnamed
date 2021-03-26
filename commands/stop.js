module.exports = {
    name: 'stop',
    description: ' ',
    execute(msg, q){
        try {
        const Sq = q.get(msg.guild.id);
        if(!msg.member.voice.channel) {msg.channel.send("Be in a voice channel lmao");}
        if(!Sq) {msg.channel.send("There is nothing playing fucking 2head");}
        Sq.connection.dispatcher.end();
        msg.channel.send("The music has stopped as you can hear..");
        }catch{
            return null;
        }
    }
}