import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  section: {
    maxWidth: "1200px",
    margin: "0px auto 10px",
    padding: '0px',
    position: "relative",
    overflow: "hidden",
    zIndex: "0",
    boxSizing: "border-box",
  },

  heading: {
    padding: '5px 10px',
    color: '#fff',
    fontFamily: "Raleway",
    zIndex: "1",
    borderBottom: "solid 1px #eee",
    opacity: "0.9",
    transition: "opacity 0.2s",
    cursor: "pointer",
    maxWidth: "960px",
    margin: "0px auto",

    ":hover": {
      opacity: "1",
    }
  },

  headerContent: {
    paddingLeft: "30px",
    position: "relative",
  },

  content: {
    padding: '10px',
    maxWidth: "960px",
    margin: "0px auto",
  },

  buttonContainer: {
    position: "absolute",
    height: "100%",
    width: "200px",
    right: "0px",
    top: "-25px",
    boxSizing: "border-box",
  }
});

exports.SectionStyle = css(styles.section);
exports.HeadingStyle = css(BackgroundColorsStyle.mosaicGreen, styles.heading);
exports.ContentStyle = css(styles.content);
exports.buttonContainer = css(styles.buttonContainer);
exports.headerContent = css(styles.headerContent);
