import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    fontSize: "20px",
    fontFamily: "Raleway",
    padding: "30px 0px",
    boxSizing: "border-box",
    position: "fixed",
    zIndex: "1000",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    background:"rgba(0,0,0,0.6)",
    top: "0px",
    left: "0px",
  },
  box: {
    background: "#fff",
    height: "90%",
    width: "90%",
    margin: "10px auto",
    position: "relative",
    padding: "20px",
    boxSizing: "border-box",
    overflowY:"scroll",
    overflowX: "hidden"
  },
  x: {
    position: "absolute",
    top: "55px",
    right: "9%",
    zIndex: "1001",
    cursor: "pointer",
    background:"#fff",
    borderRadius: "50px",
    height:"50px",
    width:"50px",
    textAlign: "center",
    fontSize: "33px",
    transformOrigin: "50% 50%",
    paddingTop: "3px",
    boxSizing: "border-box",
    border: "solid 2px #ccc",
    transition: "all 0.1s",

    ":hover": {
        background: "#ccc",
        transform: "translateY(-1px)",
    },

    ":active": {
        background: "#555",
        border: "solid 1px #555",
        color: "#fff",
        transform: "translateY(1px)",
    }
  }
});

module.exports = {
  container: css(styles.container),
  box: css(styles.box),
  x: css(styles.x),
};
