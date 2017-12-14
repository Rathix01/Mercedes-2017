import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  container: {
    maxWidth: 1200,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    margin: "0px auto",
  },
  list: {
    fontFamily: "Raleway",
    padding: "0px 40px",
    minWidth: 250,
    width: "100%",
  },
  item: {
    padding: "5px",
    marginBottom: 3,
    fontSize: 14,
    lineHeight: "17px",
    maxWidth: "70%",
  }
});

module.exports = {
  container: css(styles.container),
  list: css(styles.list),
  item: css(styles.item),
};