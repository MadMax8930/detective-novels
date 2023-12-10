/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary-black': "#2B2C35",
        'primary-red': { DEFAULT: "#bf0101", 100: "#f9d6d6" },
        'primary-blue': { DEFAULT: "#2B59FF", 100: "#F5F8FF" },
        'primary-green': { DEFAULT: "#A7F3D0", 100: "#F0F9F0" },
        'white-main': "#fdfafa",
        'white-light': { DEFAULT: "rgba(59,60,152,0.03)", 100: "rgba(59,60,152,0.02)" },
        'admin-outer': "#151c2c",
        'admin-inner': "#182236",
        'admin-third': "#2e374a",
        'admin-btn': "#5d57c9",
        'admin-carousel': "#1c253a",
        'brown-dots': "#7e7676",
        grey: "#747A88",
      }
    },
  },
  plugins: [],
}
