import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  textInput: {
    padding: "5px",
  },
  text: {
  	fontFamily: "Raleway",
  	display: "flex",
  	flexDirection: "row",
  	fontSize: "20px",
  },
  textColumn: {
  	flex: "1",
  },
  textDisplay: {
  }
});

module.exports = {
  textInput: css(styles.textInput),
  text: css(styles.text),
  textColumn: css(styles.textColumn),
  textDisplay: css(styles.textColumn, styles.textDisplay),
};
