module.exports = {
    name: "reloadslash",
    description: "Loads slash commands, add them if they don't exist yet and overrides the permissions.",
    arguments: ``,
    run: (message, args, client) => {
        try {
            require("./deleteslash").run(message, args, client)
            let done = 0
            client.slashCommands.each(async (cmd) => {
                await client.application.commands.create(cmd.command, message.guild.id)
                done += 1
            })
            message.channel.send({ content: `${done} slash commands created/updated.` })
        } catch (err) {
            console.error
        }
    },
}