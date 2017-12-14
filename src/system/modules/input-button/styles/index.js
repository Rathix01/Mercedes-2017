import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  container: {
    padding: "10px 20px",
    opacity: 0.8,
    alignSelf: "flex-end",
    cursor: "pointer",

    ':hover':{
      opacity: 1
    },
  },
});

// const createStyle = (color) => StyleSheet.create({searchInputFocus:{":focus + div":{backgroundColor:`${color} !important`}}});
// const getSearchIconColours = (color) => css(createStyle(color).searchInputFocus);

module.exports = {
  container: css(styles.container),
};
