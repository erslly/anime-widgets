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

/**
 * @swagger
 * /widgets/myanimelist:
 *   get:
 *     summary: Generate MyAnimeList statistics widget
 *     description: Creates an SVG widget displaying user's MyAnimeList anime statistics and recent updates
 *     tags: [Widgets]
 *     parameters:
 *       - $ref: '#/components/parameters/Username'
 *       - $ref: '#/components/parameters/Theme'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/WidgetSuccess'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     examples:
 *       - summary: Default theme
 *         value:
 *           username: "erslly"
 *           theme: "default"
 *       - summary: Tokyo Night theme
 *         value:
 *           username: "erslly"
 *           theme: "tokyonight"
 *       - summary: Rule34 theme
 *         value:
 *           username: "erslly"
 *           theme: "rule34"
 */
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

/**
 * @swagger
 * /widgets/anilist:
 *   get:
 *     summary: Generate AniList statistics widget
 *     description: Creates an SVG widget displaying user's AniList anime statistics and recent updates
 *     tags: [Widgets]
 *     parameters:
 *       - $ref: '#/components/parameters/Username'
 *       - $ref: '#/components/parameters/Theme'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/WidgetSuccess'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 *     examples:
 *       - summary: Default theme
 *         value:
 *           username: "erslly"
 *           theme: "default"
 *       - summary: Dracula theme
 *         value:
 *           username: "erslly"
 *           theme: "dracula"
 *       - summary: Nord theme
 *         value:
 *           username: "erslly"
 *           theme: "nord"
 */
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

/**
 * @swagger
 * /themes:
 *   get:
 *     summary: Get available themes
 *     description: Returns a list of all available themes for widgets
 *     tags: [Themes]
 *     responses:
 *       200:
 *         description: List of available themes
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AvailableThemes'
 *             example:
 *               themes: ["default", "tokyonight", "rule34", "dracula", "nord", "catppuccin", "gruvbox", "monokai"]
 *               message: "Available themes for widgets"
 */
router.get("/themes", (req, res) => {
	res.json({
		themes: getAvailableThemes(),
		message: "Available themes for widgets"
	});
});

export default router;