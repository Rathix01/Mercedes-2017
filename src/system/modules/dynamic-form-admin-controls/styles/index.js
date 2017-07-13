import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({

  basicControls: {
    position:"absolute",
    top: "15px",
    right: "5px",
  },
  allControls: {
    minHeight: 150,
  },
});

module.exports = {
  basicControls: css(styles.basicControls),
  allControls: css(styles.allControls),
}