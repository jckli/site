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
        fontFamily: {
            "jetbrains-mono": ["JetBrains Mono", "monospace"],
            "metropolis": ["MetropolisRegular", "sans-serif"],
            "metropolis-bold": ["MetropolisBold", "sans-serif"],
        },
        screens: {
            "navbar": "894px",
            "xxsm": "380px",
            "xsm": "460px",
            "sxsm": "510px",
            "sm": "640px",
            "md": "768px",
            "mmlg": "810px",
            "mlg": "894px",
            "lg": "1024px",
            "xl": "1280px",
            "1.5xl": "1440px",
            "2xl": "1536px",
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/line-clamp")],
};
