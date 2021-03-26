const youtube = require('simple-youtube-api');

module.exports = {
    name: 'ping',
    description: "displays ping",
    execute(msg, args, bot) {
        msg.channel.send(`Pong! My ping is ${Date.now() - msg.createdTimestamp}ms.`);
    }
}