import { Client } from "discord.js"

const outage = (text: string, client: any) => {
    client.guilds.resolve("902987848855203891").channels.resolve("922203458566770699").send(text)
}

const validateURL = (string: string) => {
    if (typeof string !== "string") return { result: false, code: "No String!" }
    if (string === "") return null
    if (string.startsWith("https://") || string.startsWith("http://")) {
        if (!string.includes(".")) return validateURL(string + ".com")
        let url: URL;
        try {
            url = new URL(string)
            return string
        } catch (err) {
            return ""
        }
    }
    else {
        return validateURL("http://" + string)
    }
}

export { outage, validateURL }