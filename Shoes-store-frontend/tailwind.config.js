/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('/AirJordans.jpg')",
      },
    },
    plugins: [require("flowbite/plugin")],
  },
};
