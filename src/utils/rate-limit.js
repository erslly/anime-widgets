// @ts-check
import settings from "@/settings";
import { rateLimit } from "express-rate-limit";

const message = {
	success: false,
	error: "Too many requests, please try again later.",
	status: 429,
};

function skip() {
	if (settings.node === "development") return true;
}

export default rateLimit({
	windowMs: 15 * 60 * 1000,
	limit: 100,
	standardHeaders: "draft-7",
	legacyHeaders: false,
	message,
	skipFailedRequests: true,
	skip,
});