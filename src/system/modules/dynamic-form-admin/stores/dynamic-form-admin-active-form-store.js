import Bacon from 'baconjs';
import R from 'ramda';
import { toTimeline } from '../../../stores/animation-store';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

import { baseForm } from './dynamic-form-admin-base-data-store';
import { formData } from './dynamic-form-admin-store';
import { GenericTools } from '../../dynamic-form-admin-tools';
import { singleItemUpdate, singleItemDelete } from './dynamic-form-admin-single-item-update-store';
import { page } from './dynamic-form-admin-page-store';
import { values } from './dynamic-form-admin-instance-store';

/* Temp */
import DynamicFormHeader from '../../dynamic-form-header';
import DynamicFormQuestion from '../../dynamic-form-question';
import DynamicFormText from '../../dynamic-form-text';
import InputText from '../../input-text';
import InputSelectList from '../../input-select-list';
import InputRadioList from '../../input-radio-list';
import InputTextArea from '../../input-textarea';

const toOrgAndFormUpdates = (state) => state.id === "AdminOrgAndForm" && state.componentEvent === "component-update";
const toNextForm = (formData, keys) => {
	return { items: formData[keys.org][keys.form], isNextForm: true }; 
}
const toActiveForm = (prev, next) => next.items !== undefined ? next : { items: R.concat(prev.items, next) }; 
const toNextItems = R.curry((update, item) => {
	return update.targetID !== item.uniqueId ? item : R.merge(item, R.omit("targetID", update))
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
const getInput = (state) => {
	return {
		"text": InputText,
		"select": InputSelectList,
		"radio": InputRadioList,
		"text area": InputTextArea
	}[state.inputType];
};
const getComponents = (item) => R.merge(item, { dataComponent: getDataComponent(item), itemInput: getInput(item) });
const includeComponents = (state) => R.map(getComponents, state.items)
const toFormWithUpdate = (form, update) => ({ form, update });
const toFormWithDelete = (form, itemToDelete) => ({ form, update: { delete: true, ...itemToDelete } });

const publishNextForm = (prev, state) => {
	if(state.update.nextPage === true 
		&& state.update.targetID === undefined
		&& state.update.delete !== true) {
		return prev.items !== undefined ? prev.items : state.form.items;
	} else if (state.update.delete === true) {
		// Delete...
		var x = R.filter( (i) => i.uniqueId !== state.update.uniqueId, prev.items);
		var y = R.filter( (i) => i.uniqueId !== state.update.uniqueId, state.form.items);
		return (prev.items.length > 0) ? x : y
	} else if(state.update.isNew === true) {
		// Adding new items...
		return (prev.items.length > 0)
			? R.concat(prev.items, R.omit("isNew", state.update) )
			: state.form.items;
	} else {
		//Updates
		return (prev.items && prev.items.length > 0) 
				? mergeUpdate(prev, state.update) 
				: mergeUpdate(state.form, state.update);
	}
}
const toNextFormAndPage = (prev, state) => ({ page: state.form.page, update: state.update, items: publishNextForm(prev, state) })
const getComponent = (key) => {
	return {
		"header": DynamicFormHeader,
		"text": DynamicFormText,
		"question": DynamicFormQuestion
	}[key]
};

const toFormData = (state) => ({ items: R.map(getComponents, R.values(state.items)) });
const toNewQuestion	= (form, update) => ({ form: { items: R.concat(form.items, update) }, update:update  })
const toNextFormPage = (state) => ({ page: state.page, items: state.nextForm.items, nextForm: state.nextForm.isNextForm || false });
const filterToPage = (state) => ({ items: R.filter((i) => {
	return R.identical(parseInt(i.page), parseInt(state.page) || 1)
}, state.items) });

const newQuestion = GenericTools.newQuestion;
const orgAndFormUpdate = Actions.filter(toOrgAndFormUpdates);
const nextForm = Bacon.when([formData.toProperty(), orgAndFormUpdate.toEventStream()], toNextForm);
const nextFormPage = Bacon.combineTemplate({page, nextForm}).map(toNextFormPage);
const activeForm = nextForm.toEventStream();

const pageToPublish = Bacon.when([nextFormPage.toProperty(), singleItemUpdate.toEventStream()], toFormWithUpdate,
		   [nextFormPage.toProperty(), singleItemDelete.toEventStream()], toFormWithDelete,
		   [nextFormPage.toProperty(), newQuestion.toEventStream()], toNewQuestion,
		   [nextFormPage.toEventStream()], (form) => ({ update: { nextPage: true }, form }))
			.scan({}, toNextFormAndPage)
			.skip(1)
			.map(filterToPage)
			.toProperty();

const toPageWithValues = (values, page) => ({ items: R.map((i) => ({ ...i, itemState: { ...i.itemState, value: toValue(values, i) } }), page.items) })
const pageAndValues = Bacon.when([ values.toProperty({}), pageToPublish.toEventStream() ], toPageWithValues);

pageToPublish.map(includeComponents)
		.map(toItems)
		.onValue(publish("AdminSections"));

const toItemValue = (values, page) => R.filter((value) => value.inputId === page.uniqueId, values);
const toValue = (values, page) => {
	return toItemValue(values, page)[0] !== undefined ? toItemValue(values, page)[0].value  : "";
}

activeForm.onValue(publish("ActiveFormListener"));
nextForm.onValue(publish("NextFormListener"));

module.exports = {
	activeForm, nextForm
}
