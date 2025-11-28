// @ts-check
import axios from "axios";
import query from "./query.js";

export default {
	/**
   *
   * @param {string} name
   */
	async anilist(name) {
		const data = { query, variables: { name } };

		/** @type {import("axios").RawAxiosResponseHeaders} */
		const headers = {
			"Content-Type": "application/json",
			"Accept": "application/json",
		};

		const response = await axios.post("https://graphql.anilist.co", data, { headers, timeout: 15 * 1000 });
		return response;
	},

	/**
   *
   * @param {string} username
   */
	async myanimelist(username) {
		const response = await axios.get(`https://api.jikan.moe/v4/users/${username}/full`, { timeout: 15 * 1000 });
		return response;
	},
};