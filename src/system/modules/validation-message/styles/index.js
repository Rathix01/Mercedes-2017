import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width:"100%",
    boxSizing: "border-box"
  },

});

module.exports = {
  container: css(styles.container),
};
