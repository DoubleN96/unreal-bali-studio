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
        almond: "#f7f8f5",
      },
      fontFamily: {
        sans: ['"Google Sans Text"', 'sans-serif'],
        serif: ['"Space Grotesk"', 'sans-serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
