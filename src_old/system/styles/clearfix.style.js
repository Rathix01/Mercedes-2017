const Aphrodite = require('aphrodite');
const StyleSheet = Aphrodite.StyleSheet;

const style = StyleSheet.create({
  clearFix: {
    ':after': {
      content: '" "',
      visibility: 'hidden',
      display: 'block',
      height: 0,
      clear: 'both'
    }
  }
});

module.exports = style;
