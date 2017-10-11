import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width:"100%",
    boxSizing: "border-box",
    margin: "5px",
    display: "flex",
    flexDirection: "row",

    '@media (max-width: 600px)':{
      flexDirection: "column",
    }
  },
  label: {
  	flex: 1,
    flexGrow: 1,
    padding: "10px 20px",
  },
  inputAndValidation: {
  	flex: 1.5,
    flexGrow: 1.5,
  },
  input: {
  	width: "100%",
    display: 'flex',
    padding: "5px 20px",
  },
});

module.exports = {
  container: css(styles.container),
  label: css(styles.label),
  inputAndValidation: css(styles.inputAndValidation),
  input: css(styles.input),
};
