import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 10,
    width: "100%",
    flexDirection: "column",
    height: "100%",
    position: "absolute",
    boxSizing: "border-box",
    background: "#F8F9FA",
    top: 0,
    left:0,
  },
  logoContainer: {
    flex: 1,
    textAlign: 'center',
    marginBottom: 60,
    maxHeight: 100,
  },
  staticBar: {
    background: Variables.colors.darkGray,
    maxHeight: 2,
    overflow: "hidden",
    marginTop: "10px auto",
    maxWidth: 640,
    alignSelf: "center",
    width: "100%",
    flex: 1,

    '@media (max-width: 600px)': {
      maxWidth: 200,
    },
  },
  progressBar: {
    background: Variables.colors.blue,
    transformOrigin: "0px 0px",
  },
});


module.exports = {
  container: css(styles.container),
  logoContainer: css(styles.logoContainer),
  staticBar: css(styles.staticBar),
  progressBar: css(styles.progressBar),
}