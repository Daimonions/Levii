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

module.exports.capitalizeBeginning = (string) => {
    let arr = string.split(" ")
    arr.forEach((part, index, array) => {
        array[index] = this.capitalizeFirstLetter(part)
    })
    return arr.join(" ")
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

module.exports.getWebSocketStatus = (statusResolvable) => {
    let found = {name: "INVALID", raw: -1}
    let status = {
        "READY": 0,
        "CONNECTING": 1,
        "RECONNECTING": 2,
        "IDLE": 3,
        "NEARLY": 4,
        "DISCONNECTED": 5,
        "WAITING_FOR_GUILDS": 6,
        "IDENTIFYING": 7,
        "RESUMING": 8,
    }
    for (const [key, value] of Object.entries(status)) {
        if(statusResolvable == key || statusResolvable == value) {
            found = {name: key, raw: value}
        }
    }
    return found
}