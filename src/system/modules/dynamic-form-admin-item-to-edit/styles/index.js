import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  row: {
    padding: 4
  },
  btnRow: {
    display: 'flex',
    justifyContent: "flex-end",
    marginTop: 20
  }
});

module.exports = {
  row: css(styles.row),
  btnRow: css(styles.row, styles.btnRow),
}