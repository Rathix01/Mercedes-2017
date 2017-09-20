import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: 200,
  },
  field: {
  	width: 70,
  	marginRight: 3,
  	padding: 5,
    fontFamily: 'Raleway',
    fontSize: 18,
  }
});

module.exports = {
  container: css(styles.container),
  field: css(styles.field),
}