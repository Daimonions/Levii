const servers = require("../Schemas/guild")
const { userSchema } = require("../Schemas/user")

module.exports = (client) => {
    client.on("messageCreate", async (message) => {
        if(message.author.bot) return
        if(!message.guild) return
        let guy = await userSchema.findOne({_user: message.guild.id + "_" + message.member.id})
        let server = await servers.findOne({server_id: message.guild.id})
        if(!guy) {
            await userSchema.create({_user: message.guild.id + "_" + message.member.id})
            guy = await userSchema.findOne({_user: message.guild.id + "_" + message.member.id})
        }
        if(!server) {
            await servers.create({server_id: message.guild})
        }
        if(guy && server && (server.blacklisted || guy.blacklisted)) return

        if(!message.content.startsWith(server.prefix || ("<@902987111710478426>" || "<@!902987111710478426>") && (!"<@!902987111710478426> " || !"<@902987111710478426> "))) return

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