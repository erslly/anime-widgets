// @ts-check

/**
 * @typedef {{
 *   name: string;
 *   background: string;
 *   text: {
 *     primary: string;
 *     secondary: string;
 *     muted: string;
 *   };
 *   status: {
 *     watching: string;
 *     completed: string;
 *     onHold: string;
 *     dropped: string;
 *     planToWatch: string;
 *   };
 *   progress: {
 *     background: string;
 *     active: string;
 *   };
 *   accent: string;
 * }} Theme
 */

/** @type {Record<string, Theme>} */
export const themeMap = {
	default: {
		name: "Default",
		background: "#02020A",
		text: {
			primary: "#ffffff",
			secondary: "#9ca3af",
			muted: "#6b7280",
		},
		status: {
			watching: "#338543",
			completed: "#2D4276",
			onHold: "#C9A31F",
			dropped: "#832F30",
			planToWatch: "#747474",
		},
		progress: {
			background: "#272727",
			active: "#338543",
		},
		accent: "#3b82f6",
	},

	tokyonight: {
		name: "Tokyo Night",
		background: "#1a1b26",
		text: {
			primary: "#a9b1d6",
			secondary: "#565f89",
			muted: "#414868",
		},
		status: {
			watching: "#7aa2f7",
			completed: "#9ece6a",
			onHold: "#e0af68",
			dropped: "#f7768e",
			planToWatch: "#565f89",
		},
		progress: {
			background: "#24283b",
			active: "#7aa2f7",
		},
		accent: "#bb9af7",
	},

	rule34: {
		name: "Rule34",
		background: "#0d1117",
		text: {
			primary: "#f0f6fc",
			secondary: "#8b949e",
			muted: "#6e7681",
		},
		status: {
			watching: "#ff7b72",
			completed: "#a5d6ff",
			onHold: "#ffa657",
			dropped: "#f85149",
			planToWatch: "#7c3aed",
		},
		progress: {
			background: "#161b22",
			active: "#ff7b72",
		},
		accent: "#ff7b72",
	},

	dracula: {
		name: "Dracula",
		background: "#282a36",
		text: {
			primary: "#f8f8f2",
			secondary: "#6272a4",
			muted: "#44475a",
		},
		status: {
			watching: "#50fa7b",
			completed: "#8be9fd",
			onHold: "#f1fa8c",
			dropped: "#ff5555",
			planToWatch: "#bd93f9",
		},
		progress: {
			background: "#44475a",
			active: "#50fa7b",
		},
		accent: "#ff79c6",
	},

	nord: {
		name: "Nord",
		background: "#2e3440",
		text: {
			primary: "#d8dee9",
			secondary: "#88c0d0",
			muted: "#4c566a",
		},
		status: {
			watching: "#a3be8c",
			completed: "#81a1c1",
			onHold: "#ebcb8b",
			dropped: "#bf616a",
			planToWatch: "#5e81ac",
		},
		progress: {
			background: "#3b4252",
			active: "#a3be8c",
		},
		accent: "#b48ead",
	},

	catppuccin: {
		name: "Catppuccin",
		background: "#1e1e2e",
		text: {
			primary: "#cdd6f4",
			secondary: "#a6adc8",
			muted: "#6c7086",
		},
		status: {
			watching: "#a6e3a1",
			completed: "#89b4fa",
			onHold: "#f9e2af",
			dropped: "#f38ba8",
			planToWatch: "#cba6f7",
		},
		progress: {
			background: "#313244",
			active: "#a6e3a1",
		},
		accent: "#f5c2e7",
	},

	gruvbox: {
		name: "Gruvbox",
		background: "#282828",
		text: {
			primary: "#ebdbb2",
			secondary: "#a89984",
			muted: "#665c54",
		},
		status: {
			watching: "#b8bb26",
			completed: "#83a598",
			onHold: "#fabd2f",
			dropped: "#fb4934",
			planToWatch: "#d3869b",
		},
		progress: {
			background: "#3c3836",
			active: "#b8bb26",
		},
		accent: "#fe8019",
	},

	monokai: {
		name: "Monokai",
		background: "#272822",
		text: {
			primary: "#f8f8f2",
			secondary: "#75715e",
			muted: "#49483e",
		},
		status: {
			watching: "#a6e22e",
			completed: "#66d9ef",
			onHold: "#e6db74",
			dropped: "#f92672",
			planToWatch: "#ae81ff",
		},
		progress: {
			background: "#3e3d32",
			active: "#a6e22e",
		},
		accent: "#fd971f",
	},
};

/**
 * @param {string} themeName
 * @returns {Theme}
 */
function get(themeName) {
	return themeMap[themeName] || themeMap.default;
}

/**
 * @param {string} themeName
 * @returns {boolean}
 */
function check(themeName) {
	return themeName in themeMap;
}

/**
 * @returns {string[]}
 */
function keys() {
	return Object.keys(themeMap);
}

export default {
	get,
	check,
	keys,
};