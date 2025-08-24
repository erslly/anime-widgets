// @ts-check
import headers from "@/middlewares/headers.js";
import styles from "@/modules/styles.js";
import views from "@/modules/views.js";
import svg from "@/utils/svg.js";
import { validateUsername } from "@/functions/validation.js";
import { handleApiError, createSvgResponse } from "@/functions/api.js";
import { mapAnilistData, mapMyAnimeListData } from "@/functions/mapping.js";
import { fetchAnilistUser } from "@/services/anilistService.js";
import { fetchMyAnimeListUser } from "@/services/myAnimeListService.js";
import { Router } from "express";

const router = Router({
	caseSensitive: true,
	strict: true,
});

router.get("/widgets/myanimelist", headers.svg, async (req, res) => {
	const userName = String(req.query.username || '');
	if (!validateUsername(userName)) {
		res.status(400).send(svg.error("Oops! Username is missing.", "Please provide a username to continue. We need this to find your profile!"));
		return;
	}

	try {
		const httpResponse = await fetchMyAnimeListUser(userName);
		const user = mapMyAnimeListData(httpResponse);
		
		if (!(user.updates && user.updates?.anime && user.statistics.anime.mean_score >= 1)) {
			res.status(400).send(svg.error("No Data Available", "Please add some anime activity to continue."));
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
		res.status(400).send(svg.error("Oops! Username is missing.", "Please provide a username to continue. We need this to find your profile!"));
		return;
	}

	try {
		const httpResponse = await fetchAnilistUser(userName);
		
		if (!httpResponse.data?.data?.User) {
			handleApiError(null, res);
			return;
		}

		const user = mapAnilistData(httpResponse);
		if (!(user.statistics && user.statistics.anime && user.statistics.anime.meanScore >= 1)) {
			res.status(400).send(svg.error("No Data Available", "Please add some anime activity to continue."));
			return;
		}

		createSvgResponse(styles.anilist, await views.anilist(user), res);
	} catch (error) {
		handleApiError(error, res);
	}
});

export default router;