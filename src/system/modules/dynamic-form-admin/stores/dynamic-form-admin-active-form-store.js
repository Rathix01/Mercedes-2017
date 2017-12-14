import Bacon from 'baconjs';
import R from 'ramda';
import { toTimeline } from '../../../stores/animation-store';
import publish from '../../../stores/state-store';
import Actions from '../../../../actions/actions';

import { baseForm } from './dynamic-form-admin-base-data-store';
import { formData, orgData } from './dynamic-form-admin-store';
import { GenericTools } from '../../dynamic-form-admin-tools';
import { singleItemUpdate, singleItemDelete } from './dynamic-form-admin-single-item-update-store';
import { page } from './dynamic-form-admin-page-store';
import { values } from './dynamic-form-admin-instance-store';

import DynamicFormHeader from '../../dynamic-form-header';
import DynamicFormQuestion from '../../dynamic-form-question';
import DynamicFormText from '../../dynamic-form-text';
import DynamicFormPresentation from '../../dynamic-form-presentation';
import DynamicFormList from '../../dynamic-form-list';
//import DynamicFormList from '../../list';

import InputText from '../../input-text';
import InputSelectList from '../../input-select-list';
import InputRadioList from '../../input-radio-list';
import InputCheckboxList from '../../input-checkbox-list';
import InputTextArea from '../../input-textarea';
import InputDatePicker from '../../input-date-picker';
import InputAutoComplete from '../../input-autocomplete';
import InputSignUpPasswords from '../../input-sign-up-passwords';
import InputButton from '../../input-button';

const toFormMode = (state) => state.id === "FormMode";
const toForceRender = (state) => state.id === "ForceFormRender" && state.componentEvent === "component-update";
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
		"header": 		DynamicFormHeader,
		"text": 		DynamicFormText,
		"question": 	DynamicFormQuestion,
		"presentation": DynamicFormPresentation,
		"list": 		DynamicFormList,
	}[state.type || state.componentType];
};
const getInput = (state) => {
	return {
		"text": 				InputText,
		"select": 				InputSelectList,
		"radio": 				InputRadioList,
		"text area": 			InputTextArea,
		"date": 				InputDatePicker,
		"checkbox": 			InputCheckboxList,
		"auto-complete": 		InputAutoComplete,
		"password-and-confirm": InputSignUpPasswords,
		"button": 				InputButton,
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
		return prev.items === undefined || prev.page === state.form.page
			? state.form.items 
			: prev.items;
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
		return (prev.items && prev.items.length > 0) 
				? mergeUpdate(prev, state.update) 
				: mergeUpdate(state.form, state.update);
	}
};
const toNextFormAndPage = (prev, state) => {
	return setIndexes({ page: state.form.page, update: state.update, items: publishNextForm(prev, state) })
}
const getComponent = (key) => {
	return {
		"header": 	DynamicFormHeader,
		"text": 	DynamicFormText,
		"question": DynamicFormQuestion,
	}[key];
};

const toFormData = (state) => ({ items: R.map(getComponents, R.values(state.items)) });
const addNextIndex = (items, update) => R.merge(update, { index: ((update.page * 1000) + items.length), keywords: [ `page${update.page}` ] });
const toNewQuestion	= (form, update) => {
	const newItemWithIndex = addNextIndex(form.items, update);
	return ({ form: { items: R.concat(form.items, newItemWithIndex), page: update.page }, update:newItemWithIndex  })
};
const toNextFormPage = (state) => ({ page: state.page, items: state.nextForm.items, nextForm: state.nextForm.isNextForm || false });

const filterToValueItems = (state) => R.filter((i) => i.itemState.value !== "", state.activeForm.items)
const getMaxPageWithValue = (state) => R.reduce((prev, next) => R.max(prev, next.page), 1, filterToValueItems(state));
const filterToPage = (form, page, state) => {
	const minPage = getMaxPageWithValue(state);
	return ({ ...state, activeForm: { items: R.filter((i) => {

		return form.mode !== "Publish" ? true : (parseInt(i.page) <= (parseInt(page.page)) 
												|| parseInt(i.page) <= minPage 
												|| i.visible === true) && i.visible !== false ;
	}, state.activeForm.items) }});
}

const toFieldsForRender = (activeForm, orgAndForm, data) => ({activeForm, orgAndForm, data});
const getOrgData = (state) => state.data[state.orgAndForm.org];
const getOrgColors = R.curry((state, item) => R.merge(item, { orgColor1: getOrgData(state).color1, 
															  orgColor2: getOrgData(state).color2,
															  orgColor3: getOrgData(state).color3,
															  orgColor4: getOrgData(state).color4 }));

const includeOrgSettings = (state) => ({ items: R.map(getOrgColors(state), state.activeForm.items) });
const toNewQuestionForPage = (page, question) => R.merge(question, { page: question.isNewPage ? question.page : page });

const newQuestion = GenericTools.newQuestion;
const orgAndFormUpdate = Actions.filter(toOrgAndFormUpdates);
const forcedRender = Actions.filter(toForceRender);

const nextForm = Bacon.when([formData.toProperty(), orgAndFormUpdate.toEventStream()], toNextForm);
const nextFormPage = Bacon.combineTemplate({page, nextForm}).map(toNextFormPage);
const activeForm = nextForm.toEventStream();
const newQuestionForPage = Bacon.when([ page.toProperty(), newQuestion.toEventStream() ], toNewQuestionForPage);

const getIndexUpdates = (state) => R.filter((i) => i && i.idxUpdate !== undefined, state.items);
const getItemsForIndexUpdate = R.curry((state, update) => R.map((i) => {
	if(update && i.index === update.index) {
		return {...i, index: (i.index + i.idxUpdate)};
	} else if (update && i.index === (update.index + update.idxUpdate)) {
		return {...i, index:update.index};
	} else {
		return i;
	}
}, state.items));

const setIndexes = (state) => {
	if(state.items === undefined) return state;
	const itemToUpdate = getIndexUpdates(state);
	const nextItems = getItemsForIndexUpdate(state, itemToUpdate[0]);
	return {...state, items: R.map(R.omit("idxUpdate"), nextItems)};
};
const sortPages = (state) => ({ ...state, items: R.sort((a, b) => a.page - b.page, state.items) });
const sortItems = (state) => ({ ...state, items: R.sort((a, b) => ((a.page * 1000) + a.index) - ((b.page * 1000) + b.index), state.items) });

const pageToPublish = Bacon.when(
		   [nextFormPage.toProperty(), singleItemUpdate.toEventStream()], toFormWithUpdate,
		   [nextFormPage.toProperty(), singleItemDelete.toEventStream()], toFormWithDelete,
		   [nextFormPage.toProperty(), newQuestionForPage.toEventStream()], toNewQuestion,
		   [nextFormPage.toEventStream()], (form) => ({ update: { nextPage: true }, form }))
			.scan({}, toNextFormAndPage)
			.skip(1)
			.map(sortPages)
			.map(sortItems)

const adminSections = pageToPublish.map(includeComponents).map(toItems);
const formToRender = Bacon.when(
	[adminSections.toEventStream(), orgAndFormUpdate.toProperty(), orgData.toProperty()], toFieldsForRender,
	[adminSections.toProperty(), orgAndFormUpdate.toProperty(), orgData.toEventStream()], toFieldsForRender,
	[adminSections.toProperty(), orgAndFormUpdate.toProperty(), orgData.toProperty(), forcedRender.toEventStream()], toFieldsForRender);

const toItemValue = (values, page) => values !== undefined 
									? R.filter((value) => value.inputId === page.uniqueId, values) 
									: page;

const toValue = (values, page) => {
	return toItemValue(values, page)[0] !== undefined ? toItemValue(values, page)[0].value : "";
}
const toPageWithValues = (values, page) => R.merge(page, { activeForm: { items: R.map((i) => ({ ...i, itemState: { ...i.itemState, value: toValue(values, i) } }), page.activeForm.items) } });

const pageAndValues = Bacon.when([ values.toProperty({}), formToRender.toEventStream() ], toPageWithValues);

const formMode = Actions.filter(toFormMode);
const formModePage = Bacon.when([ formMode.toProperty(), 
								  pageToPublish.toProperty(), 
								  pageAndValues.toEventStream() ], filterToPage);

const allForm = formModePage.map(includeOrgSettings)

allForm.debounce(5).log('render').onValue(publish("AdminSections"));
activeForm.debounce(5).onValue(publish("ActiveFormListener"));
nextForm.debounce(5).onValue(publish("NextFormListener"));

module.exports = {
	activeForm, nextForm, adminSections
}
