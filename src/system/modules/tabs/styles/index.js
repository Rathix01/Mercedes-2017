import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  tabs: {

  },
  labels: {
    display: 'flex',
    flexDirection: "row",
    borderBottom: `solid 1px ${ Variables.colors.gray }`,
    marginBottom: 3,
  },
  label: {
    minWidth: 80,
    cursor: "pointer",
    padding: "3px 3px 3px 10px",
    transition: "all 0.2s",

    ":hover": {
      background: Variables.colors.darkGray,
      color: Variables.colors.white,
    }
  },
  active: {
    background: Variables.colors.gray,
    color: Variables.colors.white,

    ":hover": {
      background: Variables.colors.gray,
    }
  },
  content: {
    borderBottom: `solid 1px ${ Variables.colors.gray }`,
    paddingBottom: 3,
    marginBottom: 10,
    minHeight: 200,
  },
  tab: {

  }
});

module.exports = {
  tabs: css(styles.tabs),
  labels: css(styles.labels),
  label: css(styles.label),
  content: css(styles.content),
  tab: css(styles.tab),
  active: css(styles.active)
};