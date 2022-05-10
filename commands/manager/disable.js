module.exports = {
    name: "disable",
    description: "Disables a command in this server.",
    arguments: `<command>`,
    aliases: [],
    guildOnly: true,
    /**
     * @param {Message} message 
     * @param {String[]} args 
     * @param {Client} client 
     */
    run: async (message, args, client) => {
        if(!message.member.permissions.has("MANAGE_SERVER")) return message.channel.send("No")
    }
}