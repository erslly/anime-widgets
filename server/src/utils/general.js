// @ts-check
import { createRequire } from "module";

export const require = createRequire(import.meta.url);

/**
 *
 * @param {number} ms
 * @returns
 */
export const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 *
 * @param {any} variable
 * @returns {any}
 */
export function any(variable) {
	if (variable === undefined || variable === null) {
		return {};
	}

	if (typeof variable === "object" && "default" in variable) {
		return variable.default;
	}

	return variable;
}