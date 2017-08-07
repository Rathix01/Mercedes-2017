import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  formHeader: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 1200,
    margin: "0px auto",
    padding: "10px 20px",
    boxSizing: "border-box",
    fontFamily: "Raleway",
    backgroundColor: Variables.colors.blue,
    color: Variables.colors.white,
  }
});

module.exports = {
  formHeader: css(styles.formHeader)
};