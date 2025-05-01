// @ts-check
import settings from "@/settings.js";
import { timeFormat } from "@/utils/date.js";
import { any, require } from "@/utils/general.js";
import chalk from "chalk";
import cors from "cors";
import express from "express";
import helmet from "helmet";

const app = express();
app.use(cors(), helmet(), express.json());
app.use(any(require("@/routes/widgets.js")));

app.listen(settings.api.port, () => console.log([
	`${chalk.gray(timeFormat())} 🎉 ${chalk.bold("thunder.rest")} is ready for request usage.`,
	`${chalk.gray(timeFormat())} 👉 Visit: ${chalk.blue.underline(settings.url)}`,
].join("\n")));