import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  section: {
    maxWidth: "1200px",
    margin: "0px auto",
    padding: '0px',
    position: "relative",
    overflow: "hidden",
    zIndex: "0",
    boxSizing: "border-box",
  },
  adminContainer: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
  },
  formColumn: {
      flexGrow: 3,
      marginLeft: 40,
  },
  toolsColumn: {
      flexGrow: 1,
      minWidth: 250,
      boxSizing: "border-box",
      position: "relative",
      minHeight: 500,
  },
  adminHeader: {
      background: Variables.colors.black,
      color: Variables.colors.white,
      fontFamily: "Raleway",
      margin: 0,
      overflow: "hidden",
      paddingLeft: 20
  },
  saveForm: {
    width: 400,
    margin: "100px auto",
    border: "solid 1px #ccc",
    padding: 40,
    position: "relative",
    overflow: "hidden",
  },
  saveFormHeader: {
    background: Variables.colors.blue,
    color: Variables.colors.white,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    padding: 20,
    boxSizing: "border-box",
    marginBottom: 10,
  },
  saveFormBody: {
    marginTop: 20,
  }
});

module.exports = {
  section: css(styles.section),
  adminContainer: css(styles.adminContainer),
  formColumn: css(styles.formColumn),
  toolsColumn: css(styles.toolsColumn),
  adminHeader: css(styles.adminHeader),
  saveForm: css(styles.saveForm),
  saveFormHeader: css(styles.saveFormHeader),
  saveFormBody: css(styles.saveFormBody),
}