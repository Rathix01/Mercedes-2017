import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  container: {

  },
  list: {
    listStyle: "none",
    padding: "10px",
  },
  question: {
    marginBottom: "10px",
    fontSize: "20px",
  },
  answer: {
    marginBottom: "30px",
    fontSize: "16px",
    color: "#555",
  },
});

module.exports = {
  container: css(styles.container),
  list: css(styles.list),
  question: css(styles.question),
  answer: css(styles.answer),
};
