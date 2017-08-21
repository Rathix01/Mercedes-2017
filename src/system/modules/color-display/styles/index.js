import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  colorDisplayContainer: {
      height: 40,
      width: 150,
      border: `solid 1px ${ Variables.colors.darkGray }`
  },
  color: {
    width: "100%",
    height: "100%",
  }
});

module.exports = {
  colorDisplayContainer: css(styles.colorDisplayContainer),
  color: css(styles.color),
}