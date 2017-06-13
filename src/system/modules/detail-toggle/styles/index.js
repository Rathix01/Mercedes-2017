import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  listMember: {
    position: "absolute",
    width: "100%"
  },
  single: {
    maxWidth: "960px",
    margin: "0px auto",
  },
  toggleHeader: {
  	maxWidth: "960px",
  }
});

module.exports = {
  listMember: css(styles.listMember),
  single: css(styles.single),
};