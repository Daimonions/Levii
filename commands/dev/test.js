const { Todo } = require("../../Utils/classes")

module.exports = {
    name: "test",
    description: "None",
    usage: `${process.env.PREFIX}`,
    aliases: [],
    run: async (message, args, client) => {
        let x = new Todo(1, "Hey", "descccc")
        message.channel.send(x.toString() || x )
        console.log(x)
    }
}