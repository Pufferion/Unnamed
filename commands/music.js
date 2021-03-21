const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map();

module.exports = { 
    name: 'music',
    aliases: ['m'],
    description: 'Plays music',
    async execute(msg, args) {
        // variables
        const voice = msg.member.voice.channel;
        const perms = voice.permissionsFor(msg.client.user);

        // checks if user is in voice channel
        if(!voice){msg.channel.send("You have to be in a voice channel to listen to music dumbfuck..");}

        // checks perms
        if(!perms.has('CONNECT')) {msg.channel.send("You don't have the right perms lmao");}
        if(!perms.has('SPEAK')) {msg.channel.send("You don't have the right perms lmao");}

        const serverQ = queue.get(msg.guild.id);

        if(args[0] == 'play') {
            if(!args.length) {msg.channel.send('More arguments pleaseee');}
            let song = {};

            if(ytdl.validateURL(args[1])) {
                const info = await ytdl.getInfo(args[1]);
                song = { title: info.videoDetails.title, url: info.videoDetails.video_url }
            } else {
                const finder = async (query) => {
                    const result = await ytSearch(query);
                    return (result.videos.length > 1) ? result.videos[0] : null;
                }
                args.shift()
                const video = await finder(args.join(' '));
                if(video) {
                    song = { title: video.title, url: video.video_url }
                } else {
                    msg.channel.send("Error lel..");
                }
            }

            if(!serverQ) {

                const Qconstructer = {
                    voice: voice,
                    text: msg.channel,
                    connection: null,
                    songs: []
                }
                queue.set(msg.guild.id, Qconstructer);
                Qconstructer.songs.push(song);
    
                try{
                    const connection = await voice.join();
                    Qconstructer.connection = connection;
                    player(msg.guild, Qconstructer.songs[0]);
                } catch (err) {
                    queue.delete(msg.guild.id);
                    msg.channel.send("And i oop- no connection..");
                    throw err;
                }
    
            } else {
                serverQ.songs.push(song);
                msg.channel.send(`:flushed: Wauww **${song.title}** added to le queue`);
            }

        }

    }
}

const player = async (guild, song) => {
    const q = queue.get(guild.id);

    if(!song) {
        q.voice.leave();
        queue.delete(guild.id);
        return;
    }
    const stream = ytdl(song.url, { filter: 'audioonly'});
    q.connection.play(stream, { seek: 0, volume: 0.5 })
    .on('finish', () => {
        q.songs.shift()
        player(guild, q.songs[0]);
    })
    await q.text.send(`Now playing **${song.title}**`)
}