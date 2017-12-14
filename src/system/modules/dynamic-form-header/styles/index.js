import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  formHeader: {
    width: "100%",
    margin: "40px auto",
    padding: "20px 20px",
    boxSizing: "border-box",
    fontFamily: "Raleway",
    backgroundColor: Variables.colors.blue,
    position: "relative",
  },
  headerContent: {
    maxWidth: 1200,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    margin: "0px auto",

    '@media (max-width: 780px)': {
        flexDirection: "column",
    }
  },
  formHeaderText: {
    flex: 1,
    color: Variables.colors.white,
    display: 'block',

    '@media (max-width: 780px)': {
        alignSelf: "center",
    }
  },
  image1: {
    flex: 1,
    marginLeft: 20,
  },
  image2: {
    flex: 1,
    alignText: "right",
    marginRight: 20,

    '@media (max-width: 780px)': {
        alignSelf: "center",
        marginRight: 0,
    }
  },
});

module.exports = {
  formHeader: css(styles.formHeader),
  formHeaderText: css(styles.formHeaderText),
  headerContent: css(styles.headerContent),
  image1: css(styles.image1),
  image2: css(styles.image2),
};