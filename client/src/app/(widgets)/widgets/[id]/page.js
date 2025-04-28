"use client";
import { useParams, useSearchParams } from "next/navigation";

export default function Page() {
  /** @type {{ id: string; }} */
  const params = useParams();
  const searchParams = useSearchParams();

  /** @type {"anime_stats" | "spotify_large"} */
  const WidgetType = searchParams.get("type");
  const id = params.id;

  if (WidgetType == "anime_stats") return <AnimeStats />;

  return (
    <div>{WidgetType} - {id}</div>
  );
}

/**
 * This function fetches and processes user statistics from MyAnimeList (MAL).
 * It retrieves data such as the user's watched anime, ratings, and other profile-related information.
 * The retrieved data will be used to display the user's anime viewing history and statistics.
 */
function AnimeStats() {
  return (
    <div className="relative flex h-full w-full items-center justify-center gap-0 space-x-3 rounded-lg bg-[#02020A] p-5 text-[#9ca3af]">
  <a href="#" className="absolute top-3 right-5">
    <h3 className="text-xs font-light">thunder.rest</h3>
  </a>

  <div className="absolute top-3 left-5">
    <h3 className="text-xs font-light">Statistics</h3>
  </div>

  <div className="mt-4 flex w-full gap-3">
    <div className="w-1/2">
      <h3 className="text-sm font-light">Anime Stats</h3>
      {/* <div className="h-[1px] bg-[#62666e]"></div> */}

      <div className="mt-2">
        <div className="flex justify-between text-xs font-light text-white">
          <div><span className="font-normal text-[#9ca3af]">Days:</span> 43.7</div>
          <div><span className="font-normal text-[#9ca3af]">Mean Score:</span> 7.35</div>
        </div>

        <div className="mt-2 flex h-5 w-full rounded *:h-full">
          <div className="w-[4.17%] rounded-l-sm bg-[#338543]"></div>
          <div className="w-[81.48%] bg-[#2D4276]"></div>
          <div className="w-[0%] bg-[#C9A31F]"></div>
          <div className="w-[4.17%] bg-[#832F30]"></div>
          <div className="w-[10.19%] rounded-r-sm bg-[#747474]"></div>
        </div>

        <div className="mt-2 flex w-full gap-3">
          <div className="w-1/2">
            <div className="flex justify-between">
              <div className="flex items-center gap-3 text-sm">
                <div className="size-3 rounded-full bg-[#338543]"></div>
                <span className="font-normal text-[#9ca3af]">Watching:</span>
              </div>

              <div className="text-sm text-white">1</div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-3 text-sm">
                <div className="size-3 rounded-full bg-[#2D4276]"></div>
                <span className="font-normal text-[#9ca3af]">Completed:</span>
              </div>

              <div className="text-sm text-white">176</div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-3 text-sm">
                <div className="size-3 rounded-full bg-[#C9A31F]"></div>
                <span className="font-normal text-[#9ca3af]">On-Hold:</span>
              </div>

              <div className="text-sm text-white">0</div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-3 text-sm">
                <div className="size-3 rounded-full bg-[#832F30]"></div>
                <span className="font-normal text-[#9ca3af]">Dropped:</span>
              </div>

              <div className="text-sm text-white">9</div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-3 text-sm">
                <div className="size-3 rounded-full bg-[#747474]"></div>
                <span className="font-normal text-[#9ca3af]">Plan to Watch:</span>
              </div>

              <div className="text-sm text-white">22</div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex justify-between">
              <div className="flex items-center gap-3 text-sm">
                <span className="font-normal text-[#9ca3af]">Total Entries:</span>
              </div>

              <div className="text-sm text-white">216</div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-3 text-sm">
                <span className="font-normal text-[#9ca3af]">Rewatched:</span>
              </div>

              <div className="text-sm text-white">0</div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center gap-3 text-sm">
                <span className="font-normal text-[#9ca3af]">Episodes:</span>
              </div>

              <div className="text-sm text-white">2,589</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="w-1/2">
      <h3 className="text-sm font-light">Last Anime Updates</h3>
      {/* <div className="h-[1px] bg-[#62666e]"></div> */}

      <div className="mt-2 w-full flex flex-col gap-2">
        <div className="flex items-start justify-start w-full gap-2">
          <img
            src="https://cdn.myanimelist.net/r/80x120/images/anime/1787/146809.webp?s=34a02e06ef5faea461dea38a7d5f3dd5"
            className="h-[60px] w-[40px] rounded-sm"
          />
          <div className="flex items-end gap-16 w-full">
            <div className="w-full">
              <span className="text-sm">Hana wa Saku, Shura no Gotoku</span>
              <div className="w-full h-4 bg-[#272727] rounded-sm py-[2px] px-[4px]">
                <div className="size-full bg-[#2D4276] rounded-sm"></div>
              </div>
              <div className="flex m-1 justify-between items-center">
                <span className="text-xs">
                  Completed <span className="text-white">12</span>/12 · Scored{" "}
                  <span className="text-white">6</span>
                </span>
                <span className="text-xs">23 minutes ago</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-start w-full gap-2">
          <img
            src="https://cdn.myanimelist.net/r/80x120/images/anime/5/74983.webp?s=39ae937687c144e9ec9e6d02042a8fae"
            className="h-[60px] w-[40px] rounded-sm"
          />
          <div className="flex items-end gap-16 w-full">
            <div className="w-full">
              <span className="text-sm">Evangelion Movie 2: Ha</span>
              <div className="w-full h-4 bg-[#272727] rounded-sm py-[2px] px-[4px]">
                <div className="size-full bg-[#2D4276] rounded-sm"></div>
              </div>
              <div className="flex m-1 justify-between items-center">
                <span className="text-xs">
                  Completed <span className="text-white">1</span>/1 · Scored{" "}
                  <span className="text-white">8</span>
                </span>
                <span className="text-xs">Apr 26, 1:59 AM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-start justify-start w-full gap-2">
          <img
            src="https://cdn.myanimelist.net/r/80x120/images/anime/1988/148017.webp?s=d88161df0ed08e9be23f4eb0bf3ad3ee"
            className="h-[60px] w-[40px] rounded-sm"
          />
          <div className="flex items-end gap-16 w-full">
            <div className="w-full">
              <span className="text-sm">Witch Watch</span>
              <div className="w-full h-4 bg-[#272727] rounded-sm py-[2px] px-[4px]">
                <div className="h-full w-[11.54%] bg-[#338543] rounded-sm"></div>
              </div>
              <div className="flex m-1 justify-between items-center">
                <span className="text-xs">
                  Completed <span className="text-white">3</span>/26 · Scored{" "}
                  <span>-</span>
                </span>
                <span className="text-xs">Apr 20, 2:06 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
