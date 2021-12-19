"use strict";
var mongoose_1 = require("mongoose");
var user = new mongoose_1.Schema({
    _user: { type: String, unique: true, required: true },
    coins: { type: Number, "default": 0 },
    customRole: { type: String, "default": "" },
    daily: {
        day: { type: Number, "default": 0 },
        last: { type: Number, "default": 0 }
    },
    blacklisted: { type: Boolean, "default": false },
    todo: { type: Array, "default": [] },
    todoIndex: { type: Number, "default": 0 }
});
var userSchema = (0, mongoose_1.model)("User", user);
module.exports = { userSchema: userSchema };
