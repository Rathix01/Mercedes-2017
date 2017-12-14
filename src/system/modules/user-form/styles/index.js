import { StyleSheet, css } from 'aphrodite/no-important';
import { colors } from '../../../styles/variables.style';

const styles = StyleSheet.create({
  formContainer: {
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    maxWidth: 1200,
    margin: "10px auto",
    position: "relative",
    border: `solid 1px ${ colors.gray }`,
    fontFamily: "Raleway",
    borderRadius: 20,
    padding: 20,
  },
  formField: {
    flex: 1,
    padding: "0px 20px",
  },
  errorClass: {
    backgroundColor: colors.orange,
    maxWidth: 220,
    padding: 3,
    color: colors.white,
  },
  formSection: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 20,
    color: colors.white,
    marginBottom: 10,
  },
  accountSection: {
    backgroundColor: colors.lightGray,
    color: colors.black,
  },
  personSection: {
    backgroundColor: colors.blue,
  },
  addressSection: {
    backgroundColor: colors.lightGray,
    color: colors.black
  },
  icon: {
    backgroundColor: colors.white,
    borderRadius: 40,
    height: 40,
    width: 40,
    textAlign: "center",
    paddingTop: 6,
    fontSize: 26,
    boxSizing: "border-box",
    marginRight: 10,
    marginTop: -5,
  },
  accountIcon: {
    color: colors.black,
  },
  personIcon: {
    color: colors.blue,
  },
  addressIcon: {
    color: colors.balck,
  },
  formHeader: {
    display: "flex",
    flexDirection: "row",
    fontSize: 26,
    paddingTop: 5,
    marginBottom: 15,
    marginTop: 5,
  }
});

module.exports = {
  formContainer: css(styles.formContainer),
  formField: css(styles.formField),
  errorClass: css(styles.errorClass),
  accountSection: css(styles.formSection, styles.accountSection),
  personSection: css(styles.formSection, styles.personSection),
  addressSection: css(styles.formSection, styles.addressSection),
  accountIcon: css(styles.icon, styles.accountIcon),
  personIcon: css(styles.icon, styles.personIcon),
  addressIcon: css(styles.icon, styles.addressIcon),
  formHeader: css(styles.formHeader),
}