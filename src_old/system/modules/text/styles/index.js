import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  textArea: {
    padding: "5px",
    fontFamily: "Raleway",
    width: "100%",
    minHeight: "100px",
    fontSize: "20px",
    boxSizing: "border-box",
    background: "transparent",
    border: "none",
  },
});

module.exports = {
  textArea: css(styles.textArea),
};
