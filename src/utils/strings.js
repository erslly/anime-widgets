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