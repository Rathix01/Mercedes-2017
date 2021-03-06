import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  main: {
    maxWidth: "1200px",
    minWidth: "420px",
    width: "100%",
    margin: "0px auto",
  },
  header: {
    padding: '5px 10px',
    color: '#fff',
    fontFamily: "Raleway",
    margin: "0px auto 5px",
    boxSizing: "border-box",
    zIndex: "100",
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
  },
  body: {
  	zIndex: "1",
  	position: "relative",
  	marginTop: "100px",
  }
});

module.exports = {
  main: css(styles.main),
  header: css(styles.header, BackgroundColorsStyle.mosaicGreenDark),
  body: css(styles.body),
};
