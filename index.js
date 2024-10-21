require("dotenv").config();

const fs = require("fs");
const { QuickDB } = require("quick.db");
const console = require("console");
require("colors");

const { Client, Collection } = require("discord.js");
const { on } = require("events");
const mongoose = require("mongoose");
const Utils = require("./Utils");

const client = new Client({
	intents: [
		"GUILD_MESSAGES",
		"GUILD_MESSAGE_REACTIONS",
		"DIRECT_MESSAGES",
		"GUILDS",
		"GUILD_MEMBERS",
		"GUILD_BANS",
		"GUILD_EMOJIS_AND_STICKERS",
		"GUILD_PRESENCES",
		"GUILD_VOICE_STATES",
	],
});

const db = new QuickDB();
if ( db.get("maintenance") ?? false) {
	console.log("The bot is currently in emergency mode.");
}

client.db = db;

client.commands = new Collection();
fs.readdir("./commands/", (err, files) => {
	files.forEach((file) => {
		let path = `./commands/${file}`;
		fs.readdir(path, (err, files) => {
			if (err) {
				console.error(err);
			}
			let jsfile = files.filter((f) => f.split(".").pop() === "js");
			if (jsfile.length <= 0) {
				console.error(
					`Couldn't find commands in the ${file} category.`
				);
				return;
			}
			jsfile.forEach((f, i) => {
				let props = require(`./commands/${file}/${f}`);
				props.category = file;
				try {
					client.commands.set(props.name, props);
					if (props.alias)
						props.alias.forEach((alias) =>
							client.commands.set(alias, props)
						);
				} catch (err) {
					if (err) console.error(err);
				}
			});
		});
	});
});

client.slashCommands = new Collection();
fs.readdir("./slashCommands/", (err, files) => {
	files.forEach((file) => {
		let path = `./slashCommands/${file}`;
		fs.readdir(path, (err, files) => {
			if (err) console.error(err);
			let jsfile = files.filter((f) => f.split(".").pop() === "js");
			if (jsfile.length <= 0) {
				process.emitWarning(
					`Couldn't find slash commands in the ${file} category.`
						.bgYellow.black
				);
			}
			jsfile.forEach((f, i) => {
				let props = require(`./slashCommands/${file}/${f}`);
				props.category = file;
				try {
					client.slashCommands.set(props.command.name, props);
				} catch (err) {
					if (err) console.error(err);
				}
			});
		});
	});
});

client.events = new Collection();
const eventFiles = fs
	.readdirSync("./events")
	.filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
	require(`./events/${file}`)(client);
	client.events.set(file, require(`./events/${file}`));
}

client.log = (text) => {
	//client.guilds.resolve().channels.resolve().send(text)
	console.log("\n" + text);
};

process.on("beforeExit", (code) => {
	client.log(`Process stoped working with code ${code}`);
});

mongoose.set("strictQuery", false);

mongoose
	.connect(process.env.MONGO_SRV, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(console.log("Connected to the databank"));

process.on("disconnect", (code) => {
	console.log("Disconnected");
	process.exit(code);
});

client.login(process.env.DISCORD_TOKEN);
