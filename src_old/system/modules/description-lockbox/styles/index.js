import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  container: {
    background: "#75706B",
    position: "relative",
    overflow: "hidden",
    minHeight: "300px",
    maxHeight: "900px",
    color: "white",
    padding: "40px",
    fontFamily: "Raleway",
  },
  icon: {
    zIndex: "0",
    height: "200px",
    width: "200px",
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.3)",
    paddingTop: "20px",
    boxSizing: "border-box",
    borderRadius: "100px",
    shapeOutside: "circle()",
    float: "left",
    marginLeft: "-10px",
    marginTop: "0px",
    marginRight: "90px",
    marginBottom: "50px",
  },
  iconSVG:{
    marginLeft: "35px",
    marginTop:"0px",
  },
});

module.exports = {
  container: css(styles.container),
  icon: css(styles.icon),
  iconSVG: css(styles.iconSVG),
};
