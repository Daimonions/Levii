const servers = require("../Schameas/guild")
const users = require("../Schameas/user")

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        //let guy = await users.findOne({_user: message.guild.id + "_" + message.author.id})
        let server = await servers.findOne({server_id: message.guild.id})
        //if(guy && (!server || server.blacklisted || guy.blacklisted || message.author.bot)) return

        //if(message.content.startsWith(server.prefix || ("<@902987111710478426>" || "<@!902987111710478426>") && (!"<@!902987111710478426> " || !"<@902987111710478426> "))) return

        let prefix = server.prefix
        const args = message.content.slice(prefix.length).split(/ +/)
        const commandName = args.shift().toLowerCase()
        const command =
            client.commands.get(commandName) || //DO NOT PUT ;
            client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName))
        if (!command) return //If such command doesn't exist, ignore it
        command.run(message, args, client)
    })
}