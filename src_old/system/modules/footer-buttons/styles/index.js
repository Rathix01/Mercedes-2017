import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  container: {
    width: "500px",
    height: "40px",
    fontSize: "20px",
    fontFamily: "Raleway",
    padding: "0px",
    boxSizing: "border-box",
    position: "relative",
    zIndex: "1",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    right: "50px",
    bottom: "50px",

    '@media (max-width: 940px)': {
        position: "relative",
        right: "0px",
        bottom: "10px"
    }
  },
  button: {
    flex: "1",
    margin: "0px 10px",
    borderRadius: "40px",
    color: "#555",
    background: "#eee",
    fontFamily: "Raleway",
    fontSize: "14px",
    outline: "none",
    border: "none",
    cursor: "pointer",
    transition: "all 0.1s",

    ":hover": {
        transform: "translateY(-1px)",
        background: "#fff",
    },

    ":active": {
        transform: "translateY(1px)",
        background: "#fff",
        color: "#000",
    }
  }
});

module.exports = {
  container: css(styles.container),
  button: css(styles.button),
};
