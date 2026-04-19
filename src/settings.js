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
	node: (process.env.NODE_ENV === "production") ? "production" : "development",
	api: {
		port: Number(process.env.PORT) || 3000,
	},
	get url() {
		return `http://localhost:${this.api.port}`;
	},
};

export default settings;