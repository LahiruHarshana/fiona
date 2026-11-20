import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FDFBF7",
        cream: "#F6F2E6",
        sand: "#EFE8D6",
        paper: "#FFFFFF",
        olive: {
          900: "#393D30",
          700: "#5A614D",
          500: "#7C856B",
          300: "#A4AC94",
        },
        gold: {
          DEFAULT: "#CAAE69",
          deep: "#A98E4B",
          soft: "#DED0A9",
          light: "#EFE8D4",
        },
        sage: "#8B9472",
        "sage-soft": "#C5CBB4",
        fiona: {
          ivory: "#F4F0E7",
          ink: "#203C30",
          brand: "#244D39",
          accent: "#D7C5A7",
          sage: "#A3AA88",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
      },
      boxShadow: {
        botanical: "0 24px 80px rgba(57, 61, 48, 0.08)",
        insetLine: "inset 0 0 0 1px rgba(202, 174, 105, 0.28)",
        modern: "0 4px 24px rgba(57, 61, 48, 0.06), 0 1px 4px rgba(57, 61, 48, 0.04)",
        card: "0 2px 16px rgba(57, 61, 48, 0.05)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
