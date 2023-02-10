/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./{src,app}/**/*.{ts,tsx}"],
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [require("@tailwindcss/line-clamp")],
};
