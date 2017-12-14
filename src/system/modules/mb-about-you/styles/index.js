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
      top: 200,
    }
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  personalLine1: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: 10,
    width: "100%",
    flexDirection: "row",
  },
  personalLine2: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 10,
    width: "100%",
    flexDirection: "row",

    '@media (max-width: 650px)': {
    }
  },
  titleInput: {
    width: 120,
    minWidth:120,
    fontSize: 14,
    padding: 10,

    '@media (max-width: 650px)': {
      marginBottom: 10,
      minWidth: 80,
      width: 80,
    }
  },
  nameInput: {
    width: 170,
    minWidth:160,
    fontSize: 14,
    padding: 10,

    '@media (max-width: 650px)': {
      minWidth: 80,
      width: 80,
    }
  },
  dependantsInput: {
    width: 116,
    minWidth:100,
    fontSize: 14,
    marginRight: 8,
    padding: 10,
    boxSizing: "border-box",

    '@media (max-width: 650px)': {
      marginBottom: 10,
    }
  },
  employmentArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    '@media (max-width: 650px)': {
      flexDirection: "column",
    }
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
  maritalInput: {
    fontSize: 14,
    padding: 10,
    maxWidth: 120,
    minWidth: 120,
    
    '@media (max-width: 650px)': {
      position: 'absolute',
      top: 138,
      left: 70,
      width: 140,
      maxWidth: 140,
      minWidth: 140,
    }
  },
});


module.exports = {
  container: css(styles.container),
  title: css(styles.title),
  maritalInput: css(styles.maritalInput),
  personalLine1: css(styles.personalLine1),
  personalLine2: css(styles.personalLine2),
  titleInput: css(styles.titleInput),
  nameInput: css(styles.nameInput),
  dependantsInput: css(styles.dependantsInput),
  employmentArea: css(styles.employmentArea),
  employmentInput: css(styles.employmentInput),
  nextButton: css(styles.nextButton),
}