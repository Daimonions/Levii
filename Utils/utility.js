module.exports.buttonPaginator = async (authorID, msg, embeds, page, addButtons = true) => {
    if (embeds.length <= 1) return

    // buttons
    let buttonBegin = new Discord.MessageButton({ style: "SUCCESS", emoji: "⏪", customId: "begin" })
    let buttonBack = new Discord.MessageButton({ style: "SUCCESS", emoji: "◀", customId: "back" })
    let buttonNext = new Discord.MessageButton({ style: "SUCCESS", emoji: "▶", customId: "next" })
    let buttonEnd = new Discord.MessageButton({ style: "SUCCESS", emoji: "⏩", customId: "end" })

    // rows
    let activeRow = new Discord.MessageActionRow().addComponents([buttonBegin, buttonBack, buttonNext, buttonEnd])
    let deadRow = new Discord.MessageActionRow().addComponents([buttonBegin.setDisabled(), buttonBack.setDisabled(), buttonNext.setDisabled(), buttonEnd.setDisabled()])

    // adding buttons
    if (addButtons) msg.edit({ components: [activeRow] })

    // collecting interactions
    let filter = (interaction) => interaction.isButton() === true && interaction.user.id === authorID
    let collector = msg.createMessageComponentCollector({ filter, time: 30 * 1000 })

    let p = --page

    collector.on("collect", async (button) => {
        if (button.customId === "begin") p = 0
        else if (button.customId === "back") {
            if (p != 0) p--
            else p = embeds.length - 1
        } else if (button.customId === "next") {
            if (p != embeds.length - 1) p++
            else p = 0
        } else if (button.customId === "end") p = embeds.length - 1
        await button.update({ embeds: [embeds[p]] })
    })
    collector.on("end", () => {
        msg.edit({ components: [deadRow] })
    })
}