import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  title: {
    width: "100%",
    maxWidth: 1200,
    margin: "0px auto",
    position: "relative",
    background: Variables.colors.black,
    color: Variables.colors.white,
    padding: 20,
    boxSizing: "border-box",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    border: `solid 1px ${ Variables.colors.black }`,
    width: "100%",
    maxWidth: 1200,
    boxSizing: "border-box",
  },
  cell: {
    flex:1,
  },
  closeBtn: {
    position: 'absolute',
    right: "20px",
    top: "20px",
    color: Variables.colors.white,
  }
});

module.exports = {
  title: css(styles.title),
  content: css(styles.content),
  cell: css(styles.cell),
  closeBtn: css(styles.closeBtn),
};