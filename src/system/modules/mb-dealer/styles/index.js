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
    top: 90,
    left: 0,
    padding: "0px 70px",
    fontSize: 18,

    '@media (max-width: 650px)': {
      padding: 10,
      top: 160,
    }
  },
  location: {
    position: "absolute",
    background: "#fff",
    height: 40,
    width: 41,
    left: 68,
    top: 82,
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",

    '@media (max-width: 650px)': {
      left: 9,
      top: 105,
    },
  },
  searchArea: {
    marginBottom: 40,

    '@media (max-width: 650px)': {
      marginTop: 20,  
    }
  },
  searchInput: {
    width: "100%",
    maxWidth: 600,

    '@media (max-width: 650px)': {
      width: "100%",
      maxWidth: 400,
    }
  },
  dealerTitle: {
    fontSize: 24,
    marginBottom: 10,
    marginTop: 50,
  },
  dealerList: {
    display: 'flex',
    justifyContent: "space-around",
    flexDirection: "row",
  },
  listItemContainer: {
    border: "solid 1px black",
    padding: 10,
    fontSize: 12,
    display: 'flex',
    justifyContent: "space-around",
    flexDirection: "column",
    height: 240,
    boxSizing: "border-box",
    '@media (max-width: 650px)': {
      margin: 5,  
    }
  },
  selectDealerButton: {
    background: Variables.colors.darkGray,
    height: 40,
    marginTop: 10,
    width: "100%",
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: "#fff",
    minWidth: 180,
    transition: "all 0.2",

    ":hover": {
      background: Variables.colors.blue,
    },

    ":active": {
      background: Variables.colors.gray,
    }
  },
});


module.exports = {
  container: css(styles.container),
  location: css(styles.location),
  searchArea: css(styles.searchArea),
  searchInput: css(styles.searchInput),
  dealerTitle: css(styles.dealerTitle),
  dealerList: css(styles.dealerList),
  listItemContainer: css(styles.listItemContainer),
  selectDealerButton: css(styles.selectDealerButton),
}