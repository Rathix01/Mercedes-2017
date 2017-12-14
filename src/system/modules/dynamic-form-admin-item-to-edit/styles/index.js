import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  row: {
    padding: 4
  },
  idRow: {

  },
  btnRow: {
    display: 'flex',
    marginTop: 20
  },
  createForm: {
    background: Variables.colors.green,
    color: Variables.colors.white,
    padding: 10,
    maxWidth: 265,
    boxSizing: "border-box",
    marginTop: 10,
    cursor: "pointer",

    ":hover": {
      background: Variables.colors.darkGreen,
    }
  },
  newForm: {
    background: Variables.colors.blue,
    color: Variables.colors.white,
    padding: 10,
    maxWidth: 265,
    width: "100%",
    boxSizing: "border-box",
    marginTop: 10,
    cursor: "pointer",

    ":hover": {
      background: Variables.colors.darkBlue,
    }
  },
});

module.exports = {
  row: css(styles.row),
  idRow: css(styles.row, styles.idRow),
  btnRow: css(styles.row, styles.btnRow),
  newForm: css(styles.newForm),
}