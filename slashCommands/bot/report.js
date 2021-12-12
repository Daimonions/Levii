module.exports = {
    command: {
        name: "report",
        description: "Report a user for misbehaving with the bot.",
        type: "CHAT_INPUT",
        options: [
            {
                name: "message",
                description: "A message link of this server or a message ID in THIS channel.",
                type: "STRING"
            }
        ],
    }
}