module.exports = {
    name: "ping",
    description: "",
    usage: `${process.env.PREFIX}`,
    aliases: [],
    run: async (message, args, client) => {
        message.channel.send(`My ping is ${client.ws.ping}ms!`)
    }
}