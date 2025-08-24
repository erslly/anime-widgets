// @ts-check
import headers from "@/middlewares/headers.js";
import styles from "@/modules/styles.js";
import views from "@/modules/views.js";
import svg from "@/utils/svg.js";
import { validateUsername, hasAnimeData } from "@/functions/validation.js";
import { handleApiError, createSvgResponse } from "@/functions/api.js";
import { mapAnilistData, mapMyAnimeListData } from "@/functions/mapping.js";
import { fetchAnilistUser } from "@/services/anilistService.js";
import { fetchMyAnimeListUser } from "@/services/myAnimeListService.js";
import { ERROR_MESSAGES } from "@/constants/messages.js";
import { Router } from "express";

const router = Router({
	caseSensitive: true,
	strict: true,
});

router.get("/widgets/myanimelist", headers.svg, async (req, res) => {
	const userName = String(req.query.username || '');
	if (!validateUsername(userName)) {
		res.status(400).send(svg.error(ERROR_MESSAGES.USERNAME_MISSING.title, ERROR_MESSAGES.USERNAME_MISSING.description));
		return;
	}

	try {
		const httpResponse = await fetchMyAnimeListUser(userName);
		const user = mapMyAnimeListData(httpResponse);
		
			if (!hasAnimeData(user, 'mal')) {
		res.status(400).send(svg.error(ERROR_MESSAGES.NO_DATA_AVAILABLE.title, ERROR_MESSAGES.NO_DATA_AVAILABLE.description));
		return;
	}

		createSvgResponse(styles.myanimelist, await views.myanimelist(user), res);
	} catch (error) {
		handleApiError(error, res);
	}
});

router.get("/widgets/anilist", headers.svg, async (req, res) => {
	const userName = String(req.query.username || '');
	if (!validateUsername(userName)) {
		res.status(400).send(svg.error(ERROR_MESSAGES.USERNAME_MISSING.title, ERROR_MESSAGES.USERNAME_MISSING.description));
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

		createSvgResponse(styles.anilist, await views.anilist(user), res);
	} catch (error) {
		handleApiError(error, res);
	}
});

export default router;