// @ts-check
import settings from "@/settings.js";
import { timeFormat } from "@/utils/date.js";
import { any, require } from "@/utils/general.js";
import chalk from "chalk";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { swaggerUi, specs } from "@/config/swagger.js";

const app = express();
app.use(cors(), helmet(), express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Docs - thunder.rest',
  customfavIcon: '/favicon.ico',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    docExpansion: 'none',
    filter: true,
    showRequestHeaders: true,
    showCommonExtensions: true,
    tryItOutEnabled: true,
  },
}));

app.use(any(require("@/routes/widgets.js")));

app.listen(settings.api.port, () => console.log([
	`${chalk.gray(timeFormat())} 🎉 ${chalk.bold("thunder.rest")} is ready for request usage.`,
	`${chalk.gray(timeFormat())} 👉 Visit: ${chalk.blue.underline(settings.url)}`,
  `${chalk.gray(timeFormat())} 📚 API Docs: ${chalk.blue.underline(settings.url + "/api-docs")}`,
].join("\n")));