import { StyleSheet, css } from 'aphrodite/no-important';
import { colors } from '../../../styles/variables.style.js';

const styles = StyleSheet.create({
  formContainer: {
    zIndex: 0,
    height: 400,
    alignSelf: "center",
    top:110,
    display: "flex",
    maxWidth: 900,
    margin: "0 auto",
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    zIndex: 0,
    alignSelf: "center",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    height: "100%",
  },
  iconBubble: {
    backgroundColor: colors.green,
    borderRadius: 250,
    height:500,
    width: 500,
    zIndex: 0,
    position: "absolute",
    opacity: 0.3,
    alignSelf: "center",
  },
  icon: {
    color: colors.white,
    alignSelf: "center",
    top: 16,
    zIndex: 1,
    position: "absolute",
  },
  
  buttonContainer: {
    width: "90%",
    left: 15,
    top: 40,
  },
  buttonBackground: {
    backgroundColor: colors.green,
    height: 30,
  },
  buttonText: {
    color: "#fff",
    top: 5,
    textAlign: 'center'
  },
  loginField: {
    height: 40,
    paddingLeft: 10,
    width: 300,
    alignSelf: "center",
  },
  inputView: {
    zIndex: 1,
    display: "flex",
    width: "100%",
    alignSelf: "center",
    justifyContent: "center",
    height: "100%",
    position: "absolute",
  },
  inputSize: { 
    minHeight: 300,
    minWidth: 400,
    border: "solid 1px blue",
    alignSelf: "center",
  },
  fieldContainer: {
    top: 20,
    height: 90,
    width: "100%",
    border: "solid 1px red",
    display: "flex",
  },
  loadingView: {
    position:"absolute",
    height: 400,
    alignSelf: "center",
    top:80,
    width: "100%",
    zIndex: 0,
    left: 90
  },
  authenticating: {
    fontSize:20,
  }
});

module.exports = {
  formContainer: css(styles.formContainer),
  iconContainer: css(styles.iconContainer),
  iconBubble: css(styles.iconBubble),
  icon: css(styles.icon),
  fieldContainer: css(styles.fieldContainer),
  buttonContainer: css(styles.buttonContainer),
  buttonBackground: css(styles.buttonBackground),
  buttonText: css(styles.buttonText),
  loginField: css(styles.loginField),
  inputView: css(styles.inputView),
  inputSize: css(styles.inputSize),
  loadingView: css(styles.loadingView),
  authenticating: css(styles.authenticating),
};