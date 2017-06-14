import { StyleSheet, css } from 'aphrodite/no-important';

//TODO - split off volo, lifestyle, travel styles into their own files.

const styles = StyleSheet.create({
  container: {
    background: "rgba(238, 238, 238, 1)", //#eee
    height: "100%",
    width:"100%",
    boxSizing: "border-box",
    fontFamily: "Raleway",
  }
});

module.exports = {
  container:            css(styles.container),

};
