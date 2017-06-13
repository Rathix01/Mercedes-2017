import { StyleSheet, css } from 'aphrodite/no-important';

//TODO - split off volo, lifestyle, travel styles into their own files.

const styles = StyleSheet.create({
  container: {
    background: "rgba(238, 238, 238, 1)", //#eee
    height: "100%",
    width:"100%",
    boxSizing: "border-box",
    fontFamily: "Raleway",
  },
  header: {
  	position: "absolute",
  	top: "0px",
  	left: "0px",
  	width: "100%",
  	display: "flex",
    flexDirection: "row",
    boxSizing: "border-box",
    padding: "10px 0px",
    textAlign: "center",
    marginTop: "0px",
    background: "#ccc",
    zIndex: "0",
    overflow: "hidden",

    ":before": {
      content: "' '",
      height: "200px",
      width: "1500px",
      position: "absolute",
      top: "-200px",
      left: "0",
      marginLeft: "-300px",
      background: "rgba(255, 255, 255, 0.1)",
      zIndex: "-1",
      transform: "rotate(-35deg)",
      transformOrigin: "100% 100%"
    },
    ":after": {
      content: "' '",
      height: "20px",
      width: "1500px",
      position: "absolute",
      top: "-200px",
      left: "0",
      marginLeft: "-355px",
      background: "rgba(255, 255, 255, 0.1)",
      zIndex: "-1",
      transform: "rotate(-35deg)",
      transformOrigin: "100% 100%"
    }
  },
  sectionsContainer: {
  	height: "100%",
    width:"100%",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    zIndex: "1",
    paddingTop: "175px"
  },
  section: {
  	flex: "1",
  	boxSizing: "border-box",
    paddingTop: "0px",
    position: "relative",
  },
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
  seeMoreBtn: {
    background: "#fff",
    outline: "none",
    border: "none",
    padding: "20px 65px",
    position: "absolute",
    right: "0px",
    bottom: "-30px",
    fontSize: "20px",
    width: "350px",
    marginTop: "50px"
  },
  seeMoreLifeBtn: {
    color: "#31aae1",
  },
  seeMoreTravelBtn: {
    color: "rgb(97, 189, 109)",
  }
});

module.exports = {
  container:            css(styles.container),
  header:               css(styles.header),
  sectionsContainer:    css(styles.sectionsContainer),
  section:              css(styles.section),
  lifeStyle:            css(styles.products, styles.lifeStyle),
  travel:               css(styles.products, styles.travel),
  volo:                 css(styles.products, styles.volo),
  sectionTitle:         css(styles.sectionTitle),
  voloSectionTitle:     css(styles.voloSectionTitle),
  productInfo:          css(styles.productInfo),
  voloDetails:          css(styles.productInfo, styles.voloDetails),
  join:                 css(styles.productInfo, styles.join),
  seeMoreLifeBtn:       css(styles.seeMoreBtn,  styles.seeMoreLifeBtn),
  seeMoreTravelBtn:     css(styles.seeMoreBtn,  styles.seeMoreTravelBtn),
  travelBackground:     css(styles.background, styles.travelBackground),
  travelBackgroundIcon: css(styles.travelBackgroundIcon),
  productText:           css(styles.productText),
  lifestyleBackground:  css(styles.background, styles.lifestyleBackground),        
  lifestyleBackgroundIcon: css(styles.lifestyleBackgroundIcon),

};
