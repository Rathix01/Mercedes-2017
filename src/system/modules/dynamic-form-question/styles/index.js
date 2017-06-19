import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  question: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    maxWidth: 1200,
    margin: "20px auto",
    padding: "20px 20xp 0px 20px",
    boxSizing: "border-box",
    fontFamily: "Raleway",
  },
  altQuestion: {
    backgroundColor: Variables.colors.lightGray,
  },
  label: {
    flexGrow: 1,
    padding: "10px 20px",
  },
  input: {
    flexGrow: 2,
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