const Utils = require("../../Utils")

module.exports = {
    name: "newcommand",
    description: "-",
    arguments: ``,
    aliases: ["ncmd"],
    guildOnly: false,
    /**
     * @param {Message} message 
     * @param {String[]} args 
     * @param {Client} client 
     */
    run: async (message, args, client) => {
        message.channel.send("```js\n" + Utils.newCommand() + "```")
    }
}