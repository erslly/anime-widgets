// @ts-check
import settings from "@/settings.js";
import { client } from "@/utils/client.js";
import manager from "@/utils/manager";

/** @type {import("express").Handler} */
export async function get(req, res) {
	if (req.method !== "GET") {
		res.status(405);
		return;
	}

	const success = client.isReady();
	const data = {
		discord_invite: `https://discord.gg/${settings.discord.server.code}`,
		monitored_user_count: manager.users.cache.size,
	};

	res.status(200).send({ success, data });
}
