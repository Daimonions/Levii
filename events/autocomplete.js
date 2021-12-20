const { userSchema } = require("../Schemas/user")

module.exports = (client) => {
    client.on("interactionCreate", async (interaction) => {
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
                break
            }
            case "todo": {
                let currently = interaction.options.getString("id")
                let res = []
                let finalRes = []
                let guy = await userSchema.findOne({_user: interaction.guild.id + "_" + interaction.user.id})
                guy.todo.forEach((todo) => {
                    res.push({name: todo.index, value: todo.index})
                })

                if(currently == "" || currently == " ") {
                    finalRes = res;
                } else {
                    res.forEach((result) => {
                        if(result.name.toLowerCase().startsWith(currently.toLowerCase())) finalRes.push(result)
                    })
                }
                interaction.respond(finalRes)
                break
            }
        }
    })
}