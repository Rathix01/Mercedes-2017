import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  listItem: {
    position: "absolute",
    width: "100%",
    opacity: 0,
  },
});

module.exports = {
  listItem: css(styles.listItem),
};