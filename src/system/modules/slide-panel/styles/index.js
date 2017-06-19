import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  panel: {
    position: 'fixed',
    width: "100%",
    left: 0,
    bottom: -200,
  },
  content: {
    margin: "0px auto",
    maxWidth: 1200,
    width: "100%",
    minHeight: "200px",
    boxSizing: "border-box",
    fontFamily: "Raleway",
  }
});

module.exports = {
  panel: css(styles.panel),
  content: css(styles.content),
};