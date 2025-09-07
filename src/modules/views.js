// @ts-check
import { Colors, headers } from "@/modules/general.js";
import { dateFormat } from "@/utils/date.js";
import { calculate } from "@/utils/math.js";
import { bufferLike, trim } from "@/utils/strings.js";
import { getStatusClass } from "@/utils/theme.js";

/** @param {import("@/jsdoc.js").User} user */
async function myanimelist(user) {
	function summary() {
		return `<div class="flex justify-between text-xs font-light theme-text-primary">
      <div>
        <span class="font-normal theme-text-secondary">Days:</span>
        ${user.statistics.anime.days_watched}
      </div>
      <div>
        <span class="font-normal theme-text-secondary">Mean Score:</span>
        ${user.statistics.anime.mean_score}
      </div>
    </div>
    `;
	}

	function status() {
		const keys = {
			watching: user.statistics.anime.watching,
			completed: user.statistics.anime.completed,
			on_hold: user.statistics.anime.on_hold,
			dropped: user.statistics.anime.dropped,
			plan_to_watch: user.statistics.anime.plan_to_watch,
		};
		const total = Object.values(keys).reduce((acc, val) => acc + val, 0);

		return `<div class="mt-2 flex h-5 w-full rounded *:h-full">
      <div style="width: ${calculate(keys.watching, total)}%" class="rounded-l-sm theme-status-watching"></div>
      <div style="width: ${calculate(keys.completed, total)}%" class="theme-status-completed"></div>
      <div style="width: ${calculate(keys.on_hold, total)}%" class="theme-status-on-hold"></div>
      <div style="width: ${calculate(keys.dropped, total)}%" class="theme-status-dropped"></div>
      <div style="width: ${calculate(keys.plan_to_watch, total)}%" class="rounded-r-sm theme-status-plan-to-watch"></div>
    </div>
  `;
	}

	/**
   *
   * @param {string} key
   * @param {number} value
   */
	function formats(key, value) {
		return `<div class="flex justify-between">
    <div class="flex items-center gap-3 text-sm">
      ${key in Colors ? `<div class="size-3 rounded-full ${getStatusClass(key)}"></div>` : ""}
      <span class="font-normal theme-text-secondary">${key}:</span>
    </div>
    
    <div class="text-sm theme-text-primary">${Intl.NumberFormat().format(value)}</div>
    </div>`;
	}

	/**
   * @param {import("@/jsdoc.js").UpdateItem} item
   * @returns
   */
	async function entry(item) {

		return `<div class="flex items-start justify-start w-full gap-2">
          <img src="${await bufferLike(item.entry.images.webp.image_url)}" class="h-[60px] w-[40px] rounded-sm" />
          <div class="flex  items-end gap-16  w-full">
           <div class="w-full">
              <span class="text-sm theme-text-primary">${trim(item.entry.title, 60)}</span>
            <div class="w-full h-4 theme-progress-bg rounded-sm py-[2px] px-[4px]">
              ${(item.episodes_seen && item.episodes_total) ? `<div class="h-full ${getStatusClass(item.status)} rounded-sm" style="width: ${calculate(item.episodes_seen, item.episodes_total)}%"></div>` : `<div class="h-full ${getStatusClass(item.status)} rounded-sm" style="width: ${item.status === "Plan to Watch" ? "0" : "25"}%"></div>`}
            </div>
             <div class="flex m-1 justify-between items-center">
               <span class="text-xs theme-text-secondary">${item.status} <span class="theme-text-primary">${item.episodes_seen || "∞"}</span>/${item.episodes_total || "∞"} · Scored <span class="${item.score === 0 ? "theme-text-muted" : "theme-text-primary"}">${item.score || "-"}</span></span>
             <span class="text-xs theme-text-secondary">${dateFormat(item.date)}</span>
             </div>
           </div>

           
          </div>
        </div>`;
	}

	function left() {
		return `<div class="w-1/2">
     <h3 class="text-sm font-light theme-text-primary">Anime Stats</h3>
     <div class="mt-2">
      ${summary()}
      ${status()}

      <div class="mt-2 flex w-full gap-3">
        <div class="w-1/2">
          ${formats("Watching", user.statistics.anime.watching)}
          ${formats("Completed", user.statistics.anime.completed)}
          ${formats("On-Hold", user.statistics.anime.on_hold)}
          ${formats("Dropped", user.statistics.anime.dropped)}
          ${formats("Plan to Watch", user.statistics.anime.plan_to_watch)}
        </div>
        <div class="w-1/2">
           ${formats("Total Entries", user.statistics.anime.total_entries)}
           ${formats("Rewatched", user.statistics.anime.rewatched)}
           ${formats("Episodes", user.statistics.anime.episodes_watched)}
        </div>
      </div>
     </div>
    </div>`;
	}

	async function right() {
		return `<div class="w-1/2">
    <h3 class="text-sm font-light theme-text-primary">Last Anime Updates</h3>
    <div class="mt-2 w-full flex flex-col gap-2">
      ${user.updates.anime.length === 0 ? "<span class='theme-text-secondary text-sm'>Access to this list has been restricted by the owner.</span>" : ""}
      ${(await Promise.all(user.updates.anime.slice(0, 3).map(async (val) => await entry(val)))).join(" ")}
    </div>
    </div>`;
	}

	return `<div xmlns="http://www.w3.org/1999/xhtml" class="relative flex h-full w-full items-center justify-center gap-0 space-x-3 rounded-lg theme-bg p-5 theme-text-secondary" style="font-family: sans-serif;">
    ${headers("Statistics")}

    <div class="mt-4 flex w-full gap-3" style="min-height: 200px;">
      ${left()}
      ${await right()}
    </div>
  </div>`;
}

/**
 * @param {object} user
 * @param {string} user.name
 * @param {{ large: string }} user.avatar
 * @param {{ anime: { count: number, meanScore: number, minutesWatched: number, episodesWatched: number, statuses: Array<{status: string, count: number}> } }} user.statistics
 * @param {{ nodes: Array<{ media: { title: { romaji: string }, coverImage: { large: string }, episodes: number }, status: string, progress: number, score: number, updatedAt: number }> }} user.animeList
 */
async function anilist(user) {
	function summary() {
		const days = user.statistics.anime.minutesWatched ? (user.statistics.anime.minutesWatched / 60 / 24).toFixed(1) : '-';
		return `<div class="flex justify-between text-xs font-light text-white">
      <div>
        <span class="font-normal theme-text-secondary">Days:</span>
        ${days}
      </div>
      <div>
        <span class="font-normal text-[#9ca3af]">Mean Score:</span>
        ${user.statistics.anime.meanScore}
      </div>
    </div>`;
	}

	function status() {
		const keys = {
			watching: user.statistics.anime.statuses.find(s => s.status === "CURRENT")?.count || 0,
			completed: user.statistics.anime.statuses.find(s => s.status === "COMPLETED")?.count || 0,
			on_hold: user.statistics.anime.statuses.find(s => s.status === "PAUSED")?.count || 0,
			dropped: user.statistics.anime.statuses.find(s => s.status === "DROPPED")?.count || 0,
			plan_to_watch: user.statistics.anime.statuses.find(s => s.status === "PLANNING")?.count || 0,
		};
		const total = Object.values(keys).reduce((acc, val) => acc + val, 0);
		return `<div class="mt-2 flex h-5 w-full rounded *:h-full">
      <div style="width: ${calculate(keys.watching, total)}%" class="rounded-l-sm theme-status-watching"></div>
      <div style="width: ${calculate(keys.completed, total)}%" class="theme-status-completed"></div>
      <div style="width: ${calculate(keys.on_hold, total)}%" class="theme-status-on-hold"></div>
      <div style="width: ${calculate(keys.dropped, total)}%" class="theme-status-dropped"></div>
      <div style="width: ${calculate(keys.plan_to_watch, total)}%" class="rounded-r-sm theme-status-plan-to-watch"></div>
    </div>`;
	}

	function formats(key, value) {
		return `<div class="flex justify-between">
    <div class="flex items-center gap-3 text-sm">
      ${key in Colors ? `<div class="size-3 rounded-full ${getStatusClass(key)}"></div>` : ""}
      <span class="font-normal theme-text-secondary">${key}:</span>
    </div>
    <div class="text-sm theme-text-primary">${Intl.NumberFormat().format(value)}</div>
    </div>`;
	}

	async function entry(item) {
		return `<div class="flex items-start justify-start w-full gap-2">
          <img src="${await bufferLike(item.media.coverImage.large)}" class="h-[60px] w-[40px] rounded-sm" />
          <div class="flex  items-end gap-16  w-full">
           <div class="w-full">
              <span class="text-sm">${trim(item.media.title.romaji, 60)}</span>
            <div class="w-full h-4 bg-[#272727] rounded-sm py-[2px] px-[4px]">
              ${(item.progress && item.media.episodes) ? `<div class="h-full bg-[#338543] rounded-sm" style="width: ${calculate(item.progress, item.media.episodes)}%"></div>` : `<div class="h-full bg-[#338543] rounded-sm" style="width: 25%"></div>`}
            </div>
             <div class="flex m-1 justify-between items-center">
               <span class="text-xs theme-text-secondary">${item.status} <span class="theme-text-primary">${item.progress || "∞"}</span>/${item.media.episodes || "∞"} · Scored <span class="${item.score === 0 ? "theme-text-muted" : "theme-text-primary"}">${item.score || "-"}</span></span>
             <span class="text-xs theme-text-secondary">${dateFormat(new Date(item.updatedAt * 1000).toISOString())}</span>
             </div>
           </div>
          </div>
        </div>`;
	}

	function left() {
		return `<div class="w-1/2">
     <h3 class="text-sm font-light theme-text-primary">Anime Stats</h3>
     <div class="mt-2">
      ${summary()}
      ${status()}
      <div class="mt-2 flex w-full gap-3">
        <div class="w-1/2">
          ${formats("Watching", user.statistics.anime.statuses.find(s => s.status === "CURRENT")?.count || 0)}
          ${formats("Completed", user.statistics.anime.statuses.find(s => s.status === "COMPLETED")?.count || 0)}
          ${formats("On-Hold", user.statistics.anime.statuses.find(s => s.status === "PAUSED")?.count || 0)}
          ${formats("Dropped", user.statistics.anime.statuses.find(s => s.status === "DROPPED")?.count || 0)}
          ${formats("Plan to Watch", user.statistics.anime.statuses.find(s => s.status === "PLANNING")?.count || 0)}
        </div>
        <div class="w-1/2">
           ${formats("Total Entries", user.statistics.anime.count)}
           ${formats("Episodes", user.statistics.anime.episodesWatched)}
        </div>
      </div>
     </div>
    </div>`;
	}

	async function right() {
		return `<div class="w-1/2">
    <h3 class="text-sm font-light theme-text-primary">Last Anime Updates</h3>
    <div class="mt-2 w-full flex flex-col gap-2">
      ${user.animeList.nodes.length === 0 ? "<span class='theme-text-secondary text-sm'>No recent updates found.</span>" : ""}
      ${(await Promise.all(user.animeList.nodes.map(async (val) => await entry(val)))).join(" ")}
    </div>
    </div>`;
	}

	return `<div xmlns="http://www.w3.org/1999/xhtml" class="relative flex h-full w-full items-center justify-center gap-0 space-x-3 rounded-lg theme-bg p-5 theme-text-secondary" style="font-family: sans-serif;">
    ${headers("Statistics")}
    <div class="mt-4 flex w-full gap-3" style="min-height: 200px;">
      ${left()}
      ${await right()}
    </div>
  </div>`;
}

export default { myanimelist, anilist };
