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
    top: 125,
    left: 0,
    padding: "0px 70px",
    fontSize: 18,

    '@media (max-width: 650px)': {
      padding: 0,
      top: 205,
    }
  },
  letsBegin: {
    margin: 10,
    fontSize: 24,

    '@media (max-width: 650px)': {
      fontSize: 24,
    }
  },
  title: {
    fontSize: 24,
    marginBottom: 10,

    '@media (max-width: 650px)': {
      fontSize: 18,
    }
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,

    '@media (max-width: 650px)': {
      marginLeft: 10,
      marginRight: 10,
    }
  },
  noLicenseButton: {
    background: Variables.colors.darkGray,
    height: 40,
    marginTop: 10,
    width: 180,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: "#fff",
    minWidth: 180,
    transition: "all 0.2",
    padding: 0,

    ":hover": {
      background: Variables.colors.blue,
    },

    ":active": {
      background: Variables.colors.gray,
    }
  },
  nextButton: {
    background: Variables.colors.blue,
    height: 40,
    marginTop: 10,
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
    
    ":hover": {
      opacity: 1
    },

    ":active": {
      background: Variables.colors.darkBlue,
    }
  },
  licenseFormContainer: {
    padding: "0px 40px",
    marginTop: 20,

    '@media (max-width: 650px)': {
      padding: "0px 10px",
      marginTop: 10,
    }
  },
  innerLicenseContainer: {
    background: "#ddd",
    borderRadius: 30,
    minHeight: 300,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "20px",
    boxSizing: 'border-box',
  },
  formColumnLeft: {
    flex: 1,

    '@media (max-width: 650px)': {
      flex: 0.8,
      transform: "scale(0.6)",
      transformOrigin: "0 0",
      position: "absolute",
      left: 30,
    }
  },
  formColumnRight: {
    flex: 2,
  },
  formTitle:{
    textAlign:"right",

    '@media (max-width: 650px)': {
      marginBottom: 35,
    }
  },
  area: {
    marginBottom: 5,
  },
  splitArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  shortInput:{
    maxWidth: 120,
    minWidth: 120,
  },
  noLicense: {
    paddingTop: 50,
  },
  noLicenseTitle: {
    fontSize: 18,
    marginBottom: 30,
  },
  noLicenseInput: {
    width: "100%",
    minWidth: "100%",
    border: "solid 1px black",
    padding: 8,
    fontSize: 14,
  },
  licenseNameInput: {
    boxSizing: "border-box",

    '@media (max-width: 650px)': {
      width: "100%",
      minWidth: "100%",
      marginRight: 20,
    }
  },
});


module.exports = {
  container: css(styles.container),
  letsBegin: css(styles.letsBegin),
  title: css(styles.title),
  licenseFormContainer: css(styles.licenseFormContainer),
  innerLicenseContainer: css(styles.innerLicenseContainer),
  buttons: css(styles.buttons),
  noLicenseButton: css(styles.noLicenseButton),
  nextButton: css(styles.nextButton),
  formColumnLeft: css(styles.formColumnLeft),
  formColumnRight: css(styles.formColumnRight),
  formTitle: css(styles.title, styles.formTitle),
  area: css(styles.area),
  splitArea: css(styles.splitArea),
  shortInput: css(styles.shortInput),
  noLicense: css(styles.noLicense),
  noLicenseTitle: css(styles.noLicenseTitle),
  noLicenseInput: css(styles.noLicenseInput),
  licenseNameInput: css(styles.licenseNameInput),
}