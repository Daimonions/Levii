const {Client, Message} = require("discord.js")

module.exports = {
    name: "massping",
    description: "Massping an innocent user so they wake up.",
    arguments: `<nickname>`,
    aliases: ["sjjsjs", "wake"],
    guildOnly: true,
    /**
     * @param {Message} message 
     * @param {String[]} args 
     * @param {Client} client 
     */
    run: async (message, args, client) => {
        try{
        for (let i = 0; i < 10; i++) {
            let a = message.guild.members.cache.find((m) => m?.nickname?.toLowerCase() === args[0].toLowerCase())
            message.channel.send(`<@${a.id}> wakey wakey`)
        }}catch(err){console.log(err)}
    },
}