"use strict";
exports.__esModule = true;
exports.validateURL = exports.outage = void 0;
var outage = function (text, client) {
    client.guilds.resolve("902987848855203891").channels.resolve("922203458566770699").send(text);
};
exports.outage = outage;
var validateURL = function (string) {
    if (typeof string !== "string")
        return { result: false, code: "No String!" };
    if (string === "")
        return null;
    if (string.startsWith("https://") || string.startsWith("http://")) {
        if (!string.includes("."))
            return validateURL(string + ".com");
        var url = void 0;
        try {
            url = new URL(string);
            return string;
        }
        catch (err) {
            return "";
        }
    }
    else {
        return validateURL("http://" + string);
    }
};
exports.validateURL = validateURL;
