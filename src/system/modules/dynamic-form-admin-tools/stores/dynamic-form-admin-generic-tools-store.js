import Bacon from 'baconjs';
import R from 'ramda';
import { toTimeline } from '../../../stores/animation-store';
import Actions from '../../../../actions/actions';
import publish from '../../../stores/state-store';

import DynamicFormQuestion from '../../dynamic-form-question';
import InputText from '../../input-text';

const toGenericToolsAction = (state) => state.component === "DynamicFormAdminOrgAndFormTools" || state.component === "DynamicFormAdminGenericTools";
const toNewQuestionAction = (state) => state.event.target.id === "new-question";
const toNewFormAction = (state) => state.event.target.id === "new-form";
const toggleDisplay = (prev, next) => ({ displayNewForm: !prev.displayNewForm });
const toDisplayIf = R.curry(( display, state ) => ({ display: state.displayNewForm === display }));

const toNewQuestion	= (state) => ({
		uniqueId: new Date().getTime(),
		sectionId: "Test" + new Date().getTime(), 
	  	dataComponent: DynamicFormQuestion,
	  	itemInput: InputText,
	  	title: "New Question",
	  	page: 1,
	  	componentType: "question",
	  	inputType: "text",
	  	type: "question",
	  	inputType: "text",
	  	itemState: { items: [ { text: 'Yes', value: 'Yes' }, { text: 'No', value: 'No' } ] },
	  	isNew: true,
	});

const genericToolsAction = Actions.filter(toGenericToolsAction);
const newQuestionAction = genericToolsAction.filter(toNewQuestionAction);
const newQuestion = newQuestionAction.map(toNewQuestion);

const newFormAction = genericToolsAction.filter(toNewFormAction);
const displayNewForm = newFormAction.scan( { displayNewForm: false }, toggleDisplay);

displayNewForm.map(toDisplayIf(true)).onValue(publish("NewFormVisibility"));
displayNewForm.map(toDisplayIf(false)).onValue(publish("OrgAndFormVisibility"));

module.exports = {
	newQuestion
};