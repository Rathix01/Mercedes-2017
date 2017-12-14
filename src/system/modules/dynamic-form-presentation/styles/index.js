import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  container: {
    padding: 50
  },
  line: {
    width: "100%",
    height: 1,
  },
  diamonds: {
    margin: "-6px auto 0",
    width: 250,
    background: "#eee",
    display: "flex",
    flexDirection: "row",
    boxSizing: "border-box",
    padding: "0 80px",
    opacity: 1,
  },
  cell: {
    flex: 1,
  },
  largeDiamond: {
    height: 16,
    width: 16,
    transform: "rotateZ(-45deg)",
    margin: "-5px auto 0",
    opacity: 0.7,
    borderWidth: 1,
    borderStyle: "solid",
  },
  smallDiamond: {
    height: 8,
    width: 8,
    transform: "rotateZ(-45deg)",
    margin: "auto",
    opacity: 0.7,
    borderWidth: 1,
    borderStyle: "solid",
  },
  largeBall: {
    height: 16,
    width: 16,
    margin: "-5px auto 0",
    opacity: 0.7,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 16,
  },
  smallBall: {
    height: 8,
    width: 8,
    transform: "rotateZ(-45deg)",
    margin: "0px auto 0",
    opacity: 0.7,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 8,
  },
});

module.exports = {
  container: css(styles.container),
  line: css(styles.line),
  diamonds: css(styles.diamonds),
  cell: css(styles.cell),
  largeDiamond: css(styles.largeDiamond),
  smallDiamond: css(styles.smallDiamond),
  largeBall: css(styles.largeBall),
  smallBall: css(styles.smallBall),
};