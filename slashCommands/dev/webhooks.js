module.exports = {
    command: {
        name: "webhooks",
        description: "Update the webhook embeds in specific servers",
        type: "CHAT_INPUT",
        options: [],
    },
    run: async (client, interaction) => {
        require("../../../webhooks/index")
        interaction.reply({content: "\✅ All embeds have been updated!"})
    }
}