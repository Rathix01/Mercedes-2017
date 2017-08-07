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
      position:"absolute",
      height: "100%",
      marginBottom: 60,
  },
  formColumn: {
      flexGrow: 3,
      marginLeft: 40,
      position:"relative",
      height: "100%",
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
  },
    nextPrevBtns: {
    position: "fixed",
    bottom: -1,
    left: 0,
    width: '100%',
  },
  center:{
    width: "100%",
    maxWidth: 1200,
    margin: "0px auto",
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: 'rgba(200,200,200, 0.6)',
    border: `solid 1px ${ Variables.colors.gray }`,
  },
  btn: {
    fontSize: 20,
    fontFamily: 'Raleway',
    padding: "5px 40px",
  },
  nextBtn:{
    margin:"10px 5px",
  },
  prevBtn: {
    margin:"10px 5px",
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
  nextPrevBtns: css(styles.nextPrevBtns),
  center: css(styles.center),
  nextBtn: css(styles.nextBtn, styles.btn),
  prevBtn: css(styles.prevBtn, styles.btn),
}