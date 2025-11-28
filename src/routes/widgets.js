// @ts-check
import builds from "@/functions/builds.js";
import headers from "@/middlewares/headers.js";
import styles from "@/modules/styles.js";
import themes from "@/modules/themes.js";
import views from "@/modules/views.js";
import ErrorMap from "@/utils/error-map.js";
import services from "@/utils/services.js";
import svg from "@/utils/svg.js";
import { Router } from "express";

const router = Router({
	caseSensitive: true,
	strict: true,
});

router.get("/widgets/myanimelist", headers.svg, async (req, res) => {
	const userName = String(req.query.username || "");
	const theme = String(req.query.theme || "default");

	if (!(userName && userName.trim().length > 0)) {
		res.status(400).send(svg.error(ErrorMap.UsernameMissing.Title, ErrorMap.UsernameMissing.Description));
		return;
	}

	if (!(!theme || themes.check(theme))) {
		res.status(400).send(svg.error(ErrorMap.InvalidTheme.Title, ErrorMap.InvalidTheme.Description));
		return;
	}

	try {
		const httpResponse = await services.myanimelist(userName);
		const user = builds.myanimelist(httpResponse);

		if (!(user.updates && user.updates?.anime && user.statistics.anime.mean_score >= 1)) {
			res.status(400).send(svg.error(ErrorMap.NoDataAvailable.Title, ErrorMap.NoDataAvailable.Description));
			return;
		}

		const css = styles.generateStyledCSS(theme);
		const html = await views.myanimelist(user);

		res.status(200).send(svg.create({ css, html }));
	}
	catch {
		res.status(500).send(svg.error(ErrorMap.ApiError.Title, ErrorMap.ApiError.Description));
	}
});

router.get("/widgets/anilist", headers.svg, async (req, res) => {
	const userName = String(req.query.username || "");
	const theme = String(req.query.theme || "default");

	if (!(userName && userName.trim().length > 0)) {
		res.status(400).send(svg.error(ErrorMap.UsernameMissing.Title, ErrorMap.UsernameMissing.Description));
		return;
	}

	if (!(!theme || themes.check(theme))) {
		res.status(400).send(svg.error(ErrorMap.InvalidTheme.Title, ErrorMap.InvalidTheme.Description));
		return;
	}

	try {
		const httpResponse = await services.anilist(userName);
		const user = builds.anilist(httpResponse);

		if (!(user.statistics && user.statistics.anime && user.statistics.anime.meanScore >= 1)) {
			res.status(400).send(svg.error(ErrorMap.NoDataAvailable.Title, ErrorMap.NoDataAvailable.Description));
			return;
		}

		const css = styles.generateStyledCSS(theme);
		const html = await views.anilist(user);

		res.status(200).send(svg.create({ css, html }));
	}
	catch {
		res.status(500).send(svg.error(ErrorMap.ApiError.Title, ErrorMap.ApiError.Description));
	}
});

router.get("/themes", (req, res) => {
	res.json({
		themes: themes.keys(),
		message: "Available themes for widgets",
	});
});

export default router;