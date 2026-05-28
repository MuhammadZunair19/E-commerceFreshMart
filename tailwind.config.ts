import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: "#1B4332",
        leaf: "#2D6A4F",
        fresh: "#52B788",
        cream: "#F8FFF8",
        ink: "#1A1A2E",
        muted: "#6B7280",
        warning: "#F4A261",
        danger: "#E63946"
      },
      boxShadow: {
        soft: "0 16px 45px rgba(27, 67, 50, 0.08)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
