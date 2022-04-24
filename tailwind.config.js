module.exports = {
    purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: true, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                "hover-gray": "rgba(217, 210, 255, 0.2)",
            },
            fontFamily: {
                firamono: ["Fira Mono"],
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
