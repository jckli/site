/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./{src,app}/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                "box": "#181a1b",
                "borcol": "#212324",
                "text-lighter": "#d3d3d3",
                "text-color": "#9199a0",
                "text-darker": "#61686f",
                "text-darkest": "#494e53",
                "pink-accent": "#a385b3",
            },
        },
        fontFamily: {
            "metropolis": ["MetropolisRegular", "sans-serif"],
            "metropolis-bold": ["MetropolisBold", "sans-serif"],
            "sf-mono": ["SF Mono", "monospace"],
        },
    },
    variants: {
        extend: {},
    },
};
