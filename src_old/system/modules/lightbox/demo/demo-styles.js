import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Buttons, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  container: {
    padding: "5px",
    minHeight: "200px"
  },
});

module.exports = {
  container: css(styles.container),
  btn: css(Buttons.btn, Buttons.btnBlueReverse),
};
