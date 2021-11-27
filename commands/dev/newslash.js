const Utils = require("../../Utils")

module.exports = {
    name: "newslash",
    description: "-",
    usage: `${process.env.PREFIX}newcommand`,
    aliases: ["nslash"],
    run: async (message, args, client) => {
        message.channel.send("```js\n" + Utils.newSlash() + "```")
    }
}