// @ts-check
import { isValidTheme } from "@/constants/themes.js";
export function validateUsername(username) {
	return username && username.trim().length > 0;
}

export function validateTheme(theme) {
	return (!theme || isValidTheme(theme));
}

export function hasAnimeData(user, platform = 'mal') {
	if (platform === 'mal') {
		return user.updates && user.updates?.anime && user.statistics.anime.mean_score >= 1;
	}
	
	if (platform === 'anilist') {
		return user.statistics && user.statistics.anime && user.statistics.anime.meanScore >= 1;
	}
	
	return false;
}
