module.exports.outage = (text, client) => {
    client.guilds.resolve("902987848855203891").channels.resolve("904041643462762527").send(text)
}

module.exports.validateURL = (string) => {
    if(!typeof string == "string") return {result: false, code: "No String!"}
    if(string === "") return null
    if( string.startsWith("https://") || string.startsWith("http://")) {
        if(!string.includes(".")) return this.validateURL(string + ".com")
        let url;
        try {
            url = new URL(string)
            return string
        }catch(err) {
            return ""
        }
    }
    else {
        return this.validateURL("http://" + string)
    }
}