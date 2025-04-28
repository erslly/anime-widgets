// @ts-check
import settings from "@/settings.js";
import { start } from "@/utils/client.js";
import { any, require } from "@/utils/general.js";
import rateLimit from "@/utils/rate-limit.js";
import { bold, green } from "colorette";
import cors from "cors";
import "dotenv/config.js";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

const app = express();
app.use(cors(), morgan("dev"), helmet(), express.json());
app.use(rateLimit);

(async function() {
	app.use(any(require("@/routes/[user_id].js")));
	await start();
})();

app.listen(settings.api.port, () => console.log(bold(green("✓"))));
