import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    top: 0,
    right: 5,
    width: "70%",
    display: "flex",
    flexDirection: "row",
    height: "100%",
  },
  menuItem: {
    fontSize: 18,
    padding: 10,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 150,

    ":hover": {
      background: Variables.colors.blue,
    }
  }
});

module.exports = {
  content: css(styles.content),
  menuItem: css(styles.menuItem),
};