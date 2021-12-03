module.exports = {
    command: {
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
                    description: "The embed's author (<<name>, [url, [iconURL, [proxyIconURL]]]>)",
                    required: false,
                },
                // THUMNAIL
                {
                    type: "STRING",
                    name: "thumbnail",
                    description: "The embed's thumbnail (<<imageURL>, [proxyURL, [height, [width]]]>)",
                    required: false,
                },
                // IMAGE
                {
                    type: "STRING",
                    name: "image",
                    description: "The embed's image (<<imageURL>, [proxyURL, [height, [width]]]>)",
                    required: false,
                },
                // VIDEO
                {
                    type: "STRING",
                    name: "video",
                    description: "The embed's video (<<videoURL>, [proxyURL, [height, [width]]]>)",
                    required: false,
                },
                // FOOTER
                {
                    type: "STRING",
                    name: "footer",
                    description: "The embed's footer (<footer, iconURL, [proxyIconURL]>)",
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
                    choises: [
                        {
                            name: "",
                            value: ""
                        }
                    ]
                },
            ]
        },
    
    ],
    },
    run: (client, interaction) => {
        // code
    }
}