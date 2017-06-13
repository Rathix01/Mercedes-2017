import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  container: {
    width: "50%",
    fontSize: "20px",
    fontFamily: "Raleway",
    padding: "30px 0px",
    boxSizing: "border-box",
    position: "absolute",
    zIndex: "1",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    right: "0",
    top: "0",
  },
  list: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  button: {
    flex: "1",
    padding: "10px",
    margin: "2px",
    border: "solid 1px #fff",
    cursor: "pointer",
  },
  activeButton: {
    color: Variables.colors.mosaicGreenDark
  }
});

module.exports = {
  container: css(styles.container),
  button: css(styles.button),
  activeButton: css(styles.button, styles.activeButton, BackgroundColorsStyle.white),
  list: css(styles.list),
};
