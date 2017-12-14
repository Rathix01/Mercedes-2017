import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  row: {
    padding: 4
  },
  idRow: {

  },
  btnRow: {
    display: 'flex',
    marginTop: 20
  },
  createForm: {
    background: Variables.colors.green,
    color: Variables.colors.white,
    padding: 10,
    maxWidth: 265,
    boxSizing: "border-box",
    marginTop: 10,
    cursor: "pointer",

    ":hover": {
      background: Variables.colors.darkGreen,
    }
  },
  newForm: {
    background: Variables.colors.blue,
    color: Variables.colors.white,
    padding: 10,
    maxWidth: 265,
    width: "100%",
    boxSizing: "border-box",
    marginTop: 10,
    cursor: "pointer",

    ":hover": {
      background: Variables.colors.darkBlue,
    }
  },
  rulesEditor: {
    marginTop: 20,
  },
  keywords: {
    display: 'flex',
    flexDirection: 'row',
    height: 140,
    overflowY: "auto",
    overflowX: "hidden",
    border: `solid 1px ${Variables.colors.lightGray}`,
  },
  keyword: {
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 100,
    margin: 2,
    padding: "3px 10px 8px 10px",
    boxSizing: "border-box",
    maxHeight: 30,
    cursor: "pointer",
    background: Variables.colors.red,
    color: "white",
    fontSize: 18,
  },
  keywordRemove: {
    display: 'flex',
    background: Variables.colors.white,
    color: Variables.colors.red,
    borderRadius: 40,
    width: 16,
    height: 16,
    padding: 0,
    lineHeight: "16px",
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
  keywordAdd: {
    display: 'flex',
    background: Variables.colors.white,
    color: Variables.colors.red,
    borderRadius: 40,
    width: 16,
    height: 16,
    padding: 0,
    lineHeight: "18px",
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
  keywordValue: {
    display: 'flex',
    marginRight: 8,
  }
});

//keyword, keywordRemove, keywordAdd, keywordValue 

module.exports = {
  row: css(styles.row),
  idRow: css(styles.row, styles.idRow),
  btnRow: css(styles.row, styles.btnRow),
  newForm: css(styles.newForm),
  rulesEditor: css(styles.rulesEditor),
  keywords: css(styles.keywords),
  keyword: css(styles.keyword),
  keywordRemove: css(styles.keywordRemove),
  keywordAdd: css(styles.keywordAdd),
  keywordValue: css(styles.keywordValue),
}