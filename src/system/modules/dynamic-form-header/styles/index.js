import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  formHeader: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    margin: "40px auto 0px",
    padding: "20px 20px",
    boxSizing: "border-box",
    fontFamily: "Raleway",
    backgroundColor: Variables.colors.blue,
  },
  formHeaderText: {
    maxWidth: 1200,
    width: "100%",
    color: Variables.colors.white,
    display: 'block',
    alignSelf: 'center',
  }
});

module.exports = {
  formHeader: css(styles.formHeader),
  formHeaderText: css(styles.formHeaderText)
};