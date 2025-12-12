/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [
    // DaisyUI is imported via CSS plugin in v4, config here controls themes
  ],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
        },
      },
    ],
    darkTheme: "dark",
  },
};
