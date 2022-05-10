const { Client, Message, Util, MessageSelectMenu, MessageActionRow } = require("discord.js")
const { functions } = require("../../Utils")
const { capitalizeFirstLetter } = require("../../Utils/functions")

module.exports = {
    name: "help",
    description: "Get help for this bot.",
    arguments: ``,
    aliases: ["h"],
    guildOnly: false,
    /**
     * @param {Message} message 
     * @param {String[]} args 
     * @param {Client} client 
     */
    run: async (message, args, client) => {
        function getCategoryHelp(category) {
            if(typeof category != "string") throw new Error(`[INVALID_TYPE] ${typeof category} is not a string`)

            let cat = categories.find(c => c.name == category.toLowerCase())
                let description = ""
                cat.commands.forEach(c => {
                    description += `\`${c.name}\` - ${c.description}\n`
                })
                let e = {
                    title: capitalizeFirstLetter(cat.name),
                    description,
                    color: message.guild.me.displayColor,
                    thumbnail: { url: client.user.displayAvatarURL() }
                }
                return [e]
        }
        function addComponents(active = true) {
            return [
                new MessageActionRow().addComponents(
                    new MessageSelectMenu()
                        .setCustomId("help-menu-category")
                        .setPlaceholder("Please select a category below!")
                        .setDisabled(!active)
                        .addOptions(categories.map((cat) => {
                            return {
                                label: functions.capitalizeFirstLetter(cat.name),
                                value: cat.name,
                            }
                        }))
                )
            ]
        }

        const categories = [...new Set(client.commands.map((cmd => cmd.category)))]
        categories.forEach((c, i) => {
            let commands = []
            client.commands.filter(cmd => cmd.category == c).each(cmd => {
                let o = { ...cmd }
                delete o.run
                commands.push(o)
            })

            let obj = {
                name: c,
                commands
            }
            categories[i] = obj
        })

        let state = 0
        if (args[0]) {
            if (categories.find(cat => cat.name == args[0].toLowerCase())) state = 1
            else if (client.commands.get(args[0].toLowerCase()) || client.commands.find((a) => a.aliases && a.aliases.includes(args[0].toLowerCase()))) state = 2
            else state = 3
        }

        switch (state) {
            case 1: {
                message.channel.send({ embeds: getCategoryHelp(args[0]) })
                break
            } case 2: {
                break
            } default: {
                let defaultEmbed = {
                    title: "Help - Categories",
                    description: "All categories are listed below. Select the right category in the dropdown menu to list all commands.\n\n" + categories.map(c => `\`${c.name}\``).join("\n"),
                    color: message.guild.me.displayColor,
                    thumbnail: { url: client.user.displayAvatarURL() }
                }
                let m = await message.channel.send({ embeds: [defaultEmbed], components: addComponents() })
                let coll = m.createMessageComponentCollector({ idle: 10000, filter: (i) => i.customId == "help-menu-category" && i.isSelectMenu() })
                coll.on("collect", interaction => {
                    if (interaction.user.id !== message.author.id) return interaction.reply({ content: "This is not your help message. Please request your own one.", ephemeral: true })
                    let x = functions.disableButtons(interaction.message, false)
                    x["embeds"] = getCategoryHelp(interaction.values[0])
                    interaction.update(x)
                })
                coll.on("end", (collected, reason) => {
                    m.edit(functions.disableButtons(m, true))
                })
                break
            }
        }
    }
}

/*
[
    {
        name: "manager",
        commands: [
            {
                name: "...",
                desc: "..."
            }
        ]
    }, {
        name: "bot",
        commands: [
            {
                ...
            }
        ]
    }
]
*/