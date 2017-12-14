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
    }
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  incomeRow: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: 60,
    width: "100%",
    flexDirection: "row",

    '@media (max-width: 650px)': {
      flexDirection: "column",
    }
  },
  titleInput: {
    width: 140,
    minWidth:140,
    fontSize: 14,
  },
  incomeInput: {
    width: 240,
    minWidth:180,
    fontSize: 14,
    padding: 10,
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
  employmentField: {
    '@media (max-width: 650px)': {
      width: 305,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  employmentInput: {
    width: 325,
    marginBottom: 10,
    boxSizing: "border-box",
    fontSize: 14,
    padding: 10,

    '@media (max-width: 650px)': {
      width: 305,
      marginLeft: 15,
    },
  },
  nextButton: {
    background: Variables.colors.blue,
    height: 40,
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
    }
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
    },

    '@media (max-width: 650px)': {
      marginLeft: 0,
      marginTop: 10,
    },
  },
});


module.exports = {
  container: css(styles.container),
  title: css(styles.title),
  incomeRow: css(styles.incomeRow),
  titleInput: css(styles.titleInput),
  incomeInput: css(styles.incomeInput),
  dependantsInput: css(styles.dependantsInput),
  employmentArea: css(styles.employmentArea),
  employmentField: css(styles.employmentField),
  employmentInput: css(styles.employmentInput),
  calcButton: css(styles.calcButton),
  nextButton: css(styles.nextButton),
}