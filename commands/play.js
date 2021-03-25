const ytdl = require('ytdl-core');

var _q = null;

module.exports = {
    name: 'play',
    desciption: 'yey',
    aliases: ['p'],
    async execute(msg, args, q){
        _q = q;

        const voice = msg.member.voice.channel;
        if(!voice) {msg.channel.send("Be in a voice channel lmao");}
        const perms = voice.permissionsFor(msg.client.user);
        if(!perms.has('CONNECT')) {msg.channel.send("You don't have perms LAMOOOO");}
        if(!perms.has('SPEAK')) {msg.channel.send("You don't have perms LAMOOOO");}
        
        const songInfo = await ytdl.getInfo(args[0]);
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url
        }

        const serverQ = q.get(msg.guild.id);
        if(!serverQ) {
            const qConstruct = {
                text: msg.channel,
                voice: voice,
                connection: null,
                songs: [],
                volume: 5,
                playing: true
            }
            q.set(msg.guild.id, qConstruct);

            qConstruct.songs.push(song);

            try {
                var connection = await voice.join();
                qConstruct.connection = connection;
                play(msg.guild, q, qConstruct.songs[0], msg);
            }catch (err) {
                console.log(`Error dumb fuck... ${err}`);
                q.delete(msg.guild.id);
                msg.channel.send("There was an error hehe...");
            }
        }else {
            serverQ.songs.push(song);
            msg.channel.send(`**${song.title}** has been added to the Q`);
        }
    }
}

function play(g, queue, song, msg) {
    const serverQ = queue.get(g.id);

    if(!song) {
        serverQ.voice.leave();
        queue.delete(g.id);
    }

    const dispatcher = serverQ.connection.play(ytdl(song.url))
        .on('finish', () => {
            serverQ.songs.shift();
            play(g, _q, serverQ.songs[0]);
        })
        .on('error', error => {
            console.log(error);
        })
        .on('start', () => {
            serverQ.text.send(`Now playing **${song.title}**`);
        })
        dispatcher.setVolumeLogarithmic( serverQ.volume / 5);
}