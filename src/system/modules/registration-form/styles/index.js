import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width:"100%",
    boxSizing: "border-box",
    margin: "5px",
    border: "solid 1px red",
    padding: "20px",
    fontFamily: "Raleway",
  },

});

module.exports = {
  container: css(styles.container),
};
