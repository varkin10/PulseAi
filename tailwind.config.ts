import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ECFAF5",
          100: "#D1F2E4",
          200: "#A3E5C9",
          300: "#6DD3AA",
          400: "#3FBA8A",
          500: "#1F9E6E",
          600: "#15805A",
          700: "#106648",
          800: "#0D513A",
          900: "#0A3D2C",
        },
        cream: {
          50: "#FDFCF9",
          100: "#FAF7F0",
          200: "#F5EFE3",
        },
      },
    },
  },
  plugins: [],
};
export default config;
