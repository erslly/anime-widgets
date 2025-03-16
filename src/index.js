// @ts-check
import settings from "@/settings.js";
import { start } from "@/utils/client.js";
import rateLimit from "@/utils/rate-limit.js";
import { bold, green } from "colorette";
import cors from "cors";
import "dotenv/config.js";
import express from "express";
import { router } from "express-file-routing";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import process from "process";

const app = express();
app.use(cors(), morgan("dev"), helmet(), express.json());
app.use(rateLimit);

(async function() {
	const directory = path.join(process.cwd(), "src", "routes");
	app.use("/", await router({ directory }));
	await start();
})();

app.listen(settings.api.port, () => console.log(bold(green("✓"))));
