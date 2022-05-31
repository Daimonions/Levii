const { MessageEmbed, Client, CommandInteraction } = require("discord.js");
const { validateURL } = require("../../Utils/functions");
let cmd = {
    name: "embed",
    description: "Create, send or update an embed in a channel of this guild.",
    type: "CHAT_INPUT",
    options: [
// SEND
    {
        type: "SUB_COMMAND",
        name: "send",
        description: "Create and send an embed to a channel in this guild.",
        options: [
            // DESTINATION
            {
                type: "CHANNEL",
                name: "channel",
                description: "The channel where the embed should be send to",
                required: true,
                channelTypes: ["GUILD_TEXT", "GUILD_NEWS", "GUILD_NEWS_THREAD", "GUILD_PUBLIC_THREAD", "GUILD_PRIVATE_THREAD"],
            },
            // TITLE
            {
                type: "STRING",
                name: "title",
                description: "The embed's title",
                required: false,
            },
            // DESCRIPTION
            {
                type: "STRING",
                name: "description",
                description: "The embed's description",
                required: false,
            },
            // URL
            {
                type: "STRING",
                name: "url",
                description: "The embed's url (link for the title)",
                autocomplete: true,
                required: false,
            },
            // TIMESTAMP
            {
                type: "STRING",
                name: "timestamp",
                description: `The embed's timestamp (<timestampNumber>, <Date>)`,
                required: false,
            },
            // COLOR
            {
                type: "STRING",
                name: "color",
                description: `The embed's color (<COLOR>, <#ffffff>, <R, G, B>, <colorNumber>)`,
                required: false,
            },
            // AUTHOR_NAME
            {
                type: "STRING",
                name: "author",
                description: "The embed's author (<<name>, [url], [iconURL]>)",
                required: false,
            },
            // THUMNAIL
            {
                type: "STRING",
                name: "thumbnail",
                description: "The embed's thumbnail (<<imageURL>, [height], [width]>)",
                required: false,
            },
            // IMAGE
            {
                type: "STRING",
                name: "image",
                description: "The embed's image (<<imageURL>, [height], [width]>)",
                required: false,
            },
            // VIDEO
            {
                type: "STRING",
                name: "video",
                description: "The embed's video (<<videoURL>, [height], [width]>)",
                required: false,
            },
            // FOOTER
            {
                type: "STRING",
                name: "footer",
                description: "The embed's footer (<footer, [iconURL]>)",
                required: false,
            },
            // FIELDS
            {
                type: "STRING",
                name: "fields",
                description: `The embed's fields ("<name, value, inline> || +other fields)`,
                required: false,
            },
        ]
    },
// UPDATE
    {
        type: "SUB_COMMAND",
        name: "update",
        description: "Create and send an embed to a channel in this guild.",
        options: [
            // DESTINATION
            {
                type: "CHANNEL",
                name: "channel",
                description: "The channel where the embed should be send to",
                required: true,
                channelTypes: ["GUILD_TEXT", "GUILD_NEWS", "GUILD_NEWS_THREAD", "GUILD_PUBLIC_THREAD", "GUILD_PRIVATE_THREAD"],
            },
            // TARGET_COLUMN
            {
                type: "STRING",
                name: "part",
                description: "The part of the embed to be updated",
                required: true,
                autocomplete: true,
            },
            // VALUE
            {
                type: "STRING",
                name: "value",
                description: "Declare the new value for rhis part of the embed",
                required: false,
            }
        ]
    },
// DELETE
    {
        type: "SUB_COMMAND",
        name: "delete",
        description: `Delete a message sent by ${process.env.USER_TAG}`,
        options: [
            {
                type: "STRING",
                name: "message",
                description: "<messageID> or <messageLink> of the message that should be deleted.",
                required: true,
            }
        ]
    },
],
}

module.exports = {
    command: cmd,
    /**
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: (client, interaction) => {
        let opGet = (key) => {
            if(key === "channel") return
            return interaction.options?.getString(key) || ""
        }

        switch (interaction.options.getSubcommand()) {
            case "send":
                let embedObj = {}
                cmd.options[0].options.forEach((arg) => {
                    embedObj[arg.name] = opGet(arg.name)
                })
                // COLOR
                embedObj.color = interaction.options.getString("color") ? interaction.options.getString("color").toUpperCase() : null
                // URL
                embedObj.url = validateURL(embedObj.url || "")
                // TIMESTAMP
                if(!isNaN(embedObj.timestamp)) {
                    embedObj.timestamp = parseInt(embedObj.timestamp) || null
                }
                // AUTHOR
                let argAu = embedObj.author.split(",")
                embedObj.author = {}
                for(let i = 0; i < argAu.length - 1; i++) {
                    let opts = ["name", "url", "icon_url"]
                    embedObj.author[opts[i]] = argAu[i]
                }
                // THUMBNAIL
                let argThum = embedObj.thumbnail.split(",")
                embedObj.thumbnail = {}
                for(let i = 0; i < argThum.length; i++) {
                    let opts = ["url", "height", "width"]
                    embedObj.thumbnail[opts[i]] = typeof argAu[i] == "string" ? argAu[i] : parseInt(argAu[i])
                }
                // IMAGE
                let argImg = embedObj.image.split(",")
                embedObj.image = {}
                for(let i = 0; i < argImg.length; i++) {
                    let opts = ["url", "height", "width"]
                    embedObj.image[opts[i]] = isNaN(argImg[i]) ? argImg[i] : parseInt(argImg[i])
                }
                // VIDEO
                let argVid = embedObj.video.split(",")
                embedObj.video = {}
                for(let i = 0; i < argVid.length; i++) {
                    let opts = ["url", "height", "width"]
                    embedObj.video[opts[i]] = typeof argVid[i] == "string" ? argVid[i] : parseInt(argVid[i])
                }
                // FOOTER
                let argFooter = embedObj.footer.split(",")
                embedObj.footer = {}
                for(let i = 0; i < argFooter; i++) {
                    let opts = ["test", "icon_url"]
                    embedObj.footer[opts[i]] = argFooter[i]
                }
                
                console.log(embedObj)
                let embed = new MessageEmbed(embedObj)
                console.log(embed)
                let channel = interaction.options.getChannel("channel")
                channel.send({embeds: [embed]})
                interaction.reply({content: "Done!"})
                break;
        
            default:
                break;
        }
    }
}