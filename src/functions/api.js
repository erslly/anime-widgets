// @ts-check
import svg from "@/utils/svg.js";
import { ERROR_MESSAGES } from "@/constants/messages.js";

export function handleApiError(error, res) {
	console.error("API ERROR:", error?.response?.data || error);
	res.status(400).send(svg.error(ERROR_MESSAGES.API_ERROR.title, ERROR_MESSAGES.API_ERROR.description));
}

export function createSvgResponse(css, html, res) {
	res.status(200).send(svg.create({ css, html }));
}
