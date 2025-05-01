// @ts-check
import { pad } from "@/utils/general.js";

/**
 *
 * @param {string} date
 */
export function dateFormat(date) {
	const options = {
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	};
	const now = new Date(date);

	// @ts-expect-error
	return now.toLocaleDateString("en-US", options);
}

export function timeFormat() {
	const now = new Date();

	const day = pad(now.getDate());
	const month = pad(now.getMonth() + 1);
	const year = now.getFullYear();

	const hours = pad(now.getHours());
	const minutes = pad(now.getMinutes());
	const seconds = pad(now.getSeconds());

	return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}