const { Client, Message } = require("discord.js");
const {
	joinVoiceChannel,
	VoiceConnectionStatus,
	createAudioPlayer,
	NoSubscriberBehavior,
	createAudioResource,
	getVoiceConnection,
	StreamType,
	AudioResource,
} = require("@discordjs/voice");
const ytdl = require("@distube/ytdl-core");
const ytSearch = require("yt-search");
const db = require("quick.db");

module.exports = {
	name: "play",
	description: "Play a song",
	arguments: `<song>`,
	aliases: ["p"],
	guildOnly: true,
	/**
	 * @param {Message} message
	 * @param {String[]} args
	 * @param {Client} client
	 */
	run: async (message, args, client) => {
		let connection = getVoiceConnection(message.guild.id);
		if (!connection) {
			if (message.member.voice.channel) {
				connection = joinVoiceChannel({
					channelId: message.member.voice.channel.id,
					guildId: message.member.voice.channel.guild.id,
					adapterCreator: message.channel.guild.voiceAdapterCreator,
				});
			} else {
				return message
					.reply({
						content:
							"Please join a voice channel before using a music command.",
					})
					.then((m) => {
						setTimeout(() => {
							m.delete();
						}, 2000);
					});
			}
		}

		connection.on(VoiceConnectionStatus.Ready, () => {
			console.log("Ready to play audio!");
		});

		const player = createAudioPlayer({
			behaviors: {
				noSubscriber: NoSubscriberBehavior.Pause,
                maxMissedFrames: 10,
			},
		});

		connection.subscribe(player);

		//player.play(createAudioResource("../windows.mp3"))

		if (args.length > 0) {
			const videoFinder = async (query) => {
				const videoResult = await ytSearch(query);

				return videoResult.videos.length > 1
					? videoResult.videos[0]
					: null;
			};

			const video = await videoFinder(args.join(" "));
			if (video) {
				const stream = ytdl(video.url, {
					filter: "audioonly",
					quality: "highestaudio",
				});

				player.play(createAudioResource(stream));

				player.on("error", (error) => {
					console.error(
						`Error: ${error.message} with resource ${error.resource.metadata.title}`
					);
				});

                stream.on("error", (error) => {
                    console.error(`Error: ${error.message}`);
                });

				await message.reply(
					`:thumbsup: Now playing ***${video.title}***`
				);
			}
		} else {
			message.channel.send({ content: "Couldn't find that song." });
		}
	},
};
