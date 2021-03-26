module.exports = {
    name: 'skip',
    description: 'skips a song',
    execute(msg, q) {
        const serverQ = q.get(msg.guild.id);
        if(!msg.member.voice.channel) {msg.channel.send("Be in a voice channel lmao");}
        if(!serverQ) {msg.channel.send("There is nothing playing fucking 2head");}

        serverQ.connection.dispatcher.end();
        msg.channel.send("Skipped!");
        
    }
}