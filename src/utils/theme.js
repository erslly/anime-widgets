// @ts-check
import { getTheme } from "@/constants/themes.js";

/**
 * @param {string} themeName
 * @returns {string}
 */
export function generateThemeCSS(themeName) {
	const theme = getTheme(themeName);
	
	return `
		:root {
			--theme-bg: ${theme.background};
			--theme-text-primary: ${theme.text.primary};
			--theme-text-secondary: ${theme.text.secondary};
			--theme-text-muted: ${theme.text.muted};
			--theme-status-watching: ${theme.status.watching};
			--theme-status-completed: ${theme.status.completed};
			--theme-status-on-hold: ${theme.status.onHold};
			--theme-status-dropped: ${theme.status.dropped};
			--theme-status-plan-to-watch: ${theme.status.planToWatch};
			--theme-progress-bg: ${theme.progress.background};
			--theme-progress-active: ${theme.progress.active};
			--theme-accent: ${theme.accent};
		}
		
		.theme-bg { background-color: var(--theme-bg) !important; }
		.theme-text-primary { color: var(--theme-text-primary) !important; }
		.theme-text-secondary { color: var(--theme-text-secondary) !important; }
		.theme-text-muted { color: var(--theme-text-muted) !important; }
		.theme-status-watching { background-color: var(--theme-status-watching) !important; }
		.theme-status-completed { background-color: var(--theme-status-completed) !important; }
		.theme-status-on-hold { background-color: var(--theme-status-on-hold) !important; }
		.theme-status-dropped { background-color: var(--theme-status-dropped) !important; }
		.theme-status-plan-to-watch { background-color: var(--theme-status-plan-to-watch) !important; }
		.theme-progress-bg { background-color: var(--theme-progress-bg) !important; }
		.theme-progress-active { background-color: var(--theme-progress-active) !important; }
		.theme-accent { color: var(--theme-accent) !important; }
	`;
}

/**
 * @param {string} status
 * @returns {string}
 */
export function getStatusClass(status) {
	const statusMap = {
		'Watching': 'theme-status-watching',
		'Completed': 'theme-status-completed', 
		'On-Hold': 'theme-status-on-hold',
		'Dropped': 'theme-status-dropped',
		'Plan to Watch': 'theme-status-plan-to-watch',
		'CURRENT': 'theme-status-watching',
		'COMPLETED': 'theme-status-completed',
		'PAUSED': 'theme-status-on-hold',
		'DROPPED': 'theme-status-dropped',
		'PLANNING': 'theme-status-plan-to-watch'
	};
	
	return statusMap[status] || 'theme-status-watching';
}