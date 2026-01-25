/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#80f20d",
        almond: "#F3E5D8",
        dark: "#3F2305",
      },
      fontFamily: {
        sans: ['"Manrope"', 'sans-serif'],
        serif: ['"DM Serif Display"', 'serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
