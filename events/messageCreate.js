const servers = require("../Schameas/guild")
const users = require("../Schameas/user")

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        let guy = await users.findOne({_user: message.guild.id + "_" + message.author.id})
        let server = await servers.findOne({_id: message.guild.id})
        if(!server || server.blacklisted || guy.blacklisted || message.author.bot) return

        if(message.content.startsWith(server.prefix || ("<@902987111710478426>" || "<@!902987111710478426>") && (!"<@!902987111710478426> " || !"<@902987111710478426> "))) return
    })
}