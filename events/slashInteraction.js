const guild = require("../Schameas/guild")
const { classes } = require("../Utils/")

module.exports = (client) => {
    client.on("interactionCreate", async (interaction) => {
        if(!interaction.isCommand() || !interaction.inGuild()) return
        let server = await guild.findOne({server_id: interaction.guildId})
        if(server.blacklisted) {
            interaction.reply({content:"This server is blacklisted! We do not support any commands on this server anymore."})
            setTimeout(() => {
                interaction.deleteReply()
            }, 2000)
            return 
        }
        if(server.blocked.includes(interaction.commandName)) return interaction.reply({content:"This command is blocked in this server!"})

    })
}