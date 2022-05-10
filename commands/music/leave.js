const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: "leave",
    description: "",
    arguments: ``,
    aliases: ["l"],
    guildOnly: true,
    /**
     * @param {Message} message 
     * @param {String[]} args 
     * @param {Client} client 
     */
    run: async (message, args, client) => {
        getVoiceConnection(message.guild.id).destroy()
    }
}