// @ts-check
import settings from "@/settings.js";
import { client } from "@/utils/client.js";
import axios, { AxiosError } from "axios";
import consola from "consola";
import { Collection } from "discord.js";

export class UserManager {
	constructor() {
		this.headers = { Authorization: `Bot ${settings.discord.token}` };
		/** @type {Collection<string, import("@/jsdoc.js").UserData>} */
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

			/** @type {{ banner: string; banner_color: string; }} */
			const { banner, banner_color } = response.data;
			const banner_url = banner ? `https://cdn.discordapp.com/banners/${id}/${banner}` : null;

			return { banner, banner_color, banner_url };
		}
		catch (error) {
			if (error instanceof AxiosError) {
				throw consola.error(error.response.data);
			}
			else if (error instanceof Error) {
				throw consola.error(error.message);
			}

			return { banner: null, banner_color: null, banner_url: null };
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
   * @returns {Promise<import("@/jsdoc.js").UserData>}
   */
	async build(member) {
		const { id, username, avatar, defaultAvatarURL } = member.user;
		const { displayName, presence } = member;

		const flags = member.user.flags.toJSON();
		const banner = await this.fetchBanner(id);

		return {
			id,
			username,
			display_name: displayName,
			avatar,
			avatar_url: member.user.displayAvatarURL(),
			default_avatar: defaultAvatarURL,
			...banner,
			flags,
			status: presence?.status ?? "offline",
			activities: presence?.activities ?? [],
			platform: presence?.clientStatus ?? {},
		};
	}

}