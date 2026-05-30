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
        display: ["Cormorant Garamond", "Georgia", "serif"],
      },
      colors: {
        ivory: {
          50: "#FBF8F1",
          100: "#F6F1E7",
          200: "#ECE4D4",
          300: "#DCD0B9",
        },
        espresso: {
          900: "#1C1714",
          800: "#26201B",
          700: "#3A322B",
        },
        gold: {
          400: "#C6A565",
          500: "#AC8A4E",
          600: "#8C6F3C",
        },
        taupe: {
          500: "#857667",
          600: "#6B5E50",
        },
      },
    },
  },
  plugins: [],
};
