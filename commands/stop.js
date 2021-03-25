module.exports = {
    name: 'stop',
    description: ' ',
    execute(msg){
        if(!msg.member.voice.channel) { msg.channel.send("You have to be in a voice channel to stop music lel!!!");}
        msg.member.voice.channel.leave();
    }
}