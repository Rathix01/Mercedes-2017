import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: "100%",
    height: "100%",
    position: "absolute",
    boxSizing: "border-box",
    background: "#000",
    top: 0,
    left:0,
  },
  innerContainer: {
    display: 'flex',
    flexDirection: "row",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 1200,
    margin: "0px auto",

    '@media (max-width: 650px)': {
      flexDirection: "column",
    },
  },
  leftColumn: {
    flex: 1,
    boxSizing: "border-box",
    height: "80%",
    color: Variables.colors.white,
    fontSize: 12,
    textAlign: "center",
    margin: 30,
    lineHeight: "30px",
    paddingTop: 70,
    fontFamily: "Lora",
    minWidth: 280,

    '@media (max-width: 650px)': {
      minWidth: "80%",
    }
  },
  rightColumn: {
    flex: 2,
    minWidth: 900,
    boxSizing: "border-box",
    height: "80%",
    position: "relative",
    zIndex: 1000,

    '@media (max-width: 650px)': {
      position: "fixed",
      transform: "translate3d(0px, -700px, 0px)",
      top: 0,
      left: 0,
      height: "100%",
      minWidth: "100%",
    }
  },
  formContainer: {
    background: Variables.colors.white,
    boxSizing: "border-box",
    display: "block",
    position:"absolute",
    height:"auto",
    bottom:0,
    top:0,
    left:0,
    right:0,
    margin:30,

    '@media (max-width: 650px)': {
      margin:0,
    }
  },
  closeButton: {
    background: Variables.colors.lightGray,
    position: "absolute",
    right: 60,
    top: 60,
    height: 45,
    width: 45,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    opacity: 0.8,

    ":hover": {
      opacity: 1,
    },

    ":active": {
      background: Variables.colors.gray,
    },

    '@media (max-width: 650px)': {
      top: 0,
      right: 0,
      position: "fixed",
      transform: "translate3d(0px, 700px, 0px)",
      opacity: 1,
      height: 40,
      width: 40,
    },
  },
  carName: {
    fontSize: 30,
    paddingBottom: 10,
    borderBottom: "solid 1px white",
    marginBottom:10,
    marginTop: 30,
  },
  labelAndValue: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    height: 24,
    fontFamily: 'Roboto',
  },
  total: {
      marginTop : 10,
  },
  sliders: {
    marginTop: 40,
    marginBottom: 20,
  },
  slider: {
    background: "#fff",
    "-webkit-appearance": "none",
    height: 4,

    "::-webkit-slider-thumb": {
        "-webkit-appearance": "none",
        appearance: "none",
        width: 15,
        height: 15,
        background: Variables.colors.blue,
        cursor: "pointer",
        webkitFilter: "drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.75))",
        marginTop: 0,
    },
  },
  termSelect:{
    maxWidth: 130,
    minWidth: 130,
    fontSize: 12,
    background: "#000",
    color: "#fff",
    border: "solid 1px white",
    outline: "none",
    padding: 10,
  },
  termOption: {

  },
  amountDisplay: {
    fontSize: 14,
    display: "flex",
    flexDirection: "row",
  },
  mobileApplyButton: {
    display: "none",
    background: Variables.colors.blue,
    width: "100%",
    margin: "40px auto",
    boxSizing: "border-box",
    padding: 10,
    opacity: 0.8,
    fontFamily: "Raleway",
    fontSize: 18,

    ":hover": {
      opacity: 1,
    },
    ":active": {
      opacity: 1,
      background: Variables.colors.darkBlue,
    },

    '@media (max-width: 650px)': {
      marginTop: 100,
      display: "block",
      cursor: "pointer",
    },
  }
});


module.exports = {
  container: css(styles.container),
  innerContainer: css(styles.innerContainer),
  leftColumn: css(styles.leftColumn),
  rightColumn: css(styles.rightColumn),
  formContainer: css(styles.formContainer),
  closeButton: css(styles.closeButton),
  carName: css(styles.carName),
  labelAndValue: css(styles.labelAndValue),
  total: css(styles.labelAndValue, styles.total),
  sliders: css(styles.sliders),
  slider: css(styles.slider),
  termSelect: css(styles.termSelect),
  termOption: css(styles.termOption),
  amountDisplay: css(styles.amountDisplay),
  mobileApplyButton: css(styles.mobileApplyButton),
}