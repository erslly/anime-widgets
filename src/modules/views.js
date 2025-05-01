// @ts-check
import { headers, StatusColor } from "@/modules/general.js";
import { dateFormat } from "@/utils/date.js";
import { calculate } from "@/utils/math.js";
import { trim } from "@/utils/strings.js";

/** @param {import("@/jsdoc.js").User} user */
function myanimelist(user) {
	function summary() {
		return `<div class="flex justify-between text-xs font-light text-white">
      <div>
        <span class="font-normal text-[#9ca3af]">Days:</span>
        ${user.statistics.anime.days_watched}
      </div>
      <div>
        <span class="font-normal text-[#9ca3af]">Mean Score:</span>
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
      <div style="width: ${calculate(keys.watching, total)}%" class="rounded-l-sm bg-[#338543]"></div>
      <div style="width: ${calculate(keys.completed, total)}%" class="bg-[#2D4276]"></div>
      <div style="width: ${calculate(keys.on_hold, total)}%" class="bg-[#C9A31F]"></div>
      <div style="width: ${calculate(keys.dropped, total)}%" class="bg-[#832F30]"></div>
      <div style="width: ${calculate(keys.plan_to_watch, total)}%" class="rounded-r-sm bg-[#747474]"></div>
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
      ${key in StatusColor ? `<div class="size-3 rounded-full bg-[${StatusColor[key]}]"></div>` : ""}
      <span class="font-normal text-[#9ca3af]">${key}:</span>
    </div>
    
    <div class="text-sm text-white">${Intl.NumberFormat().format(value)}</div>
    </div>`;
	}

	/**
   * @param {import("@/jsdoc.js").UpdateItem} item
   * @returns
   */
	function entry(item) {
		return `<div class="flex items-start justify-start w-full gap-2">
          <img src="${item.entry.images.webp.image_url}" class="h-[60px] w-[40px] rounded-sm" />
          <div class="flex  items-end gap-16  w-full">
           <div class="w-full">
              <span class="text-sm">${trim(item.entry.title, 60)}</span>
            <div class="w-full h-4 bg-[#272727] rounded-sm py-[2px] px-[4px]">
              ${item.episodes_seen && item.episodes_total ? `<div class="h-full w-[${calculate(item.episodes_seen, item.episodes_total)}%] bg-[${StatusColor[item.status]}] rounded-sm"></div>` : `<div class="h-full w-[25%] bg-[${StatusColor[item.status]}] rounded-sm"></div>`}
            </div>
             <div class="flex m-1 justify-between items-center">
               <span class="text-xs">${item.status} <span class="text-white">${item.episodes_seen || "∞"}</span>/${item.episodes_total || "∞"} · Scored <span class="${item.score === 0 ? "text-[#9ca3af]" : "text-white"}">${item.score || "-"}</span></span>
             <span class="text-xs">${dateFormat(item.date)}</span>
             </div>
           </div>

           
          </div>
        </div>`;
	}

	function left() {
		return `<div class="w-1/2">
     <h3 class="text-sm font-light">Anime Stats</h3>
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

	function right() {
		return `<div class="w-1/2">
    <h3 class="text-sm font-light">Last Anime Updates</h3>
    <div class="mt-2 w-full flex flex-col gap-2">
      ${user.updates.anime.length === 0 ? "<span class='text-[#9ca3af] text-sm'>Access to this list has been restricted by the owner.</span>" : ""}
      ${user.updates.anime.slice(0, 3).map(entry).join(" ")}
    </div>
    </div>`;
	}

	return `<div xmlns="http://www.w3.org/1999/xhtml" class="relative flex h-full w-full items-center justify-center gap-0 space-x-3 rounded-lg bg-[#02020A] p-5 text-[#9ca3af]" style="font-family: sans-serif;">
    ${headers("Statistics")}

    <div class="mt-4 flex w-full gap-3" style="min-height: 200px;">
      ${left()}
      ${right()}
    </div>
  </div>`;
}

export default {
	myanimelist,
};