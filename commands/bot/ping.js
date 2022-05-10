module.exports = {
    name: "ping",
    description: "",
    arguments: ``,
    aliases: [],
    guildOnly: false,
    /**
     * @param {Message} message 
     * @param {String[]} args 
     * @param {Client} client 
     */
    run: async (message, args, client) => {
        message.channel.send(`My ping is ${client.ws.ping}ms!`)
    }
}