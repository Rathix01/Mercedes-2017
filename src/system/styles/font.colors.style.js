const Aphrodite = require('aphrodite');
const StyleSheet = Aphrodite.StyleSheet;

const Variables = require('./variables.style');

module.exports = StyleSheet.create({
  black: {
    color: Variables.colors.black
  },
  green: {
    color: Variables.colors.green
  },
  grey: {
    color: Variables.colors.grey
  },
  white: {
    color: Variables.colors.white
  }
});
