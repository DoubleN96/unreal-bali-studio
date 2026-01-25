/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3D2817",
        almond: "#EAE0D5",
        dark: "#1A1A1A",
        gray: {
          light: "#A8A8A8",
          silver: "#B8B1A8"
        },
        celeste: "#7AB5D6",
      },
      fontFamily: {
        sans: ['"Montserrat"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
