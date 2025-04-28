// @ts-check
const settings = {
	port: 3000,
	api: {
		url: process.env.NODE_ENV === "development" ? "http://localhost:3745" : "...",
	},
	jwt: "vL6uYX8pQe23FrzK9dWtb5cMmZo1HV7G",
};

export default settings;