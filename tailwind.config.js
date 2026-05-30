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
          50: "#FCFBF9",
          100: "#F7F5F1",
          200: "#EDEAE3",
          300: "#DED9CF",
        },
        ink: {
          900: "#1F2933",
          800: "#2C3744",
          700: "#3B4754",
          600: "#566372",
          500: "#6B7785",
        },
        ocean: {
          50: "#EEF3F7",
          100: "#E2EAF0",
          400: "#5B86A6",
          500: "#3E6B8B",
          600: "#335A76",
          700: "#274860",
        },
      },
    },
  },
  plugins: [],
};
