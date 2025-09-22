/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: "#b32dff",
          50: "#f6ecff",
          100: "#eedbff",
          200: "#dfbaff",
          300: "#c99bff",
          400: "#b36bff",
          500: "#b32dff",
          600: "#8f16d9",
          700: "#6b0fb0",
          800: "#48087a",
          900: "#2c0348",
        },
      },
      backdropBlur: {
        xs: "4px",
      },
    },
  },
  plugins: [],
};
