import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  toolsContainer: {
    position: 'fixed',
    border: "solid 1px #ccc",
    marginTop: 10,
    padding: 10,
    boxSizing: "border-box",
    width: "350px",
    marginLeft: 10,
    paddingTop: 50,
    fontFamily: "Raleway",
  },
  header: {
  	background: Variables.colors.blue,
  	position: "absolute",
  	top: 0,
  	left:0,
  	width: "100%",
  	margin: 0,
  	padding: 10,
  	boxSizing: "border-box",
  	color: Variables.colors.white,
  }
});

module.exports = {
  toolsContainer: css(styles.toolsContainer),
  header: css(styles.header),
}