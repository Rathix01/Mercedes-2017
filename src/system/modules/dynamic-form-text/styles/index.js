import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  formText: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 1200,
    margin: "0px auto",
    padding: "5px 20px 20px",
    boxSizing: "border-box",
    fontFamily: "Raleway",
    borderBottom: `solid 1px ${Variables.colors.lightGray}`, 
  },
  text: {
    fontSize: 14,
  }
});

module.exports = {
  formText: css(styles.formText),
  text: css(styles.text),
};