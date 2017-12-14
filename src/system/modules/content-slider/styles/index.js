import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  container: {
    position: "relative",
    boxSizing: "border-box",
    
  },
  sliderContainer: {
    overflow: "hidden",
  },
  back: {
    color: Variables.colors.blue,
    position: "absolute",
    height: "100%",
    width: 200,
    top: 0,
    left: -110,
    boxSizing: "border-box",
    fontSize: 30,
    opacity: 0,
    transition: "all 0.2s",

    ":hover": {
      opacity: 1,
    },

    ":active": {
      opacity: 1,
      color: Variables.colors.darkBlue,
    },

    '@media (max-width: 600px)': {
      opacity: 1,
      left: -80,
    },
  },
  forward: {
    color: Variables.colors.blue,
    position: "absolute",
    height: "100%",
    width: 200,
    top: 0,
    right: -110,
    boxSizing: "border-box",
    fontSize: 30,
    opacity: 0,
    transition: "all 0.2s",

    ":hover": {
      opacity: 1,
    },

    ":active": {
      opacity: 1,
      color: Variables.colors.darkBlue,
    },

    '@media (max-width: 600px)': {
      opacity: 1,
      right: -80,
    },
  },
  iconLeft: {
    position: "absolute",
    top: 150,
    left:80,
  },
  iconRight: {
    position: "absolute",
    top: 150,
    right: 80,
  }

  // selectDealerButton: {
  //   background: Variables.colors.darkGray,
  //   height: 40,
  //   marginTop: 10,
  //   width: "100%",
  //   display: 'flex',
  //   justifyContent: "center",
  //   alignItems: "center",
  //   cursor: "pointer",
  //   color: "#fff",
  //   minWidth: 180,
  //   transition: "all 0.2",

  //   ":hover": {
  //     background: Variables.colors.blue,
  //   },

  //   ":active": {
  //     background: Variables.colors.gray,
  //   }
  // },
});


module.exports = {
  container: css(styles.container),
  sliderContainer: css(styles.sliderContainer),
  back: css(styles.back),
  forward: css(styles.forward),
  iconLeft: css(styles.iconLeft),
  iconRight: css(styles.iconRight),
}