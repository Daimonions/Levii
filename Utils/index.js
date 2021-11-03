module.exports =  {
    utility: require("./utility"),
    functions: require("./functions"),
    newCommand: () => {
        let x = new String(`
module.exports = {
    name: "",
    description: "",
    usage: \`\${process.env.PREFIX}\`,
    aliases: [],
    run: async (message, args, client) => {
        // code
    }
}`)
        return x
    },
}