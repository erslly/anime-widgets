// @ts-check

/**
 *
 * @param {{ html: string; css: string; }} param0
 * @returns
 */
function create({ html, css }) {
	return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xhtml="http://www.w3.org/1999/xhtml" width="1000" height="300">
      <foreignObject x="0" y="0" width="1000" height="300">
        <style>${css}</style>
        ${html}
      </foreignObject>
  </svg>`;
}

/**
 *
 * @param {string} title
 * @param {string} description
 * @returns
 */
function error(title, description) {
	return `<svg width="500" height="100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#FFCCCB" rx="15" ry="15"/>
      <text x="20" y="40" font-size="20" font-family="Arial, sans-serif" font-weight="bold" fill="#B22222">${title}</text>
      <text x="20" y="70" font-size="14" font-family="Arial, sans-serif" fill="#8B0000">${description}</text>
  </svg>`;
}

export default {
	create,
	error,
};
