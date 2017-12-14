import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  container: {
    background: "#fff",
    boxSizing: "border-box",
    display: "block",
    position:"absolute",
    height:"auto",
    bottom:0,
    top:0,
    left:0,
    right:0,
    margin:3,
    overflow: "hidden",

    '@media (max-width: 650px)': {
      margin: "0px"
    }
  },
  imageContainer: {
    display:"inline-flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 65,
    transformOrigin: "100% 0%",

    '@media (max-width: 650px)': {
      margin: "0px auto",
      width: "300px",
      display: "block",
      objectFit: "contain",
    }

  },
  applyButton: {
    background: Variables.colors.blue,
    color: "#fff",
    maxWidth: 310,
    width: "100%",
    margin: "20px auto",
    boxSizing: "border-box",
    padding: 10,
    opacity: 0.8,
    textAlign: "center",
    fontFamily: "Raleway",
    cursor: "pointer",
    fontSize: 16,

    ":hover": {
      opacity: 1,
    },

    ":active": {
      opacity: 1,
      background: Variables.colors.darkBlue,
    },
  },
  formContainer: {
    margin: "0px 70px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    minHeight: 220,
    fontFamily: "Raleway",
    fontSize: 18,

    '@media (max-width: 650px)': {
      margin: "0px 20px",
    }
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    boxSizing: "border-box",
  },
  footerText: {
    margin: "20px 70px",
    borderTop: "solid 1px black",
    padding: "10px",
    fontFamily: "Raleway",
    fontSize: 12,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: 60,

    '@media (max-width: 650px)': {
      margin: "20px",
    }
  },
  intro1: {
    '@media (max-width: 650px)': {
      display: "none",
    }
  },
  outro: {
    position: "absolute",
    top: 370,
    width: "100%",

    '@media (max-width: 650px)': {
      display: "none",
    }
  },
  greatChoice: {
    fontFamily: "Lora",
    fontSize: 60,
    marginBottom: 10
  },
  navigation: {
    position: "absolute",
    top: 70,
    left: 80,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    minWidth: 300,
    height: 40,
    background: "#000",
    color: "#fff",
    boxSizing: "border-box",
    fontSize: 20,
    fontFamily: "Raleway",
    paddingTop:6,

    '@media (max-width: 650px)': {
      top: 0,
      left: 0,
      width: "95%",
    }
  },
  letsStart: {
    position: "absolute",
    top: 150,
    boxSizing: "border-box",
    maxWidth: "95%",
    paddingRight: 70,
    fontSize: 16,

    '@media (max-width: 650px)': {
      top: 0,
      paddingRight: 10,
    }
  },
  beforeYouApply: {
    marginTop:40,
    marginBottom: 20,
    fontSize:40,

    '@media (max-width: 650px)': {
      fontSize: 30,
      marginBottom: 10,
    }
  },
  fiveMins: {
    padding: "20px 0px",
    borderBottom: "solid 1px black",
    marginBottom: 20,
  },
  licence: {
    marginBottom: 20,
    fontSize: 24,
  },
  letsStartInputs: {
    display:"flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,

    '@media (max-width: 650px)': {
      flexDirection: "column",
    }
  },
  input: {
    border: "solid 1px black",
    fontSize: 12,
    padding: 8,
    height: 32,
    boxSizing: "border-box",

    '@media (max-width: 650px)': {
      marginBottom: 10,
      width: "100%",
    }
  },
  longInput:{
    width: 400,
  },
  letsStartButton: {
    maxWidth: 200,
    position: "absolute",
    right: 70,

    '@media (max-width: 650px)': {
      maxWidth: "100%",
      width: "100%",
      position: "relative",
      right: 0,
    }
  },
  carImg: {
    '@media (max-width: 650px)': {
      maxWidth: "100%",
      marginTop: 50,
    }
  },
  finishAndClose: {
    background: Variables.colors.blue,
    height: 40,
    width: 180,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: "#fff",
    minWidth: 180,
    transition: "all 0.2",
    opacityL: 0.8,
    padding: 0,
    position: "absolute",
    right: 140,
    
    ":hover": {
      opacity: 1
    },

    ":active": {
      background: Variables.colors.darkBlue,
    },
  },
  smallPrint: {
      fontSize: 14, 
  }
});


module.exports = {
  container: css(styles.container),
  imageContainer: css(styles.imageContainer),
  formContainer: css(styles.formContainer),
  footerContainer: css(styles.footerContainer),
  footerText: css(styles.footerText),
  applyButton: css(styles.applyButton),
  intro1: css(styles.intro1),
  outro: css(styles.outro),
  greatChoice: css(styles.greatChoice),
  navigation: css(styles.navigation),
  letsStart: css(styles.letsStart),
  beforeYouApply: css(styles.beforeYouApply),
  fiveMins: css(styles.fiveMins),
  licence: css(styles.licence),
  letsStartInputs: css(styles.letsStartInputs),
  longInput: css(styles.input, styles.longInput),
  input: css(styles.input),
  carImg: css(styles.carImg),
  letsStartButton: css(styles.applyButton, styles.letsStartButton),
  finishAndClose: css(styles.finishAndClose),
  smallPrint: css(styles.smallPrint),
};