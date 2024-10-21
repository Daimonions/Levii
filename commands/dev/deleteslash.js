module.exports = {
    name: "deleteslash",
    description: "Deletes all slash commands in this guild.",
    arguments: ``,
    run: (message, args, client) => {
        try {
            let done = 0
            client.slashCommands.each((cmd) => {
                message.guild.commands.fetch().then((commands) => { 
                    commands.each((command) => {
                            message.guild.commands.delete(command.id)
                            done += 1
                        })
                    })
                }
            )
            message.channel.send({ content: `${done} slash commands deleted.` })
        } catch (err) {
            console.error
        }
    },
}