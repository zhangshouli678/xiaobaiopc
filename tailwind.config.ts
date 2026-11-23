import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Neutral ramp (OKLCH-inspired, off-black to off-white)
        surface: {
          950: "#0d0f11",
          900: "#161a1e",
          800: "#1e2329",
          700: "#252c34",
          600: "#2e3741",
          500: "#3d4a56",
          400: "#5a6a78",
          300: "#8294a3",
          200: "#b0bec9",
          100: "#d8e2ea",
          50:  "#f0f4f7",
          10:  "#f8fafb",
        },
        // Accent: vivid teal-cyan
        accent: {
          950: "#031d1a",
          900: "#063631",
          800: "#0a5549",
          700: "#0e7363",
          600: "#129f89",
          500: "#15bda3",   // primary
          400: "#2dd4bc",
          300: "#5eead4",
          200: "#99f6e4",
          100: "#ccfbf1",
          50:  "#f0fdf9",
        },
        // Semantic colors
        success: "#16a34a",
        warning: "#d97706",
        danger:  "#dc2626",
        info:    "#2563eb",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.875rem" }],
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "10px",
        lg: "14px",
        xl: "20px",
      },
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
        elevated: "0 4px 12px 0 rgb(0 0 0 / 0.12), 0 1px 4px -1px rgb(0 0 0 / 0.08)",
        dialog: "0 20px 48px 0 rgb(0 0 0 / 0.24)",
      },
      spacing: {
        "4.5": "1.125rem",
        "13": "3.25rem",
        "18": "4.5rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
