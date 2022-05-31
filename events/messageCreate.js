const servers = require("../Schemas/guild")
const users = require("../Schemas/user")
const i18n = require("../i18n")

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        try {
            if (message.author.bot) return
            if (!message.guild) return
            let guy = await users.findOne({ _userID: message.member.id })
            let server = await servers.findOne({ server_id: message.guild.id })
            if (!guy) {
                guy = users.create({ _userID: message.member.id })
            }
            if (!server) {
                server = await servers.create({ _serverID: message.guild })
            }
            if (guy && server && (server.blacklisted || guy.blacklisted)) return

            if (!message.content.startsWith(server.prefix || ("<@902987111710478426>" || "<@!902987111710478426>") && (!"<@!902987111710478426> " || !"<@902987111710478426> "))) return
            message.guy = guy
            message.server = server
            message.i18n = (key, replaceKeys = {}, language = message.guy.language) => {
                if (!language) language = server.language || "en"
                let string = i18n(key, language, replaceKeys)
                return string
            }
            let prefix = server.prefix
            const args = message.content.slice(prefix.length).split(/ +/)
            const commandName = args.shift().toLowerCase()
            const command =
                client.commands.get(commandName) || //DO NOT PUT ;
                client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))
            if (!command) return //If such command doesn't exist, ignore it
            try {
                if(guy[command.category] == false) return
                command.run(message, args, client)
            } catch (err) {
                console.log(err)
                console.log(command)
            }
        } catch (err) {
            console.log(err)
        }
    })
}