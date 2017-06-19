import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  textInput: {
    minWidth: 250,
    padding: 5,
    fontFamily: "Raleway",
    fontSize: 18,
  },
});

module.exports = {
  textInput: css(styles.textInput)
};