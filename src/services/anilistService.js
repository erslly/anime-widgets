// @ts-check
import axios from "axios";
import { anilistUserQuery } from "@/utils/query.js";

export async function fetchAnilistUser(username) {
	const query = {
		query: anilistUserQuery,
		variables: { name: username }
	};

	try {
		const response = await axios.post("https://graphql.anilist.co", query, {
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
			timeout: 10 * 1000
		});
		return response;
	} catch (error) {
		throw error;
	}
}
