import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  container: {
    width:"100%",
    boxSizing: "border-box",
    margin: "5px 0px",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    maxWidth: 280,
    minWidth: 265
  },
  radio: {
  	width: "100%",
    display: 'flex',
  },
});

module.exports = {
  container: css(styles.container),
  radio: css(styles.radio)
};
