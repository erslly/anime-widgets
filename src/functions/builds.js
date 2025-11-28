// @ts-check
export default {
	/** @param {any} response  */
	myanimelist(response) {
		const httpData = response.data;
		return httpData?.data;
	},

	/** @param {any} response */
	anilist(response) {
		const httpData = response.data?.data;
		const user = httpData.User;

		/** @type {{ nodes: any[] }} */
		const animeList = (response.data.data.MediaListCollection?.lists?.[0]?.entries)
			? { nodes: response.data.data.MediaListCollection.lists[0].entries.slice(0, 3) }
			: { nodes: [] };

		return { ...user, animeList };
	},
};