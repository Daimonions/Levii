const { Client, CommandInteraction } = require("discord.js")

module.exports = {
    command: {
        name: "ping",
        description: "Replies with the bot's ping.",
        type: 1,
        options: [],
    },
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: (client, interaction) => {
        interaction.editReply({ content: `My ping is ${client.ws.ping}ms!` })
    }
}