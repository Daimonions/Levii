const mongoose = require("mongoose")

let user = new mongoose.Schema({
    _userID: { type: String, unique: true, required: true },
    coins: { type: Number, default: 0 },
    daily: {
        day: { type: Number, default: 0 },
        last: { type: Number, default: 0 },
    },
    blacklisted: { type: Boolean, default: false },
    dev: { type: Boolean, default: false },
    beta: { type: Boolean, default: false },
    language: { type: String, default: "en" }
})

module.exports = mongoose.model("User", user)