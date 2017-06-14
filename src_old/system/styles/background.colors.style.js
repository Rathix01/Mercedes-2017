const Aphrodite = require('aphrodite');
const StyleSheet = Aphrodite.StyleSheet;

const Variables = require('./variables.style');

module.exports = StyleSheet.create({
  black: {
    backgroundColor: Variables.colors.black
  },
  green: {
    backgroundColor: Variables.colors.green
  },
  darkGreen: {
    backgroundColor: Variables.colors.darkGreen
  },
  mosaicGreen:{
    backgroundColor: Variables.colors.mosaicGreenMain
  },
  mosaicGreenLight:{
    backgroundColor: Variables.colors.mosaicGreenLight
  },
  mosaicGreenDark:{
    backgroundColor: Variables.colors.mosaicGreenDark
  },
  gray: {
    backgroundColor: Variables.colors.gray
  },
  lightGray: {
    backgroundColor: Variables.colors.lightGray
  },
  darkGray: {
    backgroundColor: Variables.colors.darkGray
  },
  white: {
    backgroundColor: Variables.colors.white
  },
  red: {
    backgroundColor: Variables.colors.red
  },
  red: {
    backgroundColor: Variables.colors.darkRed
  },
  orange: {
    backgroundColor: Variables.colors.orange
  },
  blue: {
    backgroundColor: Variables.colors.blue
  },
  darkBlue: {
    backgroundColor: Variables.colors.darkBlue
  },
  yellow: {
    backgroundColor: Variables.colors.yellow
  },
  darkYellow: {
    backgroundColor: Variables.colors.darkYellow
  }
});
