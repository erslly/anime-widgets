// @ts-check

/** @typedef {{ port: number }} ApiConfig */

/**
 * @typedef {{
 *   node: "development" | "production",
 *   api: ApiConfig,
 *   url: string
 * }} Settings
 *
*/

/** @type {Settings} */
const settings = {
	node: "development",
	api: {
		port: 3745,
	},
	get url() {
		return `https://localhost:${this.api.port}`;
	},
};

export default settings;