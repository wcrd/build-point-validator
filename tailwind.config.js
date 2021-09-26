module.exports = {
  purge: [
    './src/**/*.vue',
    './src/**/*.html',
    './src/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('colors'),
      'theme-main': '#264653',
      'theme-green': '#2a9d8f',
      'theme-yellow': '#e9c46a',
      'theme-orange': '#f4a261',
      'theme-red': '#e76f51'
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
