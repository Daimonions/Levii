const guild = require("../Schemas/guild")
const users = require("../Schemas/user")
const { Client } = require("discord.js")
const i18n = require("../i18n")

/**
 * @param {Client} client 
 */
module.exports = (client) => {
    client.on("interactionCreate", async (interaction) => {
        if (!interaction.isCommand() || !interaction.inGuild()) return
        let guy = await users.findOne({ _userID: interaction.user.id })
        let server = await guild.findOne({ _serverID: interaction.guildId })

        if (!guy) guy = await users.create({ _userID: interaction.user.id })
        if (!server) server = await guild.create({ _serverID: interaction.guildId })
        interaction.guy = guy
        interaction.server = server

        if (server.blacklisted) {
            interaction.reply({ content: "This server is blacklisted! We do not support any commands on this server anymore." })
            setTimeout(() => {
                interaction.deleteReply()
            }, 2000)
            return
        }

        /**
         * @param {String} key 
         * @param {Object} replaceKeys 
         * @param {String} language 
         * @returns 
         */
        interaction.i18n = (key, replaceKeys = {}, language = interaction.guy.language) => {
            if (!language) language = server.language || "en"
            let string = i18n(key, language, replaceKeys)
            return string
        }

        if (server.blocked.includes(interaction.commandName)) return interaction.reply({ content: "This command is blocked in this server!" })
        await interaction.deferReply()
        client.slashCommands.get(interaction.commandName).run(client, interaction)
    })
}