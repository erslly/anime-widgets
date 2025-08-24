// @ts-check
import axios from "axios";
import { anilistUserQuery } from "@/utils/query.js";
import { API_ENDPOINTS, API_TIMEOUTS, ANILIST_HEADERS } from "@/constants/api.js";

export async function fetchAnilistUser(username) {
	const query = {
		query: anilistUserQuery,
		variables: { name: username }
	};

	try {
		const response = await axios.post(API_ENDPOINTS.ANILIST, query, {
			headers: ANILIST_HEADERS,
			timeout: API_TIMEOUTS.ANILIST
		});
		return response;
	} catch (error) {
		throw error;
	}
}
