import { StyleSheet, css } from 'aphrodite/no-important';

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    fontSize: "20px",
    fontFamily: "Raleway",
    padding: "30px 0px",
    boxSizing: "border-box",
    position: "relative",
    zIndex: "1",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  logoArea: {
    minHeight: "60px",
    width: "250px",
    marginTop: "10px",
    marginBottom: "20px",
  },
  voloLogo: {
    minHeight: "60px",
    marginRight: "180px",

    '@media (max-width: 780px)': {
        marginRight: "10px",
    }
  },
  voloDescription: {
    textAlign: "left",
    minWidth: "350px",

    '@media (max-width: 940px)': {
        minWidth: "200px",
    },

    '@media (max-width: 780px)': {
        display: "none"
    }
  },
  keyWord: {
    display: "inline-block",
    width: "160px",
    textAlign: "left",
    fontSize: "38px",
  },
  loginArea: {
    minWidth:"300px",
    display: "flex",
    justifyContent: "center",

    '@media (max-width: 780px)': {
        minWidth:"160px",
    }
  },
  loginButton: {
    width:"160px",
    fontSize: "20px",
    fontFamily: "'Raleway'",
    padding: "5px 35px",
    boxSizing: "border-box",
    height: "50px",
    border: "none",
    outline: "none",
    cursor: "pointer",
    background: "#31aae1",
    color:"#fff",

    ":hover": {
      background: "#257ab1"
    },

    ":active": {
      background: "#1F6896"
    }
  }
});

module.exports = {
  container: css(styles.container),
  logoArea: css(styles.logoArea),
  voloLogo: css(styles.voloLogo),
  voloDescription: css(styles.voloDescription),
  keyWord: css(styles.keyWord),
  loginArea: css(styles.loginArea),
  loginButton: css(styles.loginButton)
};
