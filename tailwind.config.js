/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#C9A96E",
        dark: "#0f172a",
        glass: "rgba(255,255,255,0.08)"
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
};