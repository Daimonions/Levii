const guild = require("../Schemas/guild");

module.exports = (client) => {
	client.once("ready", (client) => {
		console.log(
			`\n##############################`.rainbow +
				`\n${client.user.tag} logged in!`.red.underline +
				`\n${client.commands.size} commands loaded,`.green +
				`\n${client.slashCommands.size} slash commands loaded`.green +
				`\n${client.events.size} events loaded`.green +
				`\n\n${client.guilds.cache.reduce(
					(a, b) => a + b.memberCount,
					0
				)} users in`.gray +
				`\n${client.guilds.cache.size} guild(s)`.gray +
				`\n______________________________\n`.rainbow
		);

		client.guilds.cache.each(async (g) => {
			let s = await guild.findOne({ server_id: g.id });
			if (!s) {
				await guild.create({ server_id: g.id });
				console.log("Created");
			}
		});

		if(client.db.get("maintenance") ?? false) {
			client.user.setPresence({
				status: "dnd",
				activities: [
					{ type: "CUSTOM", name: "Currently on maintenance mode!" },
				],
			});
		}
	});
};
