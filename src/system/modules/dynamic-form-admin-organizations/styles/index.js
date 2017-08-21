import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  adminContainer: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      position:"absolute",
      height: "100%",
      marginBottom: 60,
  },
  orgAndForm: {
    marginTop: 10,
    maxWidth: 1200,
    margin: "0 auto",
    width: "100%",
    paddingTop: 10,
  },
  header: {
  	background: Variables.colors.blue,
  	position: "absolute",
  	top: 0,
  	left:0,
  	width: "100%",
  	margin: 0,
  	padding: 10,
  	boxSizing: "border-box",
  	color: Variables.colors.white,
  },
  inputArea: {
    padding: 10,
    display: "flex",
    fontFamily: "Raleway",
    flexDirection: "row",
    minHeight: 30,
  },
  inputAreaSection: {
    flex: 1,
    fontFamily: "Raleway",
  },
  newForm: {
    
  },
  createForm: {
    background: Variables.colors.green,
    color: Variables.colors.white,
    padding: 10,
    maxWidth: 265,
    boxSizing: "border-box",
    marginTop: 10,
    cursor: "pointer",


    ":hover": {
      background: Variables.colors.darkGreen,
    }
  },
  newForm: {
    background: Variables.colors.blue,
    color: Variables.colors.white,
    padding: 10,
    maxWidth: 265,
    boxSizing: "border-box",
    marginTop: 10,
    cursor: "pointer",
    fontFamily: "Raleway",

    ":hover": {
      background: Variables.colors.darkBlue,
    },
    ":active": {
      background: "#193048",
    }
  },
  btnArea: {
    padding: 2,
  },
  positiveNotification: {
    background: Variables.colors.green,
    color: Variables.colors.white,
    padding: 10,
    maxWidth: 245,
    margin: "10px 0px 5px",
    boxSizing: "boreder-box",
  },
  saving: {
    background: Variables.colors.darkGray,
    color: Variables.colors.white,
    padding: 10,
    maxWidth: 245,
    margin: "10px 0px 5px",
    boxSizing: "boreder-box",
  }
});

module.exports = {
  orgAndForm: css(styles.orgAndForm),
  adminContainer: css(styles.adminContainer),
  header: css(styles.header),
  inputArea: css(styles.inputArea),
  inputAreaSection: css(styles.inputAreaSection),
  createForm: css(styles.createForm),
  newForm: css(styles.newForm),
  btnArea: css(styles.btnArea),
  positiveNotification: css(styles.positiveNotification),
  saving: css(styles.saving),
}