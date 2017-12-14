import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  container: {
    minWidth:"100%",
    boxSizing: "border-box",
    margin: "0px",
    display: "flex",
    flexDirection: "row",
    position: "relative",
    maxWidth: 280,
    overflow: "hidden",

    '@media (max-width: 600px)':{
      flexDirection: "column",
    }
  },
  label: {
  	flex: 1,
    flexGrow: 1,
    height: "100%",
    width: "100%",
    padding: "15px 50px",
    zIndex: 0,
    cursor: "pointer",

  },
  inputAndValidation: {
  	flex: 1.5,
    flexGrow: 1.5,
  },
  input: {
    display: 'flex',
    margin: "9px 0px",
    zIndex: 1,
    position: "absolute",
    left: 20,
    top: 10,
    transform: "scale(1.4)",
  },
});

module.exports = {
  container: css(styles.container),
  label: css(styles.label),
  inputAndValidation: css(styles.inputAndValidation),
  input: css(styles.input),
};
