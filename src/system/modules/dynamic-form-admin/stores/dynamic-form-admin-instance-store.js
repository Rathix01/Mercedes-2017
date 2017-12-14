import Bacon from 'baconjs';
import R from 'ramda';
import Firebase from '../../firebase';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

const toNavButtonEvent = (state) => state.component === "DynamicFormAdminNavButtons" && state.componentEvent === "component-update";
const toSaveButtonEvent = (state) => state.event.target.id === "save-instance";
const toSaveWithRulesAction = (state) => state.id === "SaveWithRules";
const toFormValueListenerActions = (state) => state.id === "AdminFormDisplayValues" && state.componentEvent === "component-update";
const toOrgAndFormUpdates = (state) => state.id === "AdminOrgAndForm" && state.componentEvent === "component-update";
const toValidationUpdates = (state) => state.id === "ValidationListener" && state.componentEvent === "component-update";

// These are repeated elsewhere. Find a way to not repeat yourself here.
const readQueryString = () => window.location.search.substr(1).split('&');
const getQueryStringValue = (key) => readQueryString().length > 0
									? R.filter((i) => i.indexOf(key) > -1, readQueryString()) : [];
const getValueForKey = (key) => getQueryStringValue(key).length > 0
									? getQueryStringValue(key)[0].split("=")[1] : "";						

const decode = (key) => key.replace("+", " ");
const urlHasValueFor = R.curry((prop, key) => key[prop] !== "" && key.length > 0);
const toValuesForStamp = (stamp, data) => data.FormValues !== undefined ? data.FormValues[stamp] : [];
const toAllFormDetails = (orgAndForm, saveData) => ({ orgAndForm, saveData })

const isChange = R.curry(( prev, item ) => {
	const prevItem = R.filter((prevItem) => { prevItem !== undefined && 
											  item !== undefined && 
											  prevItem.inputId === item.inputId },  prev.prev || []);
	return prevItem.length === 1 ? R.merge(item, { isChange: item.value !== prevItem[0].value } ) : item
} );

const isUpdate = (prev, next) => {
	return R.map(isChange(prev), next)
}

const toFieldUpdates = (prev, next) => {
	return ({ prev: prev.next || [], next: next });
}

const updateValues = R.curry(( prev, item ) => {
	const prevItem = R.filter((prevItem) => prevItem.inputId === item.inputId,  prev || []);
	return prevItem.length === 1 ? R.merge(item, { value: item.isChange !== true ? prevItem[0].value : item.value  } ) : item
} );

const updateFields = (values, updates) => {
	return R.map(updateValues(values), updates.next)
}

const toSaveStateItems = (update) => update !== undefined ? update.items : [];

const toSaveState = (template) => {
	return template.values === undefined || template.values.length === 0
				? ({ stamp: template.stamp, items: toSaveStateItems(template.update), validation: template.validation })
				: mergeSaveState(template);  
}

const mergeSaveState = (template) => ({ items: R.reduce((arr, v) => {
	const prev = R.filter((i) => i.inputId === v.inputId, template.values)[0];
	return arr.concat((prev === undefined || v.value !== undefined && v.updated === true) ? R.omit("updated", v) : prev);

}, [], template.update.items || []), stamp: template.stamp, validation: template.validation });

const ignoreEmpty = (state) => state.length !== 0;
const prepareForSave = (state) => R.filter((i) => i.value !== undefined, state)
const includeValidity = (state) => ({ ...state, items: R.map((i) => {
	return state.validation[i.inputId] !== undefined ? { ...i, valid: state.validation[i.inputId] } : i;
}, state.items) });

const saveWithRulesAction = Actions.filter(toSaveWithRulesAction);
const saveEvent = Actions.filter(toNavButtonEvent).filter(toSaveButtonEvent).merge(saveWithRulesAction);

const updateEvent = Actions.filter(toFormValueListenerActions);
const urlStamp = Bacon.once(decode(getValueForKey('stamp'))).filter(urlHasValueFor("stamp")).toProperty();
const orgAndFormUpdate = Actions.filter(toOrgAndFormUpdates);

const values = Bacon.when([ urlStamp.toProperty(), Firebase.data.toEventStream() ], toValuesForStamp)
const validationValues = Actions.filter(toValidationUpdates).map(R.prop("items"))
const nextUpdates = updateEvent.merge(values).scan([], toFieldUpdates).filter(ignoreEmpty).map(R.prop("next"));
nextUpdates.onValue(() => {});

// debounce required to ensure validationValues are correct.
const instanceData = Bacon.when([ nextUpdates.debounce(5).toEventStream(),
			 				   urlStamp.toProperty(),
			 				   values.toProperty(),
			 				   validationValues.toProperty({}) ], (update, stamp, values, validation) => ({ update, stamp, values, validation }))
							.map(toSaveState)
							.map(includeValidity)
							.toEventStream();

instanceData.onValue(publish("ValidatedValues"));

const saveData = Bacon.when([instanceData.toProperty(), saveEvent.debounce(10).toEventStream()], (data) => data);

const dataSaved = saveData.flatMap((state) => {
	console.log('save that -->', state);
	const p = Firebase.db.ref(`/FormValues/${state.stamp}`).set(prepareForSave(state.items));
	return Bacon.fromPromise(p);
})

dataSaved.onValue(() => {});

const formSaved = Bacon.when([ orgAndFormUpdate.toProperty(), saveData.toEventStream() ], toAllFormDetails);

formSaved.onValue((state) => {
	const p = Firebase.db.ref(`/FormInstances/${state.orgAndForm.org}/${state.orgAndForm.form}/${state.saveData.stamp}`).set({
		instance: state.saveData.stamp,
		created: state.saveData.stamp,
		lastModified: new Date().getTime(), 
		status: "In Progress",
		formName: state.orgAndForm.form,
	});
	return Bacon.fromPromise(p);
})

module.exports = {
	values, saveData, dataSaved, formSaved
}

