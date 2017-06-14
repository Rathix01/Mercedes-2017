import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  container: {
    background: "#00AFAA", //"#B8312F",
    position: "relative",
    overflow: "hidden",
    minHeight: "300px",
    maxHeight: "900px",
    color: "white",
    padding: "40px",
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
    float: "right",
    marginLeft: "50px",
    marginTop: "50px",
    marginRight: "50px",
    marginBottom: "50px",
  },
  iconImage:{
    display: "inline-block",
    marginTop: "20px",
    width: "90%"
  },
});

module.exports = {
  container: css(styles.container),
  icon: css(styles.icon),
  iconImage: css(styles.iconImage),
};
