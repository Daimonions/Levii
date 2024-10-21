const servers = require("../Schemas/guild")
const users = require("../Schemas/user")

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        try {
            if (message.author.bot) return
            if (!message.guild) return
            let guy = await users.findOne({ _user: message.guild.id + "_" + message.member.id })
            let server = await servers.findOne({ server_id: message.guild.id })
            if (!guy) {
                guy = users.create({ _user: message.guild.id + "_" + message.member.id })
            }
            if (!server) {
                server = await servers.create({ server_id: message.guild })
            }
            if (guy && server && (server.blacklisted || guy.blacklisted)) return

            if(await client.db.get("maintenance") && message.author.id !== "517335997172809728") return

            //TODO: Add option to mention bot instead of unsing the server prefix
            if (!message.content.startsWith(server.prefix)) return
            message.guy = guy
            message.server = server
            let prefix = server.prefix
            const args = message.content.slice(prefix.length).split(/ +/)
            const commandName = args.shift().toLowerCase()
            const command =
                client.commands.get(commandName) ||
                client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))
            if (!command) return
            try {
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