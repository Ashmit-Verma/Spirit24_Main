/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'work-sans': ['Work Sans', 'sans-serif'],
        'fireSans': ['FireSans', 'sans-serif'],
        'leagueGothic':['LeagueGothic','sans-serif'],
      },
    },
  },
  plugins: [],
}
