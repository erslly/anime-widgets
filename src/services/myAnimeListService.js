// @ts-check
import axios from "axios";

export async function fetchMyAnimeListUser(username) {
	try {
		const response = await axios.get(`https://api.jikan.moe/v4/users/${username}/full`, { 
			timeout: 10 * 1000 
		});
		return response;
	} catch (error) {
		throw error;
	}
}
