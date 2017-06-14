import { StyleSheet, css } from 'aphrodite/no-important';
import { Buttons } from '../../../styles'

//TODO - split off volo, lifestyle, travel styles into their own files.

const styles = StyleSheet.create({
  products: {
    boxSizing: "border-box",
    margin: "0px",
    padding: "40px",
    color: "#fff",
    minWidth: "320px",
    position: "relative",
    overflow: "hidden",
    minHeight: "300px",
    paddingBottom: "50px",
    fontFamily: "Raleway",
  },
  lifeStyle: {
    background: "#31aae1",

    ":before": {
      content: "' '",
      height: "200px",
      width: "1500px",
      position: "absolute",
      top: "-200px",
      left: "395px",
      background: "rgba(255, 255, 255, 0.1)",
      zIndex: "0",
      transform: "rotate(45deg)",
      transformOrigin: "0% 0%"
    },
    ":after": {
      content: "' '",
      height: "20px",
      width: "1500px",
      position: "absolute",
      top: "-200px",
      left: "140px",
      background: "rgba(255, 255, 255, 0.1)",
      zIndex: "0",
      transform: "rotate(45deg)",
      transformOrigin: "0% 0%"
    }
  },
  travel: {
    background: "rgb(97, 189, 109)",

    ":before": {
      content: "' '",
      height: "200px",
      width: "1500px",
      position: "absolute",
      top: "-200px",
      left: "0px",
      background: "rgba(255, 255, 255, 0.1)",
      zIndex: "0",
      transform: "rotate(-45deg)",
      transformOrigin: "100% 100%",
    },

    ":after": {
      content: "' '",
      height: "20px",
      width: "1500px",
      position: "absolute",
      top: "-200px",
      left: "180px",
      background: "rgba(255, 255, 255, 0.1)",
      zIndex: "0",
      transform: "rotate(-45deg)",
      transformOrigin: "100% 100%",
    }
  },
  background: {
    zIndex: "0",
    height: "200px",
    width: "200px",
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.3)",
    paddingTop: "20px",
    boxSizing: "border-box",
    borderRadius: "100px",
    shapeOutside: "circle()",
  },
  travelBackground: {
    float: "left",
    marginTop: "0px",
    marginRight: "90px",
    marginBottom: "50px",
  },
  travelBackgroundIcon:{
    fontSize: "180px",
    color: "rgb(97, 189, 109)",
    display: "inline-block",
    marginLeft: "-5px"
  },
  productText: {
    zIndex: "1",
    maxWidth: "900px",
    lineHeight: "26px",
    marginBottom: "40px",
    fontSize: "22px",
  },
  lifestyleBackground: {
    float: "right",
    marginTop: "50px",
    marginLeft: "50px",
    marginBottom: "50px"
  },
  lifestyleBackgroundIcon: {
    fontSize: "160px",
    color: "#31aae1",
    display: "inline-block",
    marginTop: "-5px"
  },
  volo: {
    color: "#000",
    zIndex: "3",
    padding: "0px",
    paddingBottom: "0px"
  },
  sectionTitle: {
    fontWeight: "normal",
    fontSize: "65px",
    margin: "0px",
    padding: "5px",
    maxWidth: "960px",
    margin: "0px auto",
  },
  voloSectionTitle: {
    fontWeight: "normal",
    fontSize: "65px",
    margin: "0px",
    padding: "5px",
    maxWidth: "960px",
    margin: "0px auto",

    '@media (max-width: 780px)': {
        fontSize: "45px",
    },

    '@media (max-width: 450px)': {
        fontSize: "35px",
    }
  },
  productInfo: {
    maxWidth: "960px",
    margin: "0px auto",
    position: "relative",
    paddingBottom: "30px",
  },
  voloDetails: {
    textAlign: "center",
    paddingBottom: "50px",
    maxWidth: "960px",
    width: "100%",
    background: "#eee",
    boxSizing: "border-box",
    paddingTop: "25px",
    fontSize: "20px"
  },
  join: {
    fontSize: "26px",
    paddingBottom: "0px",
  },
  travelBtnPosition: {
    position: "absolute",
    bottom: "-10px",
    right: "20px",
  },
});

module.exports = {
  travel: css(styles.products, styles.travel),
  sectionTitle: css(styles.sectionTitle),
  productInfo: css(styles.productInfo),
  travelBtnPosition: css(styles.travelBtnPosition),
  travelBackground: css(styles.background, styles.travelBackground),
  travelBackgroundIcon: css(styles.travelBackgroundIcon),
  productText: css(styles.productText),
  travelBtn: css(Buttons.btn, Buttons.greenBtn),
};
