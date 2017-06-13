import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: "400px",
    fontSize: "18px",
    fontFamily: "Raleway",
    padding: "30px 40px 80px 40px",
    boxSizing: "border-box",
    position: "relative",
    zIndex: "1",
    background: "#555",
    color: "#fff",
    overflow: "hidden",
  },
  title: {
    maxWidth: "960px",
    margin: "0px auto 30px",
    fontSize: "65px",
    fontWeight: "normal",
  },
  subTitle: {
    fontWeight: "normal",
    fontSize: "24px",
    marginBottom: "120px",
  },
  contactUs: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "960px",
    margin: "auto",
    fontWeight: "normal",
    position: "relative",

    '@media (max-width: 940px)': {
      flexWrap: "wrap",
    }
    
  },
  footerButtons: {
    display: "flex",
    flexDirection: "row",
    maxWidth: "960px",
    margin: "auto",
    fontWeight: "normal",
    position: "relative",
  },
  section: {
    flex: "1",
    padding: "10px",
    lineHeight: "26px",
    position: "relative",
    boxSizing: "border-box",

    '@media (max-width: 940px)': {
      width: "50%",
      flex: "none",
      marginBottom: "20px",
    },

    '@media (max-width: 600px)': {
      width: "100%",
    }
  },
  items: {
    padding: "0px",
    margin: "0px",
    listStyle: "none",
    boxSizing: "border-box",

    '@media (max-width: 450px)': {
      borderBottom: "solid 1px #eee",
      paddingBottom: "30px",
    }
  },
  companyDetails: {

  },
  contactDetails: {

  },
  postalAddress: {

  },
  physicalAddress: {

  },
  icon: {
    display: "block",
    position: "absolute",
    zIndex: "-1",
    color: "#555",
    borderRadius: "100px",
    height: "100px",
    width: "100px",
    background: "rgba(255,255,255,0.2)",
    fontSize: "50px",
    padding: "30px 20px 20px 20px",
    boxSizing: "border-box",
    top: "50px",
    left: "-10px",
    textAlign: "center",
    marginLeft: "20px",
  },
  iconPhone: {

  },
  iconMosaic: {
    marginLeft: "25px"
  },
  iconEnvelope: {
    paddingTop: "23px"
  },
  iconBuilding: {
    paddingTop: "23px"
  },
  imageMosaic: {
    width: "120px",
    marginLeft: "-25px"
  },
  footer: {
    position: "absolute",
    bottom: "5px",
    width: "100%",
    textAlign: "center",
    fontSize: "14px"
  },
  footerField: {
    display: "inline-block",
    margin: "0px 8px"
  }
});

module.exports = {
  container: css(styles.container),
  title: css(styles.title),
  subTitle: css(styles.subTitle),
  contactUs: css(styles.contactUs),
  footerButtons: css(styles.footerButtons),
  companyDetails: css(styles.section, styles.companyDetails),
  contactDetails: css(styles.section, styles.contactDetails),
  postalAddress: css(styles.section, styles.postalAddress),
  physicalAddress: css(styles.section, styles.physicalAddress),
  items: css(styles.items),
  iconPhone: css(styles.icon, styles.iconPhone),
  iconMosaic: css(styles.icon, styles.iconMosaic),
  iconEnvelope: css(styles.icon, styles.iconEnvelope),
  iconBuilding: css(styles.icon, styles.iconBuilding),
  imageMosaic: css(styles.imageMosaic),
  footer: css(styles.footer),
  footerField: css(styles.footerField)
};