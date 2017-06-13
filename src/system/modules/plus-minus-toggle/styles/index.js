import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  container: {
    boxSizing: "border-box",
    position: "absolute",
    top: "30px",
    right: "20px",
    width: "50px",
  },
  button: {
    width: "31px",
    height: "31px",
    borderRadius: '30px',
    cursor: "pointer",
    background: Variables.colors.white,
  },
  arm: {
    borderRadius: "6px",
    opacity: "1",
    position: "absolute",
    background: "#000",
    transformOrigin: "50% 50%",
    top: "13px",
    left: "3px"
  },
  arm1: {
    height: "5px",
    width: "25px",
    transform: "rotate(90deg)",
  },
  arm2: {
    height: "5px",
    width: "25px",
  },
  animatedArm: {
    transformOrigin: "50% 50%",
    height: "31px",
  }
});

module.exports = {
  container: css(styles.container),
  button: css(styles.button),
  arm1: css(styles.arm, styles.arm1),
  arm2: css(styles.arm, styles.arm2),
  animatedArm: css(styles.animatedArm),
};
