module.exports = (client) => {
    client.on("interactionCreate", (interaction) => {
        if(!interaction.isAutocomplete()) return;
        switch(interaction.commandName) {
            case "embed": {
                switch(interaction.options._subcommand) {
                    case("update"): {
                        let ops = [
                            {
                                name: "Title",
                                value: "title",
                            },
                            {
                                name: "Description",
                                value: "description",
                            },
                            {
                                name: "URL",
                                value: "url",
                            },
                            {
                                name: "Timestamp",
                                value: "timestamp",
                            },
                            {
                                name: "Color",
                                value: "color",
                            },
                            {
                                name: "Fields",
                                value: "fields",
                            },
                            {
                                name: "Author",
                                value: "author",
                            },
                            {
                                name: "Thumbnail",
                                value: "thumbnail",
                            },
                            {
                                name: "Image",
                                value: "image",
                            },
                            {
                                name: "Video",
                                value: "video",
                            },
                            {
                                name: "Footer",
                                value: "footer",
                            }]
                        let finalOps = []
                        ops.forEach(op => {
                            if(op.name.toLowerCase().startsWith(interaction.options.get("part").value.toLowerCase())) {
                                finalOps.push(op)
                            }
                        })
                        if(interaction.options.get("part") === "") finalOps = ops
                        interaction.respond(finalOps)
                        break;
                    } case("send"): {
                        if(interaction.options.getString("url") !== "") {
                            let str = interaction.options.getString("url")
                            interaction.respond([
                                {name: "https://" + str, value: "https://" + str},
                                {name: "https://" + str + ".com", value: "https://" + str + ".com"},
                                {name: "http://" + str, value: "http://" + str},
                                {name: "http://" + str + ".com", value: "http://" + str + ".com"},
                                {name: str, value: str},
                                {name: str + ".com", value: str + ".com"}
                            ])
                        } else {
                            interaction.respond([{name: "https://google.com", value: "https://google.com"}])
                        }
                    }
                }
            }
        }
    })
}