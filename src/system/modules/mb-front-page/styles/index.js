import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginBottom: 10,
    width: "100%",
    flexDirection: "column",
    minHeight: "100%",
    position: "absolute",
    boxSizing: "border-box",
    background: "#000",
    top: 0,
    left:0,
    color:"#fff",

    '@media (max-width: 650px)': {
      overflowX: "hidden",
    }
  },
  contentContainer: {
    maxWidth: 1200,
    maxHeight: 780,
    margin: "0px auto",
    height: "100%",
    width: "100%",
    flex: 1,
    marginTop: 30,

  },
  extraInfo: {
    fontFamily: "Raleway",
    fontSize: 12,
    lineHeight: "20px",
    marginTop: 30,
  },
  headerContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,

    '@media (max-width: 650px)': {
      flexDirection: "column",
      textAlign: "center",
    },
  },
  menuOptionsContainer: {
    background: "#242424",
    display: 'flex',
    flexDirection: "row",
    fontFamily: "Raleway",
    marginTop: 30,
    padding: "0px 20px",
    
    '@media (max-width: 650px)': {
      maxWidth: "100%",
      overflow: "hidden",
    },
  },
  menuItem: {
    padding: "10px 15px",
    transition: "all 0.2s",
    cursor: "pointer",
    flex: 1,
    textAlign: "center",

    ":hover": {
      color: Variables.colors.blue,
    }
  },
  selected: {
    color: Variables.colors.blue,
  },
  carListContainer: {
    maxWidth: 1200,
    minHeight: 500,
    width: "100%",
    margin:"10px auto",

    '@media (max-width: 1200px)': {
      maxWidth: 800,
    },
    '@media (max-width: 800px)': {
      maxWidth: 400,
    },
  },
  carListItemsContainer: {
    display: 'flex',
    flexDirection: "row",
    fontFamily: "Raleway",
    marginTop:60,
    width: 1890,
    overflow:"hidden",
    justifyContent: "flex-start",
    paddingRight: 300,
  },
  carItem: {
    padding: "10px 15px",
    transition: "all 0.2s",
    cursor: "pointer",
    textAlign: "center",
    width:400,
    minWidth: 400,
    boxSizing: "border-box",
    overflow: "hidden",
  },
  carImage: {
    marginBottom: 10,
  },
  carName: {
    fontFamily: "Times New Roman",
    fontSize: 28,
    boxSizing: "border-box",
    paddingTop: 10,
    paddingBottom: 5,
    whiteSpace: "nowrap",
  },
  carRRP: {
    fontSize: 14,
    boxSizing: "border-box",
    paddingBottom: 20,
    fontFamily: "Roboto",
  },
  carWeekly: {
    color: Variables.colors.blue,
  },
  selectCarButton: {
    background: Variables.colors.blue,
    maxWidth: 150,
    width: "100%",
    margin: "40px auto",
    boxSizing: "border-box",
    padding: 10,
    opacity: 0.8,

    ":hover": {
      opacity: 1,
    },
    ":active": {
      opacity: 1,
      background: Variables.colors.darkBlue,
    },
  }
});


module.exports = {
  container: css(styles.container),
  contentContainer: css(styles.contentContainer),
  extraInfo: css(styles.extraInfo),
  headerContainer: css(styles.headerContainer),
  menuOptionsContainer: css(styles.menuOptionsContainer),
  menuItem: css(styles.menuItem),
  selected: css(styles.menuItem, styles.selected),
  carListContainer: css(styles.carListContainer),
  carListItemsContainer: css(styles.carListItemsContainer),
  carItem: css(styles.carItem),
  carImage: css(styles.carImage),
  carName: css(styles.carName),
  carRRP: css(styles.carRRP),
  carWeekly: css(styles.carWeekly),
  selectCarButton: css(styles.selectCarButton),
}