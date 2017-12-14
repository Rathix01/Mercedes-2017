import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
    width: "100%",
    flexDirection: "column",
    position: "absolute",
    boxSizing: "border-box",
    top: 160,
    left: 0,
    padding: "0px 70px",
    fontSize: 18,

    '@media (max-width: 650px)': {
      top: 205,
      padding: "0px 20px",
    },
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  incomeRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: "100%",
    flexDirection: "row",

    '@media (max-width: 650px)': {
      flexDirection: "column",
      marginBottom: 0,
    },
  },
  emailInput: {
    width: "100%",
    minWidth:140,
    fontSize: 14,
    padding: 10,

    '@media (max-width: 650px)': {
      boxSizing: "border-box",
      marginRight: 10,
    },
  },
  incomeInput: {
    width: 300,
    minWidth:180,
    fontSize: 14,
    padding: 10,

    '@media (max-width: 650px)': {
      boxSizing: "border-box",
      marginRight: 10,
      marginBottom: 10,
      width: "100%",
    },
  },
  dependantsInput: {
    width: 126,
    minWidth:100,
    fontSize: 14,
    marginRight: 3,
  },
  employmentArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  employmentInput: {
    width: 325,
    marginBottom: 10,
    boxSizing: "border-box",
    fontSize: 14,
    padding: 10,
  },
  nextButton: {
    background: Variables.colors.blue,
    height: 40,
    marginTop: 15,
    width: 180,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "right",
    cursor: "pointer",
    color: "#fff",
    minWidth: 180,
    transition: "all 0.2",
    opacityL: 0.8,
    padding: 0,
    position: "absolute",
    right: 70,
    
    ":hover": {
      opacity: 1
    },

    ":active": {
      background: Variables.colors.darkBlue,
    },

    '@media (max-width: 650px)': {
      position: "relative",
      right: 0,
      width: "100%",
    },
  },

  calcButton: {
    background: Variables.colors.darkGray,
    height: 40,
    width: 280,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "right",
    cursor: "pointer",
    color: "#fff",
    minWidth: 180,
    transition: "all 0.2",
    opacityL: 0.8,
    padding: 0,
    marginLeft: 40,

    
    ":hover": {
      opacity: 1
    },

    ":active": {
      background: Variables.colors.darkGray,
    }
  },
  theSmallPrint: {
    fontSize: 10,
  },
  term: {
    marginBottom: 4,
  },
  acceptTermsRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: "100%",
    flexDirection: "row",
    marginTop: 10,

    '@media (max-width: 650px)': {
      flexDirection: "column",
    },
  },
  title2: {
    fontSize: 24,
    marginBottom: 20,
    marginTop: 30,
  },
});


module.exports = {
  container: css(styles.container),
  title: css(styles.title),
  incomeRow: css(styles.incomeRow),
  emailInput: css(styles.emailInput),
  incomeInput: css(styles.incomeInput),
  dependantsInput: css(styles.dependantsInput),
  employmentArea: css(styles.employmentArea),
  employmentInput: css(styles.employmentInput),
  calcButton: css(styles.calcButton),
  nextButton: css(styles.nextButton),
  theSmallPrint: css(styles.theSmallPrint),
  term: css(styles.term),
  acceptTermsRow: css(styles.acceptTermsRow),
  title2: css(styles.title2),
}