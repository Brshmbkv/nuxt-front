const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  mode: 'jit',
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: colors.cyan,
        gray: colors.trueGray
      },
      fontFamily: {
        body: ['Nunito', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
};
