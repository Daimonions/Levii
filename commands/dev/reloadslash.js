module.exports = {
    name: "reloadslash",
    description: "Loads slash commands, add them if they don't exist yet and overrides the permissions.",
    usage: `${process.env.PREFIX}reloadslash`,
    run: (message, args, client) => {
        try {
            let done = 0
            client.slashCommands.each((cmd) => {
                client.application.commands.create(cmd.command, message.guild.id).then((command) => {
                    done += 1
                })
            })
            message.channel.send({ content: `${done} slash commands created/updated.` })
        } catch (err) {
            console.error
        }
    },
}