import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  container: {
    maxWidth: "1200px",
    width: "100%",
    margin: "0px auto",
  },
  dataField: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: "Raleway",
    fontSize: "1.3em",
    boxSizing: "border-box",
    padding: "5px 10px",
    width: "100%",
  },
  stackedDataField: {
    flexDirection: 'column',
  },
  label: {
    display: 'flex',
    flex: '1',
  },
  labelText: {
    display: "inline-block",
  },
  valueText: {
    flex: '1',
    display: "inline-block",
    marginTop: "10px",
    marginLeft: "5px",
  },
  icon: {
    color: "#fff",
    borderRadius: "50px",
    height: "45px",
    width: "45px",
    boxSizing: "border-box",
    padding: "10px",
    textAlign: "center",
    marginTop: "0px",
    marginRight: "15px",
    display: "none",
  }
});

module.exports = {
  container: css(styles.container),
  dataField: css(styles.dataField),
  stackedDataField: css(styles.dataField, styles.stackedDataField),
  label: css(styles.label),
  labelText: css(styles.labelText),
  icon: css(styles.icon),
  valueText: css(styles.valueText),
};

