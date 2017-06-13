import { StyleSheet, css } from 'aphrodite/no-important';

//TODO - split off volo, lifestyle, travel styles into their own files.

const styles = StyleSheet.create({
  section: {
  	flex: "1",
  	boxSizing: "border-box",
    paddingTop: "0px",
    position: "relative",
  },
});

module.exports = {
  section:              css(styles.section),
};
