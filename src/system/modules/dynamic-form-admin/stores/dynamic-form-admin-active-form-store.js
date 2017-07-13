import Bacon from 'baconjs';
import R from 'ramda';
import { toTimeline } from '../../../stores/animation-store';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

import { baseForm } from './dynamic-form-admin-base-data-store';
import { GenericTools } from '../../dynamic-form-admin-tools';
import { singleItemUpdate } from './dynamic-form-admin-single-item-update-store';

/* Temp */
import DynamicFormHeader from '../../dynamic-form-header';
import DynamicFormQuestion from '../../dynamic-form-question';
import DynamicFormText from '../../dynamic-form-text';

import InputText from '../../input-text';
import InputSelectList from '../../input-select-list';


const toActiveForm = (prev, next) => next.items !== undefined ? next : { items: R.concat(prev.items, next) }; 

const toNextItems = R.curry((update, item) => {
	return update.targetID !== item.uniqueID ? item : R.merge(item, R.omit("targetID", update))
});

const mergeUpdate = (form, update) => R.map(toNextItems(update), form.items);
const toItems = (state) => ({ items: state });

const getDataComponent = (state) => {
	return {
		"header": DynamicFormHeader,
		"text": DynamicFormText,
		"question": DynamicFormQuestion,
	}[state.type || state.componentType];
};
const getInput = (state) => InputText

const getComponents = (item) => R.merge(item, { dataComponent: getDataComponent(item), itemInput: getInput(item), componentType: item.type })
const includeComponents = (state) => R.map(getComponents, state)

const toFormWithUpdate = (form, update) => ({ form, update });
const publishNextForm = (prev, state) => {
	console.log("--",state);
	if(state.update.uniqueID !== undefined) {
		return (prev.length > 0)
			? R.concat(prev, state.update)
			: state.form.items;
	} else {
		return (prev.length > 0) 
				? mergeUpdate({items:prev}, state.update) 
				: mergeUpdate(state.form, state.update);
	}
}

const newQuestion = GenericTools.newQuestion;
const initForm = baseForm.delay(1000);

const activeForm = initForm.toEventStream().scan({}, toActiveForm);
activeForm.onValue(publish("AdminSections"));

const toNewQuestion	= (form, update) => ({ form: { items: R.concat(form.items, update) }, update:update  })

Bacon.when([activeForm.toProperty(), singleItemUpdate.toEventStream()], toFormWithUpdate,
		   [activeForm.toProperty(), newQuestion.toEventStream()], toNewQuestion
		 )
		.scan({}, publishNextForm)
		.map(includeComponents)
		.map(toItems)
		.skip(1)
		.onValue(publish("AdminSections"));

module.exports = {
	activeForm
}
