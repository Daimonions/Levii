const Utils = require("../../Utils")

module.exports = {
    name: "newcommand",
    description: "-",
    usage: `${process.env.PREFIX}newcommand`,
    aliases: ["ncmd"],
    run: async (message, args, client) => {
        message.channel.send("```js\n" + Utils.newCommand() + "```")
    }
}