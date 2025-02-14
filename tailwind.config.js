import flowbite from "flowbite/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      colors: {
        mainclr: "rgba(105,201,105,255)",
        mainclrbold: "rgba(8,172,10,255)",
      },

      fontFamily: {
        font: ['"Merriweather", serif'],
      },

      backgroundColor: {
        "custom-bg": "#f09433",
      },

      filter: {
        "custom-gradient-filter":
          "progid:DXImageTransform.Microsoft.gradient( startColorstr='#f09433', endColorstr='#bc1888', GradientType=1 )",
      },
      maxWidth: {
        "strap-sm": "540px",
        "strap-md": "720px",
        "strap-lg": "960px",
        "strap-xl": "1140px",
        "strap-xxl": "1320px",
      },
      screens: {
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
    },
  },
  plugins: [flowbite],
};
