// @ts-check
import { API_ENDPOINTS, API_TIMEOUTS } from "@/constants/api.js";
import axios from "axios";

export async function fetchMyAnimeListUser(username) {
	try {
		const response = await axios.get(`${API_ENDPOINTS.MYANIMELIST}/users/${username}/full`, { 
			timeout: API_TIMEOUTS.MYANIMELIST
		});
		return response;
	} catch (error) {
		throw error;
	}
}
