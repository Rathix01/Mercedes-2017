import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  row: {
    display: "flex",
  },
  altRow: {
    display: "flex",
  },
  cell: {
  	flex: 1,
  	border: "solid 1px #ccc",
  	margin: 4,
  },
  headerRow: {
  	fontSize: 25,
  	padding: 10,
  	fontFamily: "Raleway",
  	backgroundColor: Variables.colors.lightGray,
  }
});

module.exports = {
  row: css(styles.row),
  altRow: css(styles.altRow),
  cell: css(styles.cell),
  headerRow: css(styles.headerRow),
};