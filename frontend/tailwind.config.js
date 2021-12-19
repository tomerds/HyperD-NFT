const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      cyan: colors.cyan,
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      yellow: colors.amber,
      green: colors.green,
      red: colors.red,
      purple: colors.purple
    },
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive']
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
