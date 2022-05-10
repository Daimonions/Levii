const { Client, Message, Util } = require("discord.js")
const { execSync } = require("child_process")
const { getWebSocketStatus, capitalizeBeginning } = require("../../Utils/functions")
const ms = require("ms")


module.exports = {
    name: "info",
    description: "Get some information about the bot.",
    usage: `${process.env.PREFIX}`,
    aliases: [],
    guildOnly: false,
    /**
     * @param {Message} message 
     * @param {String[]} args 
     * @param {Client} client 
     */
    run: async (message, args, client) => {
        let embed = {
            description: "",
            color: Util.resolveColor("BLURPLE"),
            thumbnail: { url: client.user.avatarURL() },
            timestamp: new Date(),
            title: "BOT INFO"
        }
        let raw = {
            version: require("../../package-lock.json").version,
            "commit hash": execSync("git show --oneline -s").toString().trim().split(" ")[0],
            "commit message": execSync("git show --oneline -s").toString().trim().split(" ").slice(1).join(" "),
            branch: execSync("git rev-parse --abbrev-ref HEAD").toString().trim(),
            uptime: client.uptime,
            started: new Date() - client.uptime,
            ping: client.ws.ping,
            status: client.ws.status,
        }
        let pretty = { ...raw }
        pretty.uptime = ms(client.uptime, { long: true })
        pretty.started = `<t:${(pretty.started/1000).toFixed()}:f>`
        pretty.status = getWebSocketStatus(pretty.status).name

        for (const [key, value] of Object.entries(pretty)) {
            embed.description += `**${capitalizeBeginning(key)}:** ${value}\n`
        }
        /*let version = require("../../package-lock.json").version
        let commit = execSync("git show --oneline -s").toString().trim()
        let branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim()
        let uptime = client.uptime
        let started = new Date() - client.uptime
        let ping = client.ws.ping
        let status = client.ws.status*/

        message.channel.send({ embeds: [embed] })
    }
}