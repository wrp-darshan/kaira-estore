import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Enables dark mode using 'class' strategy
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        marcellus: ["Marcellus", "Roboto", "sans-serif"],
        body: ["Jost", "Roboto", "sans-serif"],
      },
      colors: {
        light: {
          DEFAULT: "#F1F1F0",
          text: "#111",
          border: "#dee2e6",
        },
        dark: {
          DEFAULT: "#181A1B",
          deep: "#121315",
          text: "#E4E4E4", 
          border: "#33383D",
        },
        primary: {
          DEFAULT: "#8C907E",
          light: "#A1A598",
          dark: "#6F7360",
        },
        secondary: {
          DEFAULT: "#6c757d",
          light: "#8A9298",
          dark: "#52595E",
        },
        gray: {
          DEFAULT: "#7A7F85", 
          light: "#A1A6AC",
          dark: "#585D63",
        },
        header:{
          DEFAULT: "#000000a6",
          dark: "#ffffffd9",
        },
        graydark: "#3A3F44", 
        default: "#000000E6", 
        bodycolor: "#5E6164", 
        linkcolor: "#E4E4E4",
      },
      fontSize: {
        body: "18px",
      },
      letterSpacing: {
        body: "0.03rem",
      },
      keyframes: {
        rotation: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        rotation: "rotation 50s infinite linear",
      },
      screens: {
        xs: "425px",
        sm: "576px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        xxl: "1400px",
      },
    },
  },
  plugins: [],
} satisfies Config;
