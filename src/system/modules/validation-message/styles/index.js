import { StyleSheet, css } from 'aphrodite';
import { BackgroundColorsStyle, Variables } from '../../../styles/';


const styles = StyleSheet.create({
  container: {
    width:"100%",
    boxSizing: "border-box",
    marginLeft: 20,
    background: Variables.colors.red,
    color: Variables.colors.white,
    maxWidth: 265,
  },
  innerContainer: {
  	padding: 5,
  }
});

const createStyle = (color) => StyleSheet.create({searchInputFocus:{":focus + div":{backgroundColor:`${color} !important`}}});
const getSearchIconColours = (color) => css(createStyle(color).searchInputFocus);

module.exports = {
  container: css(styles.container),
  innerContainer: css(styles.innerContainer),
};
