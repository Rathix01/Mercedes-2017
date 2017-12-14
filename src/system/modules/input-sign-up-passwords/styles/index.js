import { StyleSheet, css } from 'aphrodite/no-important';
import { colors } from '../../../styles/variables.style';

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 1200,
    position: "relative",
    fontFamily: "Raleway",
    overflow: "hidden",
  },
  formContainer: {
    marginLeft: -25,
  },
  standAloneContainer: {

  },
  formField: {
    flex: 1,
    padding: "0px 20px"
  },
  errorClass: {
    backgroundColor: colors.orange,
    maxWidth: 200,
    padding: 3,
    color: colors.white,
  },
  validationContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: -5,
  },
  validation: {
    color: colors.black,
    padding: 3,
    textIndent: 3,
    fontSize: 15,
    width: 220,
    marginRight: 30,
  },
  weak: {
    backgroundColor: colors.orange,
  },
  strong: {
    backgroundColor: colors.green,
  },
  passwordMessage: {
    background: colors.green,
    color: colors.white,
    padding: "10px 10px 15px 10px",
    display: 'flex',
    flexDirection: 'row',
    maxWidth: 240,
    marginBottom: 2,
  },
  icon: {
    fontSize: 40,
    margin: "0px 15px 10px 10px",
  },
  messageContainer: {
    minHeight: 140,
  }
});

module.exports = {
  container: css(styles.container),
  formContainer: css(styles.formContainer),
  standAloneContainer: css(styles.standAloneContainer),
  formField: css(styles.formField),
  errorClass: css(styles.errorClass),
  validationContainer: css(styles.validationContainer),
  validation: css(styles.validation),
  weak: css(styles.validation, styles.weak),
  strong: css(styles.validation, styles.strong),
  passwordMessage: css(styles.passwordMessage),
  icon: css(styles.icon),
  messageContainer: css(styles.messageContainer),
}