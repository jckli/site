/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./{src,app}/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "text-color": "#9199a0",
                "text-darker": "#61686f",
                "text-darkest": "#494e53",
                "pink-accent": "#a385b3",
            },
        },
        FontFamily: {
            "jetbrains-mono": ["JetBrains Mono", "monospace"],
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
