import axios from "axios";
import { join } from "path";
import process from "process";

/** @param {...string} path */
export const fileify = (...path) => join(process.cwd(), "src", ...path);

/**
 *
 * @param {string} format
 * @param {string[]} values
 * @returns {string}
 */
export const replace = (format, values) => format.replace(/\{(\d+)\}/g, (_, i) => values[i] ?? `{${i}}`);

/**
 *
 * @param {string} str
 * @param {number} max
 * @returns
 */
export const trim = (str, max) => str.length > max ? `${str.slice(0, max - 3)}...` : str;

/**
 * @param {string} imageUrl
 * @param {BufferEncoding | undefined} encoding
 */
export async function bufferLike(imageUrl, encoding = "base64") {
	/** @type {import("axios").AxiosResponse | undefined} */
	const httpData = await axios.get(imageUrl, { responseType: "arraybuffer" }).catch(() => undefined);
	if (!httpData) {
		return;
	}

	/** @type {Buffer} */
	const buffer = httpData.data;
	const response = buffer.toString(encoding);

	return `data:image/png;base64,${response}`;
}