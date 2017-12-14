import Bacon from 'baconjs';
import R from 'ramda';

const readQueryString = () => window.location.search.substr(1).split('&');
const getQueryStringValue = (key) => readQueryString().length > 0
									? R.filter((i) => i.indexOf(key) > -1, readQueryString()) : [];
const getValueForKey = (key) => getQueryStringValue(key).length > 0
									? getQueryStringValue(key)[0].split("=")[1] : "";						

const decode = (key) => key.split("+").join(" "); //key.replace("+", " ");
const urlHasValueFor = R.curry((prop, key) => key[prop] !== "" && key.length > 0);
const toUrlValue = (key) => ({ value: key });
const toMenuOption = (urlValue) => ({ menuKey: urlValue });

const urlMenuOption = Bacon.once(decode(getValueForKey('adminPage')))
						   .filter(urlHasValueFor("adminPage"))
						   .map(toMenuOption)
						   .delay(100)
						   .toProperty();


module.exports = {
	urlMenuOption
}