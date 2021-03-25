module.exports = {
    name: 'skip',
    description: 'skips a song',
    execute(msg, q) {
        const serverQ = q.get(msg.guild.id);
        if(!msg.member.voice.channel) {msg.channel.send("There is nothing to skip dumbfuck!");}
        if(!serverQ) {msg.channel.send("There is nothing playing lmaooo");}

        serverQ.connection.dispatcher.end();
        msg.channel.send("Skipped!");
        
    }
}