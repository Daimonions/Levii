module.exports = {
    command: {
        name: "ping",
        description: "Replies with the bot's ping.",
        type: 1,
        options: [],
    },
    run: (client, interaction) => {
        interaction.reply({content:`My ping is ${client.ws.ping}ms!`})
    }
}