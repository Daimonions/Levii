const servers = require("../../Schemas/guild")

module.exports = {
    name: "prefix",
    description: "Change the prefix for this server!",
    arguments: `[newPrefix]`,
    aliases: [],
    guildOnly: true,
    /**
     * @param {Message} message 
     * @param {String[]} args 
     * @param {Client} client 
     */
    run: async (message, args, client) => {
        let x = await servers.findOne({server_id: message.guild.id})
        if(message.member && message.member.permissions.has("MANAGE_GUILD") && args[0]) {
            await servers.findOneAndUpdate({server_id: message.guild.id}, {$set:{prefix: args[0]}})
            let updated = await servers.findOne({server_id: message.guild.id})
            message.channel.send(`__**Prefix updated:**__\n**Before:** ${x.prefix}\n**Now:** ${updated.prefix}`)
        } else {
            let msg = message.channel.send(`The prefix for this server is \`${x.prefix}\``).then((msg) => {
                if(msg.channel.type === "GUILD_NEWS") {
                    msg.crosspost()
                }
            })
        }
    }
}