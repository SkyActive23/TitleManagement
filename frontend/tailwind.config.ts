import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#FF7F7F', // Lighter shade of red
          DEFAULT: '#D32F2F', // Bold red as primary color
          dark: '#9A0007', // Darker red for hover states or emphasis
        },
        neutral: {
          light: '#E0E0E0', // Light silver for borders, backgrounds
          DEFAULT: '#B0B0B0', // Silver
          dark: '#505050', // Dark gray for contrast
        },
        background: {
          DEFAULT: '#1A1A1A', // Dark black for main background
          accent: '#333333', // Accent black/gray for cards or sections
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
