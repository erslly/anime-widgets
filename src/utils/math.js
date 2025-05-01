// @ts-check
import * as math from "mathjs";
import { z } from "zod";

const schema = z.number().positive().or(z.literal(0));

/**
 *
 * @param {number} current
 * @param {number | null | undefined} total
 * @param {number} precision
 */
export function calculate(current, total, precision = 2) {
	try {
		/** Validates the `current` value against the schema. */
		schema.parse(current);

		const progress = math.divide(current, total) * 100;
		return math.round(progress > 100 ? 100 : progress, precision);
	}
	catch {
		return 25;
	}
}
