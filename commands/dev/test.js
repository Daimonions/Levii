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
        let x = new Todo(1, "Hey", "descccc")
        message.channel.send(x.toString() || x )
        console.log(x)
    }
}