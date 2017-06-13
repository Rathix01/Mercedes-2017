import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  header: {
    padding: 10,
    color: '#fff',
    fontFamily: "Raleway",
    zIndex: "1",
    borderBottom: "solid 1px #eee",
    opacity: "0.9",
    transition: "opacity 0.2s",
    cursor: "pointer",
    display: "flex",
    backgroundColor: Variables.colors.green,

    ":hover": {
      opacity: "1",
    }
  },

  headerComponents: {
    flex: 1
  },

  title: {
    fontSize: 30,
    marginTop: 3,
  },

  initBubble: {
    color: Variables.colors.green,
    backgroundColor: Variables.colors.white,
    maxWidth: 40,
    width: 40,
    height: 40,
    borderRadius: 40,
    textAlign: "center",
    boxSizing: "border-box",
    paddingTop: 10,
    marginRight: 20,
  }
});

module.exports = {
  header: css(styles.header),
  title: css(styles.title, styles.headerComponents),
  initBubble: css(styles.initBubble, styles.headerComponents),
};