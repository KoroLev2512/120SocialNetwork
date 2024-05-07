import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
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
      colors: {
        TONColor: "#0098EA",
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
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
