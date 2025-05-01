// @ts-check
import settings from "@/settings.js";

export const Colors = {
	Watching: "#338543",
	Completed: "#2D4276",
	"On-Hold": "#C9A31F",
	Dropped: "#832F30",
	"Plan to Watch": "#747474",
};

/** @param {string} title */
export const headers = (title) => `<div class="absolute top-3 left-5"><h3 class="text-xs font-light">${title}</h3></div><a href="${settings.url}" class="absolute top-3 right-5"><h3 class="text-xs font-light">thunder.rest</h3></a>`;