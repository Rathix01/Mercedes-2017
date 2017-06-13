import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  textInput: {
    padding: "5px",
    fontFamily: "Raleway",
    width: "100%",
    minHeight: "100px",
  },
  text: {
  	fontFamily: "Raleway",
  	display: "flex",
  	flexDirection: "row",
  	fontSize: "20px",
  },
  textColumn: {
  	flex: "1",
    boxSizing: "border-box",
    padding: "20px"
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
