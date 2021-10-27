const mongoose = require("mongoose")

let user = new mongoose.Schema({
    _user: { type: String, unique: true, required: true },
    coins: { type: Number, default: 0},
    customRole: { type: String, default: ""},
    daily: {
        day: { type: Number, default: 0},
        last: { type: Number, default: 0},
    },
    blacklisted: { type: Boolean, default: false}
})

module.exports = mongoose.model(`${__filename.split(`${__dirname}`).pop().split(".").shift()}`, user)