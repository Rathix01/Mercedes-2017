import { StyleSheet, css } from 'aphrodite/no-important';
import { colors } from './variables.style';

const styles = StyleSheet.create({
  btn: {
    background: colors.white,
    outline: "none",
    border: "none",
    padding: "20px 65px",
    fontSize: "24px",
    width: "350px",
    marginTop: "50px",
    opacity: '0.9',
    borderRadius: "40px",
    textAlign: "center",
    cursor: "pointer",
    textDecoration: "none",

    ':hover': {
      transform: "translate3d(0px, -1px, 0px)",
      transformOrigin: "0% 0%",
      transition: "all 0.2s",
      opacity: "1",
    }
  },
  blueBtn: {
    color: colors.blue,
  },
  btnBlueReverse: {
    background: colors.blue,
    color: colors.white,
  },
  greenBtn: {
    color: colors.green,
  },
  btnGreenReverse: {
    background: colors.green,
    color: colors.white,
  },
});

module.exports = styles;
