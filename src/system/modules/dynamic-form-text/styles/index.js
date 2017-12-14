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
  },
  header: {
    maxWidth: "70%",
  },
  content: {
    display: "flex",
    flexDirection: "row",

    '@media (max-width: 780px)': {
        flexDirection: "column",
    }
  },
  text: {
    fontSize: 14,
    maxWidth: "70%",
    flex: 1,
    margin: "auto 0px",
    lineHeight: "17px",
  },
  image: {
    paddingLeft: 40,
    flex: 1.5,
    shapeOutside: "circle()",

    '@media (max-width: 780px)': {
        marginTop:40,
    }
  },
  error: {
    background: Variables.colors.red,
    width: "265px",
    marginLeft: "36%",
    padding: 10,
    minHeight: "100px"
  },
  errorText: {
    color: Variables.colors.white,
    width: "250px !important",
    minWdith: "250px",
  }
});

module.exports = {
  formText: css(styles.formText),
  header: css(styles.header),
  content: css(styles.content),
  text: css(styles.text),
  image: css(styles.image),
  error: css(styles.error),
  errorText: css(styles.errorText),
};