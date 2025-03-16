// @ts-check
import consola from "consola";

/**
 *
 * @param {import("discord.js").Client} client
 */
export async function onReady(client) {
	consola.success(`Bot başarıyla ${client.user.username} olarak Discord'a giriş yaptı.`);
}