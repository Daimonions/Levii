module.exports = {
    command: {
        name: "webhooks",
        description: "Update the webhook embeds in specific servers",
        type: "CHAT_INPUT",
        options: [],
    },
    run: async (client, interaction) => {
        interaction.deferReply()
        require("../../../webhooks/index")
        await interaction.reply({content: "\✅ All embeds have been updated!"})
    }
}