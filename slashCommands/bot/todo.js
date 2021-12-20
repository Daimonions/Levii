const { userSchema } = require("../../Schemas/user")
const { Todo } = require("../../Utils/classes")

module.exports = {
    command: {
        name: "todo",
        description: "Create, edit and delete ToDo-List entries!",
        type: "CHAT_INPUT",
        options: [
// CREATE
        {
            name: "create",
            type: "SUB_COMMAND",
            description: "Create a new ToDo-List entry.",
            options: [
            {
                type: "STRING",
                name: "title",
                description: "The entry's title",
                required: false
            },
            {
                type: "STRING",
                name: "description",
                description: "The entry's description",
                required: false
            }]
        },
// EDIT
        {
            type: "SUB_COMMAND",
            name: "edit",
            description: "Edit an already existing entry.",
            options: [
                {
                    type: "STRING",
                    name: "id",
                    description: "The ID of the entry to update",
                    required: true,
                    autocomplete: true
                },
                {
                    type: "STRING",
                    name: "title",
                    description: "The new entry's title",
                    required: false
                },
                {
                    type: "STRING",
                    name: "description",
                    description: "The new entry's description",
                    required: false
                }
            ]
        },
// DELETE
        {
            type: "SUB_COMMAND",
            name: "delete",
            description: "Delete an entry by its ID",
            options: [
                {
                    type: "STRING",
                    name: "id",
                    description: "The ID of the entry to delete",
                    autocomplete: true,
                    required: false
                }
            ]
        },
// LIST
        {
            type: "SUB_COMMAND",
            name: "list",
            description: "List all entries",
            options: []
        }
],
    },
    run: async (client, interaction) => {
        interaction.reply("Not coded yet");
        let guys = []
        let guysQuery = await userSchema.find({_user: /variable/i})
        guysQuery.exec((err, users) => {
            if(err) return interaction.reply({content: "An error occurred. Please try again later or contact the suppport."})
            users.forEach((user) => {
                guys.push(user)
            })
        })
        console.log(guys)

        switch (interaction.options.getSubcommand()) {
            case "create": {
                let guy = await guysQuery.find({_user: interaction.guildId + "_" + interaction.user.id})
                let index = guy.todoIndex + 1
                let title = interaction.options.getString("title") || "ToDo - " + index
                let description = interaction.options.get("description") || "*No description given*"

                guy.todo.push(new Todo(index, title, description))
                await guy.updateOne({_user: interaction.guildId + "_" + interaction.user.id}, {$inc:{"todoIndex": 1}, $set:{"todo": guy.todo}})
                interaction.reply({content: "Successfully added ToDo entry *" + title + "*."})
                break;
            }
            case "edit": {

            }
            case "delete": {

            }
            case "list": {

            }
            default: {
                interaction.reply({content: "This subcommand is not coded yet. Please be paitent while it is being developed."})
                break
            }
        }
        return
    }
}