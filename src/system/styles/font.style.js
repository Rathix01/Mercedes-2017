const Aphrodite = require('aphrodite');
const StyleSheet = Aphrodite.StyleSheet;

const Variables = require('./variables.style');

const styles = StyleSheet.create({
  heading1: {
    margin: 0,
    color: Variables.colors.black,
    fontFamily: Variables.fonts.titleFont,
    fontSize: 24,
    fontWeight: Variables.fontSizes.normal
  },

  heading2: {
    margin: 0,
    color: Variables.colors.black,
    fontFamily: Variables.fonts.normal,
    fontSize: '16px',
    fontWeight: Variables.fontSizes.bold
  },

  heading3: {
    margin: 0,
    color: Variables.colors.black,
    fontFamily: Variables.fonts.normal,
    fontWeight: Variables.fontSizes.bold,
    fontSize: '14px',
    textTransform: 'uppercase'
  },
  normal: {
    color: Variables.colors.black,
    fontFamily: Variables.fonts.normal,
    fontWeight: Variables.fontSizes.medium,
    fontSize: '14px'
  },
  subtle: {
    color: Variables.colors.grey
  }
});

module.exports = styles;
