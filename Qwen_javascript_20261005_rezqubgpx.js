/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'ocean-dark': '#0a1628',
        'ocean-blue': '#1e3a5f',
        'aqua': '#00d4ff',
        'coral': '#ff6b6b',
      },
    },
  },
  plugins: [],
}