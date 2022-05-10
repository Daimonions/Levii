const Utils = require("../../Utils")

module.exports = {
    name: "newslash",
    description: "-",
    arguments: ``,
    aliases: ["nslash"],
    guildOnly: false,
    /**
     * @param {Message} message 
     * @param {String[]} args 
     * @param {Client} client 
     */
    run: async (message, args, client) => {
        message.channel.send("```js\n" + Utils.newSlash() + "```")
    }
}