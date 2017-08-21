import Bacon from 'baconjs';
import R from 'ramda';
import Firebase from '../../firebase';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const toNavButtonEvent = (state) => state.component === "DynamicFormAdminNavButtons" && state.componentEvent === "component-update";
const toSaveButtonEvent = (state) => state.event.target.id === "save-instance";
const toFormValueListenerActions = (state) => state.id === "AdminFormDisplayValues" && state.componentEvent === "component-update";

// These are repeated elsewhere. Find a way to not repeat yourself here.
const readQueryString = () => window.location.search.substr(1).split('&');
const getQueryStringValue = (key) => readQueryString().length > 0
									? R.filter((i) => i.indexOf(key) > -1, readQueryString()) : [];
const getValueForKey = (key) => getQueryStringValue(key).length > 0
									? getQueryStringValue(key)[0].split("=")[1] : "";						

const decode = (key) => key.replace("+", " ");
const urlHasValueFor = R.curry((prop, key) => key[prop] !== "" && key.length > 0);
const toValuesForStamp = (stamp, data) => data.FormValues[stamp];

const saveEvent = Actions.filter(toNavButtonEvent).filter(toSaveButtonEvent);
const updateEvent = Actions.filter(toFormValueListenerActions);
const urlStamp = Bacon.once(decode(getValueForKey('stamp'))).filter(urlHasValueFor("stamp")).toProperty();

const saveData = Bacon.when([ updateEvent.toProperty(), 
			 		urlStamp.toProperty(), 
			 		saveEvent.toEventStream() ], (update, stamp) => ({ update, stamp }));

saveData.flatMap((state) => {
	const p = Firebase.db.ref(`/FormValues/${state.stamp}`).set(state.update.items);
	return Bacon.fromPromise(p);
}).log('saved...');

const values = Bacon.when([ urlStamp.toProperty(), Firebase.data.toEventStream() ], toValuesForStamp)

module.exports = {
	values
}

