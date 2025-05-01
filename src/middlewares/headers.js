// @ts-check

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
function svg(req, res, next) {
	res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
	res.setHeader("Content-Type", "image/svg+xml");
	res.setHeader("Content-Security-Policy", "default-src 'none'; img-src * data:; style-src 'unsafe-inline'");
	next();
}

export default {
	svg,
};