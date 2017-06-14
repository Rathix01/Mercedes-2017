import { StyleSheet, css } from 'aphrodite/no-important';
import { BackgroundColorsStyle, Variables } from '../../../styles/';

const styles = StyleSheet.create({
  container: {
    maxWidth: "960px",
    margin: "0px auto",
  },
  dataField: {
    display: 'flex',
    flexDirection: 'row',
    fontFamily: "Raleway",
    fontSize: "1.3em",
    boxSizing: "border-box",
    padding: "10px",
  },
  label: {
    display: 'flex',
    flex: '1',
  },
  labelText: {
    display: "inline-block",
    marginTop: "10px"
  },
  valueText: {
    flex: '1',
    display: "inline-block",
    marginTop: "10px"
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
  }
});

module.exports = {
  container: css(styles.container),
  dataField: css(styles.dataField),
  label: css(styles.label),
  labelText: css(styles.labelText),
  icon: css(styles.icon),
  valueText: css(styles.valueText),
};

