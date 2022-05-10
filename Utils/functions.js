module.exports.outage = (text, client) => {
    client.guilds.resolve("902987848855203891").channels.resolve("904041643462762527").send(text)
}

module.exports.validateURL = (string) => {
    if (!typeof string == "string") return { result: false, code: "No String!" }
    if (string === "") return null
    if (string.startsWith("https://") || string.startsWith("http://")) {
        if (!string.includes(".")) return this.validateURL(string + ".com")
        let url;
        try {
            url = new URL(string)
            return string
        } catch (err) {
            return ""
        }
    }
    else {
        return this.validateURL("http://" + string)
    }
}

module.exports.capitalizeFirstLetter = (string) => {
    /**
     * @param {String} string 
     */
    return string.charAt(0).toUpperCase() + string.slice(1)
}

module.exports.disableButtons = (message, disable = true) => {
    message.components.forEach(comp => {
        let btns = comp.components
        btns.forEach((x) => {
            x.setDisabled(disable)
        })
    })

    let sendData = {}
    if (message.content) sendData.content = message.content
    if (message.embeds) sendData.embeds = message.embeds
    if (message.components) sendData.components = message.components
    return sendData
}