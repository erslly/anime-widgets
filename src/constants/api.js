// @ts-check
export const API_ENDPOINTS = {
	ANILIST: 'https://graphql.anilist.co',
	MYANIMELIST: 'https://api.jikan.moe/v4',
};

export const API_TIMEOUTS = {
	DEFAULT: 10 * 1000,
	ANILIST: 15 * 1000,
	MYANIMELIST: 10 * 1000,
}

export const ANILIST_HEADERS = {
	'Content-Type': 'application/json',
	'Accept': 'application/json'
}