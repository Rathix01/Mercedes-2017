import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  orgAndForm: {
    marginTop: 10,
  },
  toolsContainer: {
    position: 'fixed',
    border: "solid 1px #ccc",
    marginTop: 10,
    padding: 10,
    boxSizing: "border-box",
    width: "350px",
    marginLeft: 10,
    paddingTop: 80,
    fontFamily: "Raleway",
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
    padding: 5,
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
  toolsContainer: css(styles.toolsContainer),
  header: css(styles.header),
  inputArea: css(styles.inputArea),
  createForm: css(styles.createForm),
  newForm: css(styles.newForm),
  btnArea: css(styles.btnArea),
  positiveNotification: css(styles.positiveNotification),
  saving: css(styles.saving),
}