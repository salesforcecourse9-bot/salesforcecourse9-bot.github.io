/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: ["Lora", "Georgia", "serif"],
      },
      colors: {
        sand: {
          50:  "#FDFAF6",
          100: "#F5EFE3",
          200: "#EAE0CE",
          300: "#D8C8B2",
        },
        ink: {
          900: "#1A130C",
          800: "#2E2218",
          700: "#47362A",
          600: "#5E4F3E",
          500: "#7A6B5A",
        },
        ocean: {
          50:  "#EDF5F2",
          100: "#D4EBE3",
          400: "#4A9080",
          500: "#2D7264",
          600: "#1F5A4F",
          700: "#14413A",
        },
      },
    },
  },
  plugins: [],
};
