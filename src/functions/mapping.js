// @ts-check
export function mapAnilistData(apiResponse) {
	const user = apiResponse.data.data.User;
	const animeList = (apiResponse.data.data.MediaListCollection?.lists?.[0]?.entries)
		? { nodes: apiResponse.data.data.MediaListCollection.lists[0].entries.slice(0, 3) }
		: { nodes: [] };

	user.animeList = animeList;
	return user;
}

export function mapMyAnimeListData(apiResponse) {
	return apiResponse.data.data;
}
