const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    desciption: 'yey',
    aliases: ['p'],
    async execute(msg, args) {
        const voice = msg.member.voice.channel;
        if(!voice) {msg.channel.send("Be in a voice channel lmao");}
        const perms = voice.permissionsFor(msg.client.user);
        if(!perms.has('CONNECT')) {msg.channel.send("You don't have perms LAMOOOO");}
        if(!perms.has('SPEAK')) {msg.channel.send("You don't have perms LAMOOOO");}

        try {
            var connection = await voice.join();
        }catch (err) {
            console.log(`Error dumb fuck... ${err}`);
            msg.channel.send("There was an error hehe...");
        }

        const dispatcher = connection.play(ytdl(args[0]))
        .on('finish', () => {
            voice.leave();
        })
        .on('error', error => {
            console.log(error);
        })
        dispatcher.setVolumeLogarithmic( 5 / 5);
    }
}