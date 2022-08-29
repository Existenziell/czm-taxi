const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // false or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Nunito',
        ]
      },
      colors: {
        'brand': '#DBDBDB',
        'brand-dark': '#242424',
        'cta': '#D6A269',
        'logo': '#F3F3F3',
      },
    },
  },
  plugins: [],
}
