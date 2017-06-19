import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  formText: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 1200,
    margin: "0px auto",
    padding: 5,
    boxSizing: "border-box",
    fontFamily: "Raleway",
  }
});

module.exports = {
  formText: css(styles.formText)
};