const {Client, Message} = require("discord.js")

   
module.exports = {
    name: "language",
    description: "Test the new i18n language feature",
    arguments: "<code>",
    aliases: ["lang"],
    guildOnly: true,
    /**
     * @param {Message} message 
     * @param {String[]} args 
     * @param {Client} client 
     */
    run: async (message, args, client) => {
        message.channel.send({content: message.i18n("welcome", {user: message.author.tag})})
    }
}