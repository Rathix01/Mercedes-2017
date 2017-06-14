import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  header: {
    padding: '5px 10px',
    color: '#fff',
    fontFamily: "Raleway",
    margin: "0px auto 5px",
    boxSizing: "border-box",
    zIndex: "100",
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
  },
  headerContent: {
      maxWidth: "960px",
      margin: "0px auto",
  },
  body: {
  	zIndex: "1",
  	position: "relative",
  	marginTop: "100px",
  },
   content: {
    padding: '10px',
    position: "relative",
    minHeight: "600px",
  },

  footer: {
    position: "relative",
  },

});

module.exports = {
  header: css(styles.header, BackgroundColorsStyle.black),
  body: css(styles.body),
  content: css(styles.content),
  headerContent: css(styles.headerContent),
  footer: css(styles.footer),
};
