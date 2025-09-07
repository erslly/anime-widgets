// @ts-check
import headers from "@/middlewares/headers.js";
import styles from "@/modules/styles.js";
import views from "@/modules/views.js";
import svg from "@/utils/svg.js";
import { validateUsername, hasAnimeData, validateTheme } from "@/functions/validation.js";
import { handleApiError, createSvgResponse } from "@/functions/api.js";
import { mapAnilistData, mapMyAnimeListData } from "@/functions/mapping.js";
import { fetchAnilistUser } from "@/services/anilistService.js";
import { fetchMyAnimeListUser } from "@/services/myAnimeListService.js";
import { ERROR_MESSAGES } from "@/constants/messages.js";
import { getAvailableThemes } from "@/constants/themes.js";
import { Router } from "express";

const router = Router({
	caseSensitive: true,
	strict: true,
});

router.get("/widgets/myanimelist", headers.svg, async (req, res) => {
	const userName = String(req.query.username || '');
	const theme = String(req.query.theme || 'default');
	
	if (!validateUsername(userName)) {
		res.status(400).send(svg.error(ERROR_MESSAGES.USERNAME_MISSING.title, ERROR_MESSAGES.USERNAME_MISSING.description));
		return;
	}

	if (!validateTheme(theme)) {
		res.status(400).send(svg.error("Invalid Theme", "The specified theme is not supported. Please use a valid theme name."));	
		return;
	}

	try {
		const httpResponse = await fetchMyAnimeListUser(userName);
		const user = mapMyAnimeListData(httpResponse);
		
		if (!hasAnimeData(user, 'mal')) {
			res.status(400).send(svg.error(ERROR_MESSAGES.NO_DATA_AVAILABLE.title, ERROR_MESSAGES.NO_DATA_AVAILABLE.description));
			return;
		}

		const styledCSS = styles.generateStyledCSS(theme);
		createSvgResponse(styledCSS, await views.myanimelist(user), res);
	} catch (error) {
		handleApiError(error, res);
	}
});

router.get("/widgets/anilist", headers.svg, async (req, res) => {
	const userName = String(req.query.username || '');
	const theme = String(req.query.theme || 'default');
	
	if (!validateUsername(userName)) {
		res.status(400).send(svg.error(ERROR_MESSAGES.USERNAME_MISSING.title, ERROR_MESSAGES.USERNAME_MISSING.description));
		return;
	}

	if (!validateTheme(theme)) {
		res.status(400).send(svg.error("Invalid Theme", "The specified theme is not supported. Please use a valid theme name."));
		return;
	}

	try {
		const httpResponse = await fetchAnilistUser(userName);
		
		if (!httpResponse.data?.data?.User) {
			handleApiError(null, res);
			return;
		}

		const user = mapAnilistData(httpResponse);
		if (!hasAnimeData(user, 'anilist')) {
			res.status(400).send(svg.error(ERROR_MESSAGES.NO_DATA_AVAILABLE.title, ERROR_MESSAGES.NO_DATA_AVAILABLE.description));
			return;
		}

		const styledCSS = styles.generateStyledCSS(theme);
		createSvgResponse(styledCSS, await views.anilist(user), res);
	} catch (error) {
		handleApiError(error, res);
	}
});

router.get("/themes", (req, res) => {
	res.json({
		themes: getAvailableThemes(),
		message: "Available themes for widgets"
	});
});

export default router;