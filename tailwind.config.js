module.exports = {
    purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: true, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "hover-gray": "rgba(217, 210, 255, 0.2)",
                "main-gray": "#101010",
                "norm-gray": "#888",
                "sorta-white": "#e0e0e0",
            },
            fontFamily: {
                firamono: ["Fira Mono"],
            },
        },
        screens: {
            "suprsm": "450px",
            "sm": "640px",
            "smd": "700px",
            "md": "768px",
            "amstlg": "900px",
            "lg": "1024px",
            "xl": "1280px",
            "2xl": "1440px",
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
