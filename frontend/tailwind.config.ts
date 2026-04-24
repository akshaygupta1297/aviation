import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // brand: {
                goldDark: "#BFA766",
                gold: "#E4C779",
                goldLight: "#F2E3BC",

                green30: "#75D9A9",
                green20: "#C2EED9",
                green10: "#ECFAF3",

                gray30: "#53524E",
                gray20: "#84827E",
                gray10: "#BBBAB7",
                grayBg: "#F4F3F3",

                dark: "#222222",
                dark2: "#2B2B2B",
                gray: "#6B6B6B",
                white1: "#F5F5F0",
                // },
            },
        },
    },
    plugins: [],
};

export default config;