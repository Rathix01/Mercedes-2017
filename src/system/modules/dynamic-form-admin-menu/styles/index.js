import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    top: 0,
    left: 205,
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
    width: 180,
    position: "relative",

    ":hover": {
      background: Variables.colors.blue,
    }
  },
  icon: {
    background: Variables.colors.white,
    color: Variables.colors.black,
    borderRadius: 30,
    width:30,
    height: 30,
    textAlign: 'center',
    boxSizing: "border-box",
    paddingTop: 4,
    paddingLeft: 4,
    marginRight: 20.
  },
  eventHandlerElement: {
    height: "100%",
    width: "100%",
    position: "absolute",
  }
});

module.exports = {
  content: css(styles.content),
  menuItem: css(styles.menuItem),
  icon: css(styles.icon),
  eventHandlerElement: css(styles.eventHandlerElement),
};