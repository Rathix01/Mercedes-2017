import { StyleSheet, css } from 'aphrodite/no-important';
import { Variables } from '../../../styles/';

const styles = StyleSheet.create({
  mainFormContainer: {
    width: "100%",
    maxWidth: 1200,
    margin: "0px auto",
    position: "relative",
    marginBottom: "300px",
  },
  form: {
  	width: "100%",
    padding: 0,
    margin: 0,
    fontSize: "18px",
  },
  formSection: {
  	width: "100%",
  },
  nextPrevBtns: {
    position: "fixed",
    bottom: -1,
    left: 0,
    width: '100%',
  },
  center:{
    width: "100%",
    maxWidth: 1200,
    margin: "0px auto",
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: 'rgba(200,200,200, 0.6)',
    border: `solid 1px ${ Variables.colors.gray }`,
  },
  btn: {
    fontSize: 20,
    fontFamily: 'Raleway',
    padding: "5px 40px",
  },
  nextBtn:{
    margin:"10px 5px",
  },
  prevBtn: {
    margin:"10px 5px",
  }
});

module.exports = {
  mainFormContainer: css(styles.mainFormContainer),
  form: css(styles.form),
  formSection: css(styles.formSection),
  nextPrevBtns: css(styles.nextPrevBtns),
  center: css(styles.center),
  nextBtn: css(styles.nextBtn, styles.btn),
  prevBtn: css(styles.prevBtn, styles.btn),
};