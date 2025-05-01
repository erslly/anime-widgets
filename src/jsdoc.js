// @ts-check

/**
 * @typedef {{
*   image_url: string,
*   small_image_url: string,
*   large_image_url: string
* }} ImageUrls
*/

/**
* @typedef {{
*   mal_id: number,
*   url: string,
*   images: {
*     jpg: ImageUrls,
*     webp: ImageUrls
*   },
*   title: string,
*   type: string,
*   start_year: number
* }} FavoriteItem
*/

/**
* @typedef {{
*   anime: {
*     days_watched: number,
*     mean_score: number,
*     watching: number,
*     completed: number,
*     plan_to_watch: number,
*     on_hold: number,
*     dropped: number,
*     total_entries: number,
*     episodes_watched: number,
*     rewatched: number
*   },
*   manga: {
*     days_read: number,
*     mean_score: number,
*     reading: number,
*     completed: number,
*     total_entries: number,
*     chapters_read: number
*   }
* }} UserStats
*/


/**
 * @typedef {{
*   mal_id: number,
*   url: string,
*   images: {
*     jpg: ImageUrls,
*     webp: ImageUrls
*   },
*   title: string
* }} Entry
*/

/**
 * @typedef {{
*   entry: Entry,
*   score: number,
*   status: string,
*   episodes_seen?: number,
*   episodes_total?: number,
*   chapters_read?: number | null,
*   chapters_total?: number | null,
*   date: string
* }} UpdateItem
*/

/**
* @typedef {{
*   anime: UpdateItem[],
*   manga: UpdateItem[]
* }} Updates
*/

/**
* @typedef {{
*   mal_id: number,
*   username: string,
*   url: string,
*   images: {
*     jpg: ImageUrls,
*     webp: ImageUrls
*   },
*   last_online: string,
*   gender: string,
*   birthday: string | null,
*   location: string,
*   joined: string,
*   statistics: UserStats,
*   favorites: {
*     anime: FavoriteItem[],
*     manga: FavoriteItem[]
*   };
*  updates: Updates;
* }} User
*/

export { };

