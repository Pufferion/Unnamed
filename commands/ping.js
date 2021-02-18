module.exports = {
    name: 'ping',
    description: "displays ping",
    execute(msg, args, bot) {
        msg.channel.send(`Pong! Latency is ${Date.now() - msg.createdTimestamp}ms. API Latency is ${Math.round(bot.ws.ping)}ms`);
    }
}