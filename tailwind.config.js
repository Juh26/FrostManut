/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1e3a5f',
        secondary: '#4a90d9',
        light: '#f8fafc',
        dark: '#0f172a'
      }
    },
  },
  plugins: [],
}