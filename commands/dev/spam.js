const { Client, Message } = require("discord.js")
const { getMember } = require("../../Utils/functions")

module.exports = {
    name: "spam",
    description: "Massping an innocent user so they wake up.",
    arguments: `<member>`,
    aliases: ["massping", "wake"],
    guildOnly: true,
    /**
     * @param {Message} message 
     * @param {String[]} args 
     * @param {Client} client 
     */
    run: async (message, args, client) => {
        let user = getMember(message.guild, args.join(" "))
        try {
            for (let i = 0; i < 10; i++) {
                message.channel.send(`<@${user.id}> wakey wakey`)
            }
        } catch (err) { console.log(err) }
    },
}
