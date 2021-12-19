module.exports = {
    name: "newproject",
    description: "Start a new Minecraft Project on this Server.",
    usage: `${process.env.PREFIX}newproject [name]`,
    aliases: [],
    run: async (message, args, client) => {
        let name = args[0] || "Minecraft Project"
        let guild = client.guilds.resolve(message.guild)
        if(!guild) return message.reply("I wasn't able to create a minecraft project here.")
        
        guild.roles.create({
            name: name || "Minecraft Project",
            reason: "Command used by: " + message.author.tag,
            permissions: []
        }).then((role) => {
            role.guild.channels.create(name || "Minecraft Projekt", {
                type: "GUILD_CATEGORY",
                permissionOverwrites: [{
                    id: role.id,
                    allow: "CONNECT",
                    type: "role"
                }, {
                    id: role.id,
                    allow: "SPEAK",
                    type: "role"
                }, {
                    id: role.id,
                    allow: "VIEW_CHANNEL",
                    type: "role"
                }, {
                    id: role.id,
                    allow: "SEND_MESSAGES",
                    type: "role"
                }, {
                    id: role.id,
                    allow: "READ_MESSAGE_HISTORY",
                    type: "role"
                }]
            }).then((category) => {
                let minP = role.guild.roles.cache.filter(a => a.permissions.has("KICK_MEMBERS") && a.managed == false).last().position
                role.guild.roles.cache.filter((a) => a.permissions.has("VIEW_CHANNEL") && a.position < minP).each((r) => {
                    category.permissionOverwrites.create(r.id, {
                        "VIEW_CHANNEL": false,
                    })
                })

                // Channels
                category.createChannel("organisation", {
                    type: "GUILD_TEXT",
                    topic: "In dem Channel kann alles was die Planung des Projekts angeht besprochen werden. Die Teilnehmer sollten keinen Zugriff auf den Channel haben.",
                    permissionOverwrites: [{
                        id: role.id,
                        deny: "VIEW_CHANNEL",
                        type: "role"
                    }],
                    reason: "Command \"newproject\" used by " + message.author.tag 
                })
                category.createChannel("regelwerk", {
                    type: "GUILD_TEXT",
                    topic: "Hier findet ihr alle Regeln zum Projekt! Lest sie euch aufmerksam durch.",
                    permissionOverwrites: [{
                        id: role.id,
                        deny: "SEND_MESSAGES",
                        type: "role"
                    }],
                    reason: "Command \"newproject\" used by " + message.author.tag 
                })
                category.createChannel("info", {
                    type: "GUILD_NEWS",
                    topic: "Hier findet ihr alle Infos zum Projekt.",
                    permissionOverwrites: [{
                        id: role.id,
                        deny: "SEND_MESSAGES",
                        type: "role"
                    }],
                    reason: "Command \"newproject\" used by " + message.author.tag 
                })
                category.createChannel("spielerchat", {
                    type: "GUILD_TEXT",
                    topic: "Basic Chat für alle Teilnehmer",
                    reason: "Command \"newproject\" used by " + message.author.tag 
                })

                category.createChannel("Support", {
                    type: "GUILD_VOICE"
                })

                for(let i = 1; i <= 3; i++) {
                    category.createChannel("Sprachkanal " + i, {
                        type: "GUILD_VOICE"
                    })
                }
            })
        })
        guild.channels.create("name", {type: "GUILD_CATEGORY"})
    }
}
