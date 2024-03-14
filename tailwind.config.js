/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sanspp: ["Object Sans", "sans-serif"],
      },
      colors: {
        // Agrega o modifica colores según tus necesidades
        customCheckbox: "#6EE7B7",
        body: "#EFF0F1",
        link: "#A1A1A1",
        icons: "#D4D4D5",
      },
      boxShadow: {
        "box-header": "47px -28px 0px #191E25",
      },
      screens: {
        // => @media (min-width: 1280px) { ... }
        "3xl": "2360px",
      },
    },
  },
  plugins: [],
};
