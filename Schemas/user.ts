import { Schema, model } from "mongoose"

let user = new Schema({
    _user: { type: String, unique: true, required: true },
    coins: { type: Number, default: 0},
    customRole: { type: String, default: ""},
    daily: {
        day: { type: Number, default: 0},
        last: { type: Number, default: 0},
    },
    blacklisted: { type: Boolean, default: false},
    todo: { type: Array, default: []}
})
let userSchema = model("User", user)
export = { userSchema }