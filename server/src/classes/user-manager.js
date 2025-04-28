// @ts-check
import settings from "@/settings.js";
import { client } from "@/utils/client.js";
import axios, { AxiosError } from "axios";
import consola from "consola";
import { Collection } from "discord.js";

export class UserManager {
	constructor() {
		this.headers = { Authorization: `Bot ${settings.discord.bot.token}` };
		this.cache = new Collection();
	}

	/**
   * @private
   * @param {string} id
   */
	async fetchBanner(id) {
		try {
			const headers = this.headers;
			const response = await axios.get(`https://discord.com/api/v10/users/${id}`, { headers });

			const { banner, banner_color: themeColor } = response.data;
			const bannerURL = banner ? `https://cdn.discordapp.com/banners/${id}/${banner}` : null;

			return { banner, themeColor, bannerURL };
		}
		catch (error) {
			if (error instanceof AxiosError) {
				throw consola.error(error.response.data);
			}
			else if (error instanceof Error) {
				throw consola.error(error.message);
			}

			return { banner: null, themeColor: null, bannerURL: null };
		}
	}

	/**
   * @param {string} id
   */
	async fetch(id) {
		const guild = client.guilds.cache.get(settings.discord.server.id);
		if (!guild) throw new Error("Guild not found");

		const member = await guild.members.fetch(id).catch(() => null);
		if (!member) throw new Error(`Member with ID ${id} not found`);

		const build = await this.build(member);
		this.cache.set(build.id, build);

		return build;
	}


	/**
   * @param {import("discord.js").GuildMember} member
   */
	async build(member) {
		const {
			user: {
				id,
				username,
				avatar,
				globalName,
				defaultAvatarURL,
				bot,
				flags,
			},
			displayName,
			presence,
		} = member;

		const { banner, themeColor, bannerURL } = await this.fetchBanner(id).catch(() => ({
			banner: null,
			themeColor: null,
			bannerURL: null,
		}));

		const activities = (presence?.activities ?? []).map((activity) => {
			const {
				name,
				type,
				details,
				state,
				applicationId,
				timestamps,
				assets,
				url,
			} = activity;
			const emoji = activity.emoji && {
				id: activity.emoji.id,
				name: activity.emoji.name,
			};

			return {
				name,
				type,
				details,
				state,
				emoji,
				applicationId,
				timestamps,
				assets,
				url,
			};
		});

		return {
			id,
			username,
			globalName,
			displayName,
			bot,
			avatar,
			avatarURL: member.displayAvatarURL?.(),
			defaultAvatarURL,
			flags: flags?.toJSON() ?? [],
			banner,
			bannerURL,
			themeColor,
			status: presence?.status ?? "offline",
			activities,
			platform: presence?.clientStatus ?? {},
		};
	}

}