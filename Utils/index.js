module.exports =  {
    utility: require("./utility"),
    functions: require("./functions"),
    newCommand: () => {
        let x = new String(`
const {Client, Message} = require("discord.js")

        
module.exports = {
    name: "",
    description: "",
    usage: \`\${process.env.PREFIX}\`,
    aliases: [],
    guildOnly: false,
    /**
     * @param {Message} message 
     * @param {String[]} args 
     * @param {Client} client 
     */
    run: async (message, args, client) => {
        // code
    }
}`)
        return x
    },
    newSlash: () => {
        let x = new String(
`
module.exports = {
    command: {
        name: "",
        description: "",
        type: "",
        options: [],
    },
    run: (client, interaction) => {
        // code
    }
}
`)
        return x
    }
}