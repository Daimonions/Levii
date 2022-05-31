const {Client, Message, Guild} = require("discord.js")

/**
 * @param {String} text 
 * @param {Client} client 
 */
module.exports.outage = (text, client) => {
    client.guilds.resolve("902987848855203891").channels.resolve("904041643462762527").send(text)
}

/**
 * @param {String} string 
 * @returns valid URL
 */
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

/**
 * @param {String} string 
 * @returns String (like Aaa)
 */
module.exports.capitalizeFirstLetter = (string) => {
    /**
     * @param {String} string 
     */
    return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * @param {String} string 
 * @returns String (like Aaa Aaa)
 */
module.exports.capitalizeBeginning = (string) => {
    let arr = string.split(" ")
    arr.forEach((part, index, array) => {
        array[index] = this.capitalizeFirstLetter(part)
    })
    return arr.join(" ")
}

/**
 * @param {Message} message Message Object
 * @param {Boolean} disable Whether to disable the buttons
 * @returns Message Data Object
 */
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

/**
 * @param {*} statusResolvable 
 * @returns Object<String|Integer>
 */
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

/**
 * @param {Guild} guild 
 * @param {*} memberResolveable 
 * @returns Message - *undefined* if message not found
 */
module.exports.getMember = (guild, memberResolveable) => {
    memberResolveable = memberResolveable.toLowerCase()
    if(memberResolveable == "" ) return guild.me
    return guild.members.resolve(memberResolveable) || guild.members.cache.find(m => m.user.tag.toLowerCase() == memberResolveable) || guild.members.cache.find(m => m.user.username.toLowerCase() == memberResolveable) || guild.members.cache.find(m => m?.nickname?.toLowerCase() == memberResolveable) || guild.members.cache.find(m => m.user.username.toLowerCase().startsWith(memberResolveable)) || guild.members.cache.find(m => m?.nickname?.toLowerCase()?.startsWith(memberResolveable))
}

/**
 * Gets a message by its link
 * @param {String} messageResolvable Message ID or Message link
 * @param {Message} message Message
 * @returns Message or *undefined*
 */
module.exports.getMessage = async (messageResolvable, message) => {
    if(!isNaN(parseInt(messageResolvable))) {
        messageResolvable = `channels/${message.guildId}/${message.channelId}/${messageResolvable}`
    }
    let array = messageResolvable.split("channels")[1].split("/")
    let m = await message.client.guilds.resolve(array[1]).channels.resolve(array[2]).messages.resolve(array[3])//.then(m => {
        let x = {...m}
        console.log(x)
        return x
    //})
}