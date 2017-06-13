import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  container: {
    maxWidth: "960px",
    margin: "0px auto",
  },
  altRow: {
    background: "#ddd",
  },
  headerText: {
    fontFamily: "Raleway",
  }
});

module.exports = {
  container: css(styles.container),
  altRow: css(styles.altRow),
  headerText: css(styles.headerText),
};
