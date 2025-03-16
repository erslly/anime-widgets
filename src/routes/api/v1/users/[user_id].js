// @ts-check
import manager from "@/utils/manager.js";
import { AxiosError } from "axios";
import consola from "consola";

/** @type {import("express").Handler} */
export async function get(req, res) {
	const userId = req.params?.user_id;
	if (!userId) {
		res.status(400).send({ success: false, error: "Missing user ID. Please provide a valid user_id in the request URL." });
		return;
	}

	try {
		const user = await manager.users.fetch(userId);
		if (!user) {
			res.status(404).send({ success: false, error: `User with ID '${userId}' not found. Please check the ID and try again.` });
			return;
		}

		res.status(200).send({ success: true, data: { ...user } });
	}
	catch (error) {
		if (error instanceof AxiosError) {
			throw consola.error(error.response.data);
		}
		else if (error instanceof Error) {
			throw consola.error(error.message);
		}

		res.status(500).send({ success: false, error: "An unexpected error occurred while fetching user data. Please try again later." });
	}
}
