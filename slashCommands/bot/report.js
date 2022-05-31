const { Client, CommandInteraction } = require("discord.js")
const Utils = require("../../Utils")

module.exports = {
    command: {
        name: "report",
        description: "Report a user for misbehaving with the bot. This report will not be sent in this channel.",
        type: "CHAT_INPUT",
        options: [
            {
                name: "message",
                description: "A message link of this server or a message ID in THIS channel.",
                type: "STRING",
                required: true,
            }, {
                name: "reason",
                description: "Please provide a reason if necessary.",
                type: "STRING",
                required: false,
            }
        ],
    },
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        let msg = await Utils.functions.getMessage(interaction.options.getString("message"), interaction)
        console.log(msg)
        //if(!msg) return interaction.editReply({content: interaction.i18n("errorMsgNotFound")})
        let report = {
            hasReported: interaction.user.id,
            targeted: client.users.fetch(msg, true),
            reason: interaction.options.getString("reason") || "*No Reason*",
            message: {
                //link: msg.url,
                content: msg.content,
            },
            timestamp: Math.floor(Date.now()/1000)
        }
        interaction.editReply({content: JSON.stringify(report)})
    }
}