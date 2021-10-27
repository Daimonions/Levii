const mongoose = require("mongoose")

const guild = new mongoose.Schema({
    _id: { type: String, required: true, unique: true },
    prefix: { type: String, default: "+"},
    language: { type: String, default: "en" },
    blocked: { type: Array, default: [] },
    blacklisted: { type: Boolean, default: false}
})

module.exports = mongoose.model(`${__filename.split(`${__dirname}`).pop().split(".").shift()}`, guild)