import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  container: {
    width:"100%",
    boxSizing: "border-box",
    margin: "5px",
    display: "flex",
    flexDirection: "row",

    '@media (max-width: 600px)':{
      flexDirection: "column",
    },
  },
  inputContainer: {
    position: "relative",
  },
  searchIcon: {
    position:"absolute",
    top: 0,
    left: 0,
    backgroundColor: "#000",
    color: Variables.colors.white,
    height: "100%",
    padding: "8px 12px",
    boxSizing: "border-box",
  },
  searchInput: {
    textIndent: 40,
    border: "solid 1px black",
  },
  autoCompleteList: {
    maxHeight: 300,
    maxWidth: 685,
    overflowY: "auto",
    overflowX: "hidden",
    border:"solid 1px #000",
    position: "absolute",
    background: "#fff",
    marginTop: 8,
  },
  autoCompleteItem: {
    padding: 5,
    fontSize: 14,
    width: 665,
    cursor: "pointer",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    
    ":hover": {
      backgroundColor: "#000",
      color: Variables.colors.white,
    }
  }
});

const createStyle = (color) => StyleSheet.create({searchInputFocus:{":focus + div":{backgroundColor:`${color} !important`}}});
const getSearchIconColours = (color) => css(createStyle(color).searchInputFocus);

module.exports = {
  container: css(styles.container),
  inputContainer: css(styles.inputContainer),
  searchIcon: css(styles.searchIcon),
  searchInput: css(styles.searchInput),
  autoCompleteList: css(styles.autoCompleteList),
  autoCompleteItem: css(styles.autoCompleteItem),
  getSearchIconColours: getSearchIconColours
};
