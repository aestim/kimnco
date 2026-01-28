/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        manrope: ['Pretendard', 'sans-serif'],
        playfair: ['Pretendard', 'sans-serif'],
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
      colors: {
        midnight: {
          950: "#050505",
          900: "#0a0a0a",
          850: "#101010",
          800: "#121212",
          700: "#1a1a1a",
        },
        slate: {
          800: "#1e293b",
          700: "#334155",
          600: "#475569",
        },
        bronze: {
          100: "#fbf5e0",
          200: "#f5e8bd",
          300: "#ebd68e",
          400: "#e5c158",
          500: "#d4af37", // Primary Gold/Bronze
          600: "#b59026",
          700: "#916f1d",
        },
        silver: {
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
        },
        blue: { // Keeping basic blues just in case, but muting them
          50: "#DFDFF0",
          75: "#dfdff2",
          100: "#F0F2FA",
          200: "#010101",
          300: "#4FB7DD",
        },
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
    },
  },
  plugins: [],
};