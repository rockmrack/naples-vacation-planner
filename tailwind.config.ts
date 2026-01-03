import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./content/**/*.{mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Naples-inspired color palette
                sand: {
                    50: "#fefdfb",
                    100: "#fcf9f3",
                    200: "#f8f0e3",
                    300: "#f3e4ce",
                    400: "#e8d1a8",
                    500: "#d9b87c",
                    600: "#c49a54",
                    700: "#a47a3b",
                    800: "#855e2f",
                    900: "#6b4a26",
                },
                ocean: {
                    50: "#f0f9ff",
                    100: "#e0f2fe",
                    200: "#b9e5fe",
                    300: "#7cd1fd",
                    400: "#36b9fa",
                    500: "#0c9feb",
                    600: "#007fc9",
                    700: "#0165a3",
                    800: "#065586",
                    900: "#0b476f",
                },
                sunset: {
                    50: "#fff7ed",
                    100: "#ffedd5",
                    200: "#fed7aa",
                    300: "#fdba74",
                    400: "#fb923c",
                    500: "#f97316",
                    600: "#ea580c",
                    700: "#c2410c",
                    800: "#9a3412",
                    900: "#7c2d12",
                },
                palm: {
                    50: "#f0fdf4",
                    100: "#dcfce7",
                    200: "#bbf7d0",
                    300: "#86efac",
                    400: "#4ade80",
                    500: "#22c55e",
                    600: "#16a34a",
                    700: "#15803d",
                    800: "#166534",
                    900: "#14532d",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                display: ["var(--font-playfair)", "Georgia", "serif"],
            },
            typography: {
                DEFAULT: {
                    css: {
                        maxWidth: "none",
                        color: "#374151",
                        a: {
                            color: "#0c9feb",
                            textDecoration: "underline",
                            "&:hover": {
                                color: "#007fc9",
                            },
                        },
                        h1: {
                            fontFamily: "var(--font-playfair), Georgia, serif",
                            fontWeight: "700",
                        },
                        h2: {
                            fontFamily: "var(--font-playfair), Georgia, serif",
                            fontWeight: "600",
                        },
                        h3: {
                            fontFamily: "var(--font-playfair), Georgia, serif",
                            fontWeight: "600",
                        },
                    },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};

export default config;
