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
    padding: "80px 70px 0px",
    fontSize: 18,

    '@media (max-width: 650px)': {
      padding: 10,
      top: 150,
    }
  },
  lookupArea: {
    position: "absolute",
    zIndex: 1000,
    top: 5,

    '@media (max-width: 650px)': {
      top: 40,
      width: "100%",
      left: 0,
      padding: 10,
      boxSizing: "border-box",
    }
  },
  location: {
    position: "absolute",
    background: "#fff",
    height: 40,
    width: 41,
    left: 1,
    top: 38,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",

    '@media (max-width: 650px)': {
      left: 11,
    }
  },
  searchArea: {
    marginBottom: 40,
    paddingLeft: 3,

    '@media (max-width: 650px)': {
      paddingLeft: 2,
      boxSizing: "border-box",
      marginRight: 10,
    }
  },
  searchInput: {
    width: 620,
    height: 26,

    '@media (max-width: 650px)': {
      width: "100%",
      boxSizing: "border-box",
      marginRight: 10,
    }
  },
  dealerTitle: {
    fontSize: 24,
    marginBottom: 10,
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
    opacity: 0.8,
    padding: 0,
    
    ":hover": {
      opacity: 1
    },

    ":active": {
      background: Variables.colors.darkBlue,
    },

    '@media (max-width: 650px)': {
      width: "100%",
    }
  },
  addressDisplay: {
    background: "#EBEBEB",
    height: 220,
    marginBottom: 20,
    position: "relative",
    margin: "20px 35px 0px",

    '@media (max-width: 650px)': {
      margin: "125px 10px 0px",
    }
  },
  envelopeWindow: {
    position: "absolute",
    bottom: 20,
    left: 20,
    width: "60%",
    background: "#fff",
    height: 130,
    borderRadius: 10,
  },
  envelopeLogo: {
    position: "absolute",
    top: 35,
    right: 10,
  },
  addressStatus: {
    width:160,
    minWidth: 100,
    fontSize: 14,
    height: 40,
    border: "solid 1px black",

    '@media (max-width: 650px)': {
      width: "100%",
    }
  },
  years: {
    width:40,
    minWidth: 40,
    fontSize: 14,
    height: 26,
    border: "solid 1px black",
  },
  addressBottomSection: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",

    '@media (max-width: 650px)': {
      flexDirection: "column",
      marginTop: 40,
    }
  },
  addressBottomSectionField: {
    paddingTop: 10,
    fontSize: 14,

    '@media (max-width: 650px)': {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    }
  },
});


module.exports = {
  container: css(styles.container),
  lookupArea: css(styles.lookupArea),
  location: css(styles.location),
  searchArea: css(styles.searchArea),
  searchInput: css(styles.searchInput),
  nextButton: css(styles.nextButton),
  dealerTitle: css(styles.dealerTitle),
  addressDisplay: css(styles.addressDisplay),
  envelopeWindow: css(styles.envelopeWindow),
  envelopeLogo: css(styles.envelopeLogo),
  addressStatus: css(styles.addressStatus),
  years: css(styles.years),
  addressBottomSection: css(styles.addressBottomSection),
  addressBottomSectionField: css(styles.addressBottomSectionField),
}