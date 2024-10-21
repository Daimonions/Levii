const { Todo } = require("../../Utils/classes")

module.exports = {
    name: "test",
    description: "None",
    arguments: ``,
    aliases: [],
    guildOnly: true,
    /**
     * @param {Message} message 
     * @param {String[]} args 
     * @param {Client} client 
     */
    run: async (message, args, client) => {
        return message.channel.send("No test activ currently.")
    }
}