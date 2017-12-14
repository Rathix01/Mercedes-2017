import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  question: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    maxWidth: 1200,
    margin: "0 auto",
    padding: 0,
    boxSizing: "border-box",
    fontFamily: "Raleway",
  },
  altQuestion: {
    backgroundColor: Variables.colors.lightGray,
  },
  label: {
    padding: "10px 20px",
    width: "30%",
  },
  input: {
    display: 'flex',
    justifyContent: "flex-end",
    padding: "5px 20px",
  }
});

module.exports = {
  question: css(styles.question),
  altQuestion: css(styles.question, styles.altQuestion),
  label: css(styles.label),
  input: css(styles.input),
};