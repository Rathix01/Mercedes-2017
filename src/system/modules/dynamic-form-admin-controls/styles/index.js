import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({

  basicControls: {
    position:"absolute",
    top: "30%",
    right: "5px",
    display: "flex",
    flexDirection: "row",
  },
  allControls: {
    minHeight: 150,
  },
  btn: {
    width: 30,
    height: 30,
    textAlign: "center",
    marginRight: 3,
    paddingTop: 7,
    color: Variables.colors.white,
    cursor: 'pointer',
    opacity: 0.6,
    borderRadius: 50,
    position: "relative",
    background: Variables.colors.gray,
    boxSizing: "border-box",
  },
  editBtn: {
    ":hover": {
      opacity: 1,
      backgroundColor: Variables.colors.darkBlue
    }
  },
  deleteBtn: {
    ":hover": {
      opacity: 1,
      backgroundColor: Variables.colors.red
    }
  },
  clickArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  }
});

module.exports = {
  basicControls: css(styles.basicControls),
  allControls: css(styles.allControls),
  editBtn: css(styles.btn, styles.editBtn),
  deleteBtn: css(styles.btn, styles.deleteBtn),
  clickArea: css(styles.clickArea),
}