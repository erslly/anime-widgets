// @ts-check
import headers from "@/middlewares/headers.js";
import styles from "@/modules/styles.js";
import views from "@/modules/views.js";
import svg from "@/utils/svg.js";
import axios from "axios";
import { Router } from "express";
import { re } from "mathjs";

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


router.get("/widgets/anilist", headers.svg, async (req, res) => {
	const userName = req.query.username;
	if (!userName) {
		res.status(400).send(svg.error("Oops! Username is missing.", "Please provide a username to continue. We need this to find your profile!"));
		return;
	}

	const query = {
		query: `query ($name: String) {\n  User(name: $name) {\n    id\n    name\n    avatar { large }\n    statistics {\n      anime {\n        count\n        meanScore\n        minutesWatched\n        episodesWatched\n        statuses { status count }\n      }\n    }\n  }\n  MediaListCollection(userName: $name, type: ANIME, sort: UPDATED_TIME_DESC) {\n    lists {\n      entries {\n        media {\n          title { romaji }\n          coverImage { large }\n          episodes\n        }\n        status\n        progress\n        score\n        updatedAt\n      }\n    }\n  }\n}`,
		variables: { name: userName }
	};

	let httpResponse;
	try {
		httpResponse = await axios.post("https://graphql.anilist.co", query, {
			headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
			timeout: 10 * 1000
		});
	} catch (e) {
		console.error("ANILIST ERROR:", e?.response?.data || e);
		httpResponse = undefined;
	}

	if (!httpResponse || !httpResponse.data || !httpResponse.data.data || !httpResponse.data.data.User) {
		res.status(400).send(svg.error("Oops! Couldn't reach the server.", "We encountered an issue while trying to reach the profile service."));
		return;
	}

	const user = httpResponse.data.data.User;
	const animeList = (httpResponse.data.data.MediaListCollection?.lists?.[0]?.entries)
	  ? { nodes: httpResponse.data.data.MediaListCollection.lists[0].entries.slice(0, 3) }
	  : { nodes: [] };
	user.animeList = animeList;

	if (!(user.statistics && user.statistics.anime && user.statistics.anime.meanScore >= 1)) {
		res.status(400).send(svg.error("No Data Available", "Please add some anime activity to continue."));
		return;
	}

	res.status(200).send(
		svg.create({
			css: styles.anilist,
			html: (await views.anilist(user))
		})
	);
});

export default router;