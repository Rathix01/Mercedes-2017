import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  section: {
    maxWidth: "1200px",
    margin: "0px auto 0px",
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

    ":hover": {
      opacity: "1",
    }
  },

  content: {
    padding: '10px'
  },
});

exports.SectionStyle = css(styles.section);
exports.HeadingStyle = css(BackgroundColorsStyle.mosaicGreen, styles.heading);
exports.ContentStyle = css(styles.content);
