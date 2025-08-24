// @ts-check
import svg from "@/utils/svg.js";

export function handleApiError(error, res) {
	console.error("API ERROR:", error?.response?.data || error);
	res.status(400).send(svg.error("Oops! Couldn't reach the server.", "We encountered an issue while trying to reach the profile service."));
}

export function createSvgResponse(css, html, res) {
	res.status(200).send(svg.create({ css, html }));
}
