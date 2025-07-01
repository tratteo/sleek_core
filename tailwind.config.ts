import type { Config } from "tailwindcss";

export default <Partial<Config>>{
    plugins: [require("daisyui")],
    daisyui: {
        defaultTheme: "main",
        themes: [
            {
                main: {
                    primary: "#c3fe41",
                    "base-300": "#292929",
                    "base-200": "#171717",
                    "base-100": "#111111",
                    "base-content": "#ffffff",
                    info: "#20C0FFFF",
                    success: "#47db69",
                    warning: "#ffd51c",
                    error: "#ff3b31",
                },
            },
        ],
    },
};
