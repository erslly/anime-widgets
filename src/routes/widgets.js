// @ts-check
import headers from "@/middlewares/headers.js";
import styles from "@/modules/styles.js";
import views from "@/modules/views.js";
import svg from "@/utils/svg.js";
import axios from "axios";
import { Router } from "express";

const router = Router({
	caseSensitive: true,
	strict: true,
});

router.get("/widgets/myanimelist", headers.svg, async (req, res) => {
	const userName = req.query.username;
	if (!userName) {
		res.status(400).send(svg.error("Oops! Username is missing.", "Please provide a username to continue. We need this to find your profile!"));
		return;
	}

	const httpResponse = await axios.get(`https://api.jikan.moe/v4/users/${userName}/full`, { timeout: 10 * 1000 })
		.catch(() => undefined);
	if (!httpResponse) {
		res.status(400).send(svg.error("Oops! Couldn't reach the server.", "We encountered an issue while trying to reach the profile service."));
		return;
	}
	/** @type {{ data: import("@/jsdoc.js").User; }} */
	const { data: user } = httpResponse.data;
	if (!(user.updates && user.updates?.anime && user.statistics.anime.mean_score >= 1)) {
		res.status(400).send(svg.error("No Data Available", "Please add some anime activity to continue."));
		return;
	}

	res.status(200).send(svg.create({ css: styles.myanimelist, html: (await views.myanimelist(user)) }));
});


export default router;