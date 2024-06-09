import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        app_gray_light: {
          100: "#F7F9FB",
          200: "#D9D9D9",
          300: "#8D8D8F"
        },
        app_gray_dark: {
          100: "#292929",
          200: "#1B1B1B",
          300: "#111111"
        },
        app_ton: "#0098EA",
        app_blue: "#007AFF", 
        app_separator: "#C8C7CB"
      },
      fontSize: {
        hugetitle: [
          "64px",
          {
            lineHeight: "77px",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        largetitle: [
          "32px",
          {
            lineHeight: "39px",
            letterSpacing: "-0.02em",
            fontWeight: "700",
          },
        ],
        title: [
          "24px",
          {
            lineHeight: "29px",
            letterSpacing: "-0.02em",
            fontWeight: "600",
          },
        ],
        body: [
          "20px",
          {
            lineHeight: "24px",
            letterSpacing: "-0.02em",
            fontWeight: "500",
          },
        ],
        secondarybody: [
          "16px",
          {
            lineHeight: "19px",
            letterSpacing: "-0.02em",
            fontWeight: "400",
          },
        ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), "prettier-plugin-tailwindcss"],
} satisfies Config;

export default config;
