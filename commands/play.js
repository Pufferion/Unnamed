const ytdl = require('ytdl-core');
const { Util } = require('discord.js');
const youtube = require('simple-youtube-api');

var _q = null;

const config =  {
    yt: process.env.YT
};
const yt = new youtube(config.yt);

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

        try {
            var v = await yt.getVideoByID(args);
        } catch {
            try{
                var vs = await yt.searchVideos(args, 1);
                var v = await yt.getVideoByID(vs[0].id);
            } catch {
                msg.channel.send("Oops...");
            }
        }
        
        const song = {
            title: Util.escapeMarkdown(v.title),
            id: v.id,
            url: `https://www.youtube.com/watch?v=${v.id}`
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

    try  {const dispatcher = serverQ.connection.play(ytdl(song.id), {filter: 'audioonly'})
        .on('finish', () => {
            serverQ.songs.shift();
            play(g, _q, serverQ.songs[0]);
        })
        .on('error', error => {
            console.log(error);
        })
        dispatcher.setVolumeLogarithmic( serverQ.volume / 5);

        serverQ.text.send(`Now playing **${song.title}**`);} catch {
            return undefined;
        }
}