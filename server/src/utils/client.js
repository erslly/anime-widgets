// @ts-check
import settings from "@/settings.js";
import { onReady } from "@/utils/events.js";
import { Client, Events, IntentsBitField } from "discord.js";

const Intents = IntentsBitField.Flags;
export const client = new Client({
	intents: Object.values(Intents).filter((intent) => typeof intent !== "string"),
	failIfNotExists: true,
});

client.on(Events.ClientReady, onReady);

export async function start() {
	await client.login(settings.discord.bot.token);
}

