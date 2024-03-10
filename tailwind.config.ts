import type { Config } from "tailwindcss";

const config = {
    darkMode: ["class"],
    content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "xxsm": "380px",
                "xsm": "460px",
                "sxsm": "510px",
                "sm": "640px",
                "md": "768px",
                "mmlg": "810px",
                "mlg": "894px",
                "lg": "1024px",
                "xl": "1280px",
                "2xl": "1400px",
            },
        },
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
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
        fontFamily: {
            "metropolis": ["MetropolisRegular", "sans-serif"],
            "metropolis-bold": ["MetropolisBold", "sans-serif"],
            "sf-mono": ["SF Mono", "monospace"],
        },
    },
    plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
