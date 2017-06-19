import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  selectList: {
    minWidth: 265,
    padding: 5,
    fontFamily: "Raleway",
    fontSize: 18,
  },
});

module.exports = {
  selectList: css(styles.selectList)
};